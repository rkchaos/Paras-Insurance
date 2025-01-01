import Client from '../models/client.model.js';
import Employee from '../models/employee.model.js';
import { generateAccessAndRefreshTokens } from './client.controller.js';

// normal user ko admin ya superadmin banana
const createEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(200).json(newEmployee);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

const addEmployee = async (req, res) => {
    try {
        const { employeeId, firstName, lastName, email, phone, role, managerId, status, loginAcess } = req.body;
        const employee = await Employee.findOne({ clientId: employeeId });

        if (employee.role !== 'superAdmin') return res.status(400).json({ message: 'Unauthorised action.' });

        const isClientEmailUnique = await Client.findOne({ 'personalDetails.contact.email': email });
        if (isClientEmailUnique) return res.status(400).json({ message: 'Email already registered. Assign role from Dashboard' });

        const isClientPhoneUnique = await Client.findOne({ 'personalDetails.contact.phone': phone });
        if (isClientPhoneUnique) return res.status(400).json({ message: 'Phone already registered. Assign role from Dashboard' });

        const newClient = await Client.create({
            userType: 'employee',
            password: `${firstName}@${lastName}`,
            personalDetails: {
                firstName: firstName,
                lastName: lastName,
                contact: {
                    email: email,
                    phone: phone
                },
            }
        });

        const newEmployee = await Employee.create({
            clientId: newClient._id, managerId, status, role, loginAcess
        });

        const returnData = {
            _id: newEmployee._id.toString(),
            clientId: newEmployee.clientId.toString(),
            firstName: newClient.personalDetails?.firstName || "",
            lastName: newClient.personalDetails?.lastName || "",
            email: newClient.personalDetails?.contact?.email || "",
            phone: newClient.personalDetails?.contact?.phone || "",
            userType: newClient.userType || "",
            KYC: newClient.KYC || false,
            notes: newEmployee.notes || null,
            role: newEmployee.role || "",
            managerID: newEmployee.managerID ? newEmployee.managerID.toString() : null,
            status: newEmployee.status || "",
            statusChangedBy: newEmployee.statusChangedBy || "",
            loginAccess: newEmployee.loginAccess || false,
            createdAt: newEmployee.createdAt || "",
            updatedAt: newEmployee.updatedAt || "",
            __v: newEmployee.__v || 0
        };

        await generateAccessAndRefreshTokens(newClient);
        res.status(200).json(returnData);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

// update

const removeEmployeeAccess = async (req, res) => {
    // technically you should check who is asking for this permission and then decide if === SuperAdmin then only let them remove access of others
    try {
        const { employeeId } = req.query;
        const removedEmployee = await Employee.findByIdAndDelete(employeeId);

        if (!removedEmployee) return res.status(404).json({ error: "Employee not found" });

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

const fetchAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.aggregate([
            {
                $lookup: {
                    from: "clients",
                    localField: "clientId",
                    foreignField: "_id",
                    as: "clientData"
                }
            },
            {
                $unwind: {
                    path: "$clientData",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    firstName: "$clientData.personalDetails.firstName",
                    lastName: "$clientData.personalDetails.lastName",
                    email: "$clientData.personalDetails.contact.email",
                    phone: "$clientData.personalDetails.contact.phone",
                    userType: "$clientData.userType",
                    KYC: "$clientData.KYC"
                }
            },
            {
                $project: {
                    clientData: 0
                }
            }
        ]);
        res.status(200).json(employees);
    } catch (error) {
        console.log(error);
        res.status(503).json({ message: 'Network error. Try agin' });
    }
}

export {
    createEmployee,
    addEmployee,
    fetchAllEmployees,
    removeEmployeeAccess,
};