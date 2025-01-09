import mongoose from 'mongoose';
// importing models
import Company from '../models/company.model.js';
import Quotation from '../models/quotation.model.js';
import CombinedQuotation from '../models/combinedQuotation.model.js';
import ClientPolicy from '../models/clientPolicy.model.js';

function addTransformedArrayTo2DArray(existingArray, inputArray, label) {
    // Transform the input array
    let transformedArray = [];

    inputArray.forEach((row, index) => {
        if (index === 0) {
            // Add the label to the first row
            transformedArray.push([label, ...row.slice(1)]);
        } else {
            // Add the remaining rows with the label as empty for the first column
            transformedArray.push(['', ...row.slice(1)]);
        }
    });

    // Add the transformed array to the given 2D array
    existingArray.push(...transformedArray);

    return existingArray;
}
// working TODO: validation for client and companyId
const createQuotation = async (req, res) => {
    try {
        const { formData } = req.body;
        const { clientPolicyId, clientId, companyId, quotationData } = formData;
        console.log(formData);
        const q = await Quotation.create({
            clientPolicyId: new mongoose.Types.ObjectId(clientPolicyId),
            clientId: new mongoose.Types.ObjectId(clientId),
            companyId: new mongoose.Types.ObjectId(companyId),
            quotationData: quotationData
        });

        const company = await Company.findById(new mongoose.Types.ObjectId(companyId));
        const existingQuotation = await CombinedQuotation.findOne({ clientPolicyId: new mongoose.Types.ObjectId(clientPolicyId), clientId: new mongoose.Types.ObjectId(clientId) });
        let updatedQuotation = [];
        if (existingQuotation.quotationData.length === 0) {
            updatedQuotation = addTransformedArrayTo2DArray([[]], quotationData, company.companyName);
        } else {
            updatedQuotation = addTransformedArrayTo2DArray(existingQuotation.quotationData, quotationData, company.companyName);
        }
        const result = await CombinedQuotation.findOneAndUpdate(
            { clientPolicyId: new mongoose.Types.ObjectId(clientPolicyId), clientId: new mongoose.Types.ObjectId(clientId) },
            {
                $set: { quotationData: updatedQuotation },
                $inc: { countRecievedQuotations: 1 }
            },
            { new: true }
        );

        console.log(result);
        // check if countrecived == total then clientPolicy.quotation me ye combined dal do also status to submitted
        const { countRecievedQuotations, countTotalEmails } = result;
        if (countTotalEmails === countRecievedQuotations) {
            // sabne fill kar diya
            // TODO: use combinedQuotationId instead of data
            await ClientPolicy.findByIdAndUpdate(new mongoose.Types.ObjectId(clientPolicyId), { $set: { quotation: result.quotationData } })
            // TODO: interactio history add [quotation provided]
        }
        res.sendStatus(200)
    } catch (error) {
        console.error(error);
        res.status(503).json({ message: 'Network error. Try again' })
    }
};

export {
    createQuotation,
}