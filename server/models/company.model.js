import mongoose from 'mongoose';

const policyProviedSchema = new mongoose.Schema({
    policyName: {
        type: String,
        required: true,
    },
    policyType: {
        type: String,
        enum: ['Life', 'Health', 'Home', 'Travel', 'Vehicle', 'General'],
        default: 'Life',
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
    companyDescription: {
        type: String,
    },
    companyStatus: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true,
    },
    contactInfo: {
        contactPerson: {
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
        },
        website: {
            type: String,
        }
    },
    address: {
        type: String,
        required: true
    },
    policiesProvided: [policyProviedSchema]
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
export default Company;