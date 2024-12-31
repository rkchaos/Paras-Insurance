import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    notes: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: 'admin'
    },
    managerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        default: null
    },
    status: {
        type: String,
        default: "active"
    },
    statusChangedBy: {
        type: String,
        default: "system"
    },
    loginAccess: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;