import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    notes: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ['Admin', 'SuperAdmin'],
        default: 'Admin',
        required: true,
    },
    managerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        default: null,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true,
    },
    statusChangedBy: {
        type: String,
        default: 'System',
    },
    loginAccess: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
        default: null,
    }
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;