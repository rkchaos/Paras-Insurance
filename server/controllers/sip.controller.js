import { ObjectId } from 'mongodb';
// importing models
import SIP from "../models/sip.model.js";
import Client from "../models/client.model.js";

// working
const createSip = async (req, res) => {
    try {
        const { formData, id } = req.body.formData;
        const { personalDetails, financialDetails, employmentDetails } = formData;
        if (
            !personalDetails?.firstName ||
            !personalDetails?.contact?.email ||
            !personalDetails?.contact?.phone
        ) return res.status(400).json({ message: 'First Name, Email, and Phone are required.' });

        const sip = await SIP.create({
            clientId: id,
            personalDetails, financialDetails, employmentDetails,
            stage: 'Interested'
        });

        res.status(200).json(sip);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
};
// working
const uploadSipMedia = async (req, res) => {
    try {
        const { sipId } = req.body;
        const filesArray = req.files;
        const sip = await SIP.findById(sipId);

        for (let file of filesArray) {
            const fieldName = file.fieldname;
            if (fieldName === 'panCard') {
                sip.financialDetails.panCardURL = file.filename;
            } else if (fieldName === 'aadhaar') {
                sip.financialDetails.aadhaarURL = file.filename;
            }
        }

        await sip.save();
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
};
// working TODO: (needs to be updated for quotation)
const fetchAllSipsData = async (req, res) => {
    try {
        const { clientId } = req.query;
        const currentClientId = req.client._id;
        if (clientId !== currentClientId.toString()) {
            const isCurrentClientEmployee = await Employee.findOne({ clientId: currentClientId.toString() });

            if (!isCurrentClientEmployee) return res.status(400).json({ message: 'Unauthorised action.' });

            const client = await Client.findById(clientId);
            if (!client) return res.status(404).json({ message: 'No client found.' });

        }

        const clientSip = await SIP.find({ clientId: new ObjectId(clientId) });

        res.status(200).json(clientSip);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
};

const fetchAllSips = async (req, res) => {
    try {
        const sips = await SIP.aggregate([
            {
              $lookup: {
                from: "clients", // Name of the Client collection
                localField: "clientId", // Field in SIP collection
                foreignField: "_id", // Primary key in Client collection
                as: "clientDetails" // The name of the field to store joined data
              }
            },
            {
                $unwind: '$clientDetails'
            },
            {
              $sort: { createdAt: -1 } // Sort the documents by createdAt in descending order
            }
          ]);
          
        res.status(200).json(sips);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
}

export {
    createSip,
    uploadSipMedia,
    fetchAllSipsData,
    fetchAllSips,
}