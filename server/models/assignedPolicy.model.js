import mongoose from 'mongoose';
import Client from './client.model.js';
import Policy from './policy.model.js';

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
    },
    stage: {
        type: Number,
        required: true,
    },
    availablePolicies: {
        type: mongoose.Schema.Types.Mixed,
    }
}, { timestamps: true });

assignedPolicySchema.post('save', async function (document, next) {
    try {
        const policy = await Policy.findById(document.policyId);
        await Client.findByIdAndUpdate(document.clientId, {
            $push: {
                interactionHistory: {
                    type: 'Interested in Policy',
                    description: `Client is interested in ${policy.policyName} policy.`,
                },
            },
        });
    } catch (error) {
        console.error('Error updating client interaction history:', error);
    }

    next();
});

const AssignedPolicy = mongoose.model('AssignedPolicy', assignedPolicySchema);
export default AssignedPolicy;