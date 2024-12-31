import Client from "../models/client.model.js";
import AssignedPolicy from "../models/assignedPolicy.model.js";
import { ObjectId } from "mongodb";
import { condenseClientInfo, generateAccessAndRefreshTokens } from "./client.controller.js";

const cookiesOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
};

const processFormData = (formData) => {
    const fieldMappings = {
        dob: "personalDetails.dob",
        gender: "personalDetails.gender",
        street: "personalDetails.address.street",
        city: "personalDetails.address.city",
        state: "personalDetails.address.state",
        PINCODE: "personalDetails.address.PINCODE",
        country: "personalDetails.address.country",
        panCard: "financialDetails.pan_card",
        accountNo: "financialDetails.accountDetails.accountNo",
        ifscCode: "financialDetails.accountDetails.ifscCode",
        bankName: "financialDetails.accountDetails.bankName",
        aadharNo: "financialDetails.aadhaarNo",
        companyName: "employmentDetails.companyName",
        designation: "employmentDetails.designation",
        annualIncome: "employmentDetails.annualIncome"
    };

    const result = {
        personalDetails: {
            address: {}
        },
        financialDetails: {
            accountDetails: {}
        },
        employmentDetails: {}
    };

    for (const [key, value] of Object.entries(formData)) {
        if (fieldMappings[key]) {
            const path = fieldMappings[key].split(".");
            let ref = result;

            for (let i = 0; i < path.length - 1; i++) {
                ref[path[i]] = ref[path[i]] || {};
                ref = ref[path[i]];
            }

            ref[path[path.length - 1]] = value;
        }
    }

    return result;
}

const addAdditionalClientData = async (clientId, formData) => {
    try {
        const updateData = processFormData(formData);
        const updateFields = {};

        if (updateData.personalDetails) {
            for (const [key, value] of Object.entries(updateData.personalDetails)) {
                if (key === "address") {
                    for (const [addKey, addValue] of Object.entries(value)) {
                        updateFields[`personalDetails.address.${addKey}`] = addValue;
                    }
                } else {
                    updateFields[`personalDetails.${key}`] = value;
                }
            }
        }
        if (updateData.financialDetails) {
            for (const [key, value] of Object.entries(updateData.financialDetails)) {
                if (key === "accountDetails") {
                    for (const [accKey, accValue] of Object.entries(value)) {
                        updateFields[`financialDetails.accountDetails.${accKey}`] = accValue;
                    }
                } else {
                    updateFields[`financialDetails.${key}`] = value;
                }
            }
        }
        if (updateData.employmentDetails) {
            for (const [key, value] of Object.entries(updateData.employmentDetails)) {
                updateFields[`employmentDetails.${key}`] = value;
            }
        }

        const result = await Client.updateOne(
            { _id: new ObjectId(clientId) },
            { $set: updateFields },
            { upsert: true }
        );
        console.log(updateFields);

        console.log(`${result.matchedCount} document(s) matched the filter.`);
        console.log(`${result.modifiedCount} document(s) were updated.`);
    } catch (err) {
        console.error("Error updating data:", err);
    }
}

const assignedPolicyWithClientId = async (res, { policyId, clientId, data, clientData }) => {
    const newAssignedPolicy = await AssignedPolicy.create({
        policyId: policyId,
        clientId: clientId,
        data: data
    });

    // check for these fields: dob, gender, street, city, state, PINCODE, country, panCard, accountNo,
    // aadharNo, ifscCode, bankName, companyName, designation, annualIncome; if exists then update client 
    addAdditionalClientData(clientId, data);

    // send mail to all companies

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(clientData);
    const clientInfo = await condenseClientInfo(clientData);

    const clientPolicies = clientData.policies;
    clientPolicies.push({ policyId: newAssignedPolicy._id, interestedIn: true });
    // change to assigned from admin side
    await Client.findByIdAndUpdate(clientId, {
        $set: { policies: clientPolicies }
    });

    res.status(200)
        .cookie('accessToken', accessToken, cookiesOptions)
        .cookie('refreshToken', refreshToken, cookiesOptions)
        .json({ clientInfo, newAssignedPolicy });
}

const assignPolicy = async (req, res) => {
    try {
        console.log(req.body);
        const { policyId, clientId, password, formData } = req.body;
        if (!clientId && password) {
            let newClientId;
            const { firstName, lastName, phone, email } = formData;
            if (email) {
                const clientCorrespondingToEmail = await Client.findOne({ 'personalDetails.contact.email': email });
                if (clientCorrespondingToEmail) {
                    newClientId = clientCorrespondingToEmail._id;
                    await assignedPolicyWithClientId(res, { policyId, clientId: newClientId, data: formData, clientData: clientCorrespondingToEmail });
                    return;
                }
            }
            if (phone) {
                const clientCorrespondingToPhone = await Client.findOne({ 'personalDetails.contact.phone': phone });
                if (clientCorrespondingToPhone) {
                    newClientId = clientCorrespondingToPhone._id;
                    await assignedPolicyWithClientId(res, { policyId, clientId: newClientId, data: formData, clientData: clientCorrespondingToPhone });
                    return;
                }
            }
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

            newClientId = newClient._id;
            await assignedPolicyWithClientId(res, { policyId, clientId: newClientId, data: formData, clientData: newClient });
            return;
        } else {
            const client = await Client.findById(new ObjectId(clientId));
            await assignedPolicyWithClientId(res, { policyId, clientId: new ObjectId(clientId), data: formData, clientData: client });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

export {
    assignPolicy
};