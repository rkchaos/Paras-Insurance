import Client from '../models/client.model.js';
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Employee from '../models/employee.model.js';
import AssignedPolicy from '../models/assignedPolicy.model.js';
import ejs from "ejs";
import fs from "fs";

const cookiesOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

const condenseClientInfo = async (client) => {
    const employee = await Employee.findOne({ clientId: client._id });
    const clientSessionObj = {
        _id: client._id,
        firstName: client.personalDetails.firstName,
        lastName: client.personalDetails.lastName,
        email: client.personalDetails.contact.email,
        phone: client.personalDetails.contact.phone,
        role: employee ? employee.role : 'user'
    };
    if (employee) {
        return { ...clientSessionObj, employeeId: employee._id };
    } else {
        return clientSessionObj;
    }
}

const generateAccessAndRefreshTokens = async (client) => {
    try {
        const accessToken = await client.generateAccessToken();
        const refreshToken = await client.generateRefreshToken();

        client.refreshToken = refreshToken;
        await client.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) { return null }
}

const sendResetPasswordMail = async ({ res, to, client, resetToken }) => {
    const emailTemplate = fs.readFileSync("./assets/resetPasswordEmailTemplate.ejs", "utf-8");
    const emailContent = ejs.render(emailTemplate, {
        firstName: client.personalDetails.firstName,
        resetToken: resetToken,
        year: new Date().getFullYear()
    });
    // let emailContent =
    //     `   
    //     Dear ${client.personalDetails.firstName},<br>
    //         We received a request to reset the password for your account. 
    //         If you made this request, please click the link below to reset your password:
    //         <br><br>
    //         <a href=${process.env.FRONT_END_URL}/resetPassword/${resetToken}>Reset your password</a>
    //         <br><br>
    //         After resetting your password, navigate to ${process.env.FRONT_END_URL} and log in with your new password to access your account.
    //         This link will expire in ${process.env.RESET_TOKEN_EXPIRY} for security reasons. If you did not request a password reset, please ignore this email or contact our support team if you have concerns.
    //         <br><br>
    //         Thank you,
    //         <br>
    //         Paaras Financials 
    //         <br>
    //         Support Team
    //     `;

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: to.toString(),
        subject: "Password Reset Request",
        html: emailContent
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error on Nodemailer side: ", error);
        } else {
            res.status(200).json({ message: 'A URL has been sent to the email address above. Click it to reset your password.' })
        }
    });
}

const fetchCondenseInfo = async (req, res) => {
    try {
        const clientInfo = await condenseClientInfo(req.client);

        if (!req.refreshedAccessToken) return res.status(200).json(clientInfo);

        const client = await Client.findById(req.client._id).select("-password -refreshToken");
        const accessToken = await client.generateAccessToken();
        res.status(200)
            .cookie("accessToken", accessToken, cookiesOptions)
            .json(clientInfo);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: "Network error. Try again" })
    }
}

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        const isClientEmailUnique = await Client.findOne({ 'personalDetails.contact.email': email });
        if (isClientEmailUnique) return res.status(400).json({ message: 'Email already registered. Login' });

        const isClientPhoneUnique = await Client.findOne({ 'personalDetails.contact.phone': phone });
        if (isClientPhoneUnique) return res.status(400).json({ message: 'Phone already registered. Login' });

        const newClient = await Client.create({
            userType: 'Lead',
            password: password,
            personalDetails: {
                firstName: firstName,
                lastName: lastName,
                contact: {
                    email: email,
                    phone: phone
                },
            }
        });

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newClient);
        const clientInfo = await condenseClientInfo(newClient);

        res.status(200)
            .cookie('accessToken', accessToken, cookiesOptions)
            .cookie('refreshToken', refreshToken, cookiesOptions)
            .json(clientInfo);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

