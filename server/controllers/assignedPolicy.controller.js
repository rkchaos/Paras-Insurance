import AssignedPolicy from "../models/assignedPolicy.model.js";
import Client from "../models/client.model.js";
import { ObjectId } from "mongodb";
import { condenseClientInfo, generateAccessAndRefreshTokens } from "./client.controller.js";

const cookiesOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
};

const assignedPolicyWithClientId = async (res, { policyId, clientId, data, clientData }) => {
    const newAssignedPolicy = await AssignedPolicy.create({
        policyId: policyId,
        clientId: clientId,
        data: data
    });
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(clientData);
    const clientInfo = condenseClientInfo(clientData);

    const clientPolicies = clientData.policies;
    clientPolicies.push({ policyId: newAssignedPolicy._id, interestedIn: true });
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