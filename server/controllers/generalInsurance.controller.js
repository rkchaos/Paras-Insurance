import { ObjectId } from 'mongodb';
// importing models
import GeneralInsurance from "../models/generalInsurance.model.js";
import Client from "../models/client.model.js";

// working
const createGeneralInsurance = async (req, res) => {
    try {
        const { formData, id } = req.body.formData;
        const { personalDetails, financialDetails, employmentDetails } = formData;
        if (
            !personalDetails?.firstName ||
            !personalDetails?.contact?.email ||
            !personalDetails?.contact?.phone
        ) return res.status(400).json({ message: 'First Name, Email, and Phone are required.' });

        const generalInsurance = await GeneralInsurance.create({
            clientId: id,
            personalDetails, financialDetails, employmentDetails,
            stage: 'Interested'
        });

        res.status(200).json(generalInsurance);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
};
// working
const uploadGeneralInsuranceMedia = async (req, res) => {
    try {
        const { generalInsuranceId } = req.body;
        const filesArray = req.files;
        const generalInsurance = await GeneralInsurance.findById(generalInsuranceId);

        for (let file of filesArray) {
            const fieldName = file.fieldname;
            if (fieldName === 'panCard') {
                generalInsurance.financialDetails.panCardURL = file.filename;
            } else if (fieldName === 'aadhaar') {
                generalInsurance.financialDetails.aadhaarURL = file.filename;
            }
        }

        await generalInsurance.save();
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
};
// working TODO: (needs to be updated for quotation)
const fetchAllGeneralInsurancesData = async (req, res) => {
    try {
        const { clientId } = req.query;
        const currentClientId = req.client._id;
        if (clientId !== currentClientId.toString()) {
            const isCurrentClientEmployee = await Employee.findOne({ clientId: currentClientId.toString() });

            if (!isCurrentClientEmployee) return res.status(400).json({ message: 'Unauthorised action.' });

            const client = await Client.findById(clientId);
            if (!client) return res.status(404).json({ message: 'No client found.' });

        }

        const clientGeneralInsurance = await GeneralInsurance.find({ clientId: new ObjectId(clientId) });

        res.status(200).json(clientGeneralInsurance);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
};

const fetchAllGeneralInsurances = async (req, res) => {
    try {
        const generalInsurances = await GeneralInsurance.aggregate([
            {
              $lookup: {
                from: "clients", // Name of the Client collection
                localField: "clientId", // Field in GeneralInsurance collection
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
          
        res.status(200).json(generalInsurances);
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
}

export {
    createGeneralInsurance,
    uploadGeneralInsuranceMedia,
    fetchAllGeneralInsurancesData,
    fetchAllGeneralInsurances,
}