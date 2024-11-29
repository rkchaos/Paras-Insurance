import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    fields: {
        type: mongoose.Schema.Types.Array
    }
});

const formSchema = new mongoose.Schema({
    sections: {
        type: [sectionSchema]
    },
    submitButtonLabel: {
        type: String
    }
});

const policySchema = new mongoose.Schema({
    policy_name: {
        type: String,
        required: true,
    },
    policy_type: {
        type: String,
        required: true,
    },
    policy_description: {
        type: String,
        required: true,
    },
    policy_icon: {
        type: Number,
        required: true,
    },
    form: {
        type: formSchema,
        required: true,
    },
    dataFormat: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
}, { timestamps: true });

const Policy = mongoose.model('Policy', policySchema);
export default Policy;