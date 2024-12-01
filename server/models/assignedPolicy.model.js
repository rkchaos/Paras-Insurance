import mongoose from 'mongoose';

const assignedPolicySchema = new mongoose.Schema({
    policyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Policy",
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
}, { timestamps: true });

const AssignedPolicy = mongoose.model('AssignedPolicy', assignedPolicySchema);
export default AssignedPolicy;