const fetchAllData = async (req, res) => {
    try {
        const { clientId } = req.query;
        const clientData = await Client.aggregate([
            { $match: { _id: new ObjectId(clientId) } },
            {
                $lookup: {
                    from: "assignedpolicies",
                    localField: "_id",
                    foreignField: "clientId",
                    as: "assignedPolicies",
                },
            },
            {
                $unwind: {
                    path: "$assignedPolicies",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "policies",
                    localField: "assignedPolicies.policyId",
                    foreignField: "_id",
                    as: "policyDetails",
                },
            },
            {
                $addFields: {
                    "assignedPolicies.policyDetails": {
                        $arrayElemAt: ["$policyDetails", 0],
                    },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    userType: { $first: "$userType" },
                    personalDetails: { $first: "$personalDetails" },
                    KYC: { $first: "$KYC" },
                    leadDetails: { $first: "$leadDetails" },
                    interactionHistory: { $first: "$interactionHistory" },
                    notes: { $first: "$notes" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    assignedPolicies: { $push: "$assignedPolicies" },
                },
            },
            {
                $project: {
                    userType: 1,
                    personalDetails: 1,
                    financialDetails: 1,
                    employmentDetails: 1,
                    KYC: 1,
                    leadDetails: 1,
                    interactionHistory: 1,
                    notes: 1,
                    assignedPolicies: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);

        const assignedPolicies = await AssignedPolicy.aggregate([
            { $match: { clientId: new ObjectId(clientId) } },
            {
                $lookup: {
                    from: "clients",
                    localField: "clientId",
                    foreignField: "_id",
                    as: "clientData"
                }
            },
            {
                $unwind: "$clientData"
            },
            {
                $lookup: {
                    from: "policies",
                    localField: "policyId",
                    foreignField: "_id",
                    as: "policyData"
                }
            },
            {
                $unwind: "$policyData"
            },
            {
                $project: {
                    _id: 1,
                    clientId: 1,
                    policyId: 1,
                    data: 1,
                    stage: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    availablePolicies: 1,
                    clientDetails: {
                        firstName: "$clientData.personalDetails.firstName",
                        lastName: "$clientData.personalDetails.lastName",
                        dob: "$clientData.personalDetails.dob",
                        gender: "$clientData.personalDetails.gender",
                        city: "$clientData.personalDetails.address.city",
                        email: "$clientData.personalDetails.contact.email",
                        phone: "$clientData.personalDetails.contact.phone"
                    },
                    policyDetails: {
                        policyName: "$policyData.policyName",
                        policyType: "$policyData.policyType",
                        policyDescription: "$policyData.policyDescription",
                        policyForm: "$policyData.form"
                    }
                }
            }
        ]);
        if (clientData.length > 0) {
            return res.status(200).json({ clientData: clientData[0], assignedPolicies: assignedPolicies });
        } else {
            return res.status(200).json({ clientData: null, assignedPolicies: null });
        }
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
}

const fetchAllCustomers = async (req, res) => {
    try {
        const clients = await Client.aggregate([
            {
                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: "clientId",
                    as: "employeeData",
                },
            },
            {
                $match: {
                    employeeData: { $size: 0 },
                },
            },
            {
                $project: {
                    password: 0,
                    refreshToken: 0,
                    employeeData: 0,
                },
            },
        ]);

        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
}

const login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        const checkForEmail = await Client.findOne({ 'personalDetails.contact.email': emailOrPhone });
        const checkForPhone = await Client.findOne({ 'personalDetails.contact.phone': emailOrPhone });
        if (!checkForEmail && !checkForPhone) return res.status(404).json({ message: 'No such client found' });

        let existingClient;
        if (checkForEmail) existingClient = checkForEmail;
        if (checkForPhone) existingClient = checkForPhone;

        const isPasswordCorrect = await existingClient.isPasswordCorrect(password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingClient);
        const clientInfo = await condenseClientInfo(existingClient);

        res.status(200)
            .cookie('accessToken', accessToken, cookiesOptions)
            .cookie('refreshToken', refreshToken, cookiesOptions)
            .json(clientInfo);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
}

const logout = async (req, res) => {
    try {
        Client.findByIdAndUpdate(
            req.client._id,
            {
                $set: { refreshToken: undefined }
            }
        );
        res.status(200)
            .clearCookie('accessToken', cookiesOptions)
            .clearCookie('refreshToken', cookiesOptions)
            .json({ message: 'Successfully logged out' });
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.query;
        const clientCorrespondingToEmail = await Client.findOne({ 'personalDetails.contact.email': email });
        if (!clientCorrespondingToEmail) return res.status(200).json({ message: 'No such user found.' });

        const resetToken = jwt.sign(
            { clientId: clientCorrespondingToEmail._id },
            process.env.RESET_TOKEN_SECRET,
            { expiresIn: process.env.RESET_TOKEN_EXPIRY }
        );

        sendResetPasswordMail({ res, to: [email], client: clientCorrespondingToEmail, resetToken });
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        const decodedToken = jwt.verify(
            resetToken,
            process.env.RESET_TOKEN_SECRET
        );

        if (!decodedToken) {
            return res.status(401).send({ message: "Invalid token" });
        }

        const client = await Client.findOne({ _id: decodedToken.clientId });
        if (!client) { return res.status(401).send({ message: "No client found" }) }

        client.password = newPassword;
        await client.save();

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(client);
        const clientInfo = await condenseClientInfo(client);

        res.status(200)
            .cookie('accessToken', accessToken, cookiesOptions)
            .cookie('refreshToken', refreshToken, cookiesOptions)
            .json(clientInfo);
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token expired' })
        } else {
            res.status(503).json({ message: 'Network error. Try again' })
        }
    }
}

const deleteProfile = async (req, res) => {
    try {
        const clientId = req.client._id
        await Client.findByIdAndDelete(clientId);
        await Employee.findOneAndDelete({ clientId: clientId });
        await AssignedPolicy.deleteMany({
            clientId: new ObjectId(clientId),
            stage: 1
        });

        res.status(200)
            .clearCookie("accessToken", cookiesOptions)
            .clearCookie("refreshToken", cookiesOptions)
            .json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: "Network error. Try again" });
    }
}

export {
    condenseClientInfo,
    generateAccessAndRefreshTokens,
    fetchCondenseInfo,
    fetchAllData,
    fetchAllCustomers,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    deleteProfile
};