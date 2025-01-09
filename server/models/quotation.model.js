import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
    clientPolicyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientPolicy',
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    quotationData: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    status: {
        type: String,
        default: 'Submitted',
        required: true,
    }
}, { timestamps: true });

const Quotation = mongoose.model('Quotation', quotationSchema);
export default Quotation;