import mongoose from 'mongoose';

const policyProviedSchema = new mongoose.Schema({
    policyName: {
        type: String,
        required: true,
    },
    policyType: {
        type: String,
        required: true,
    },
    policyDescription: {
        type: String,
        required: true,
    },
    coverageAmount: {
        type: Number,
        required: true,
    },
    coverageType: {
        type: String,
        required: true,
    },
    policyFeatures: {
        type: String,
        required: true,
    },
    premiumType: {
        type: String,
        required: true,
    },
    premiumAmount: {
        type: Number,
        required: true,
    },
    contactPerson: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
});

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    companyType: {
        type: String,
        enum: ['Corporate', 'Enterprise', 'SME'],
        default: 'Corporate',
        required: true,
    },
    companyStatus: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true,
    },
    companyDescription: {
        type: String,
    },
    companyRegistrationNo: {
        type: String,
        required: true
    },
    companyWebsite: {
        type: String,
    },
    companyAddress: {
        type: String,
        required: true
    },
    companyPoliciesProvided: [policyProviedSchema]
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;