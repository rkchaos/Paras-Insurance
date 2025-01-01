import axios from 'axios';

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

// Client
export const fetchCondenseClientInfo = () => API.get('/client/fetchCondenseInfo');
export const fetchAllClientData = (clientId) => API.get('/client/fetchAllData', { params: clientId });
export const fetchAllCustomers = () => API.get('/client/fetchAll');
export const register = (authData) => API.post('/client/register', authData);
export const login = (authData) => API.post('/client/login', authData);
export const logout = () => API.delete('/client/logout');
export const forgotPassword = (email) => API.get('/client/forgotPassword', { params: email });
export const resetPassword = (authData) => API.patch('/client/resetPassword', authData);
export const deleteProfile = () => API.delete('/client/deleteProfile');

// Policy
export const fetchAllPolicies = () => API.get('/policy/fetchAll');
export const fetchAllPolicyFields = (policyId) => API.get('/policy/fetchAllFields', { params: policyId });
export const fetchEveryPolicyId = () => API.get('/policy/fetchEveryPolicyId');

// AssignedPolicy
export const assignPolicy = (assignedPolicyData) => API.post('/assignedPolicy/assign', assignedPolicyData);
export const fetchAllUnassignedPolicies = () => API.get('/assignedPolicy/fecthAllUnassigned');
export const addAssignPolicy = (assignedPolicyId) => API.get('/assignedPolicy/addAssign', { params: assignedPolicyId });

// Employee
export const fetchAllEmployees = () => API.get('/employee/fetchAll');
export const addEmployee = (formData) => API.post('/employee/add', formData);
export const removeEmployeeAccess = (employeeId) => API.delete('/employee/removeAccess', { params: employeeId });

// Company
export const fetchAllCompanies = () => API.get('/company/fetchAll');
export const createCompany = (formData) => API.post('/company/create', formData);
export const deleteCompany = (companyId) => API.delete('/company/delete', { params: companyId });
export const addCompanyPolicy = (formData) => API.post('/company/addPolicy', formData);
export const removeCompanyPolicy = (companyId, policyId) => API.delete('/company/removePolicy', { params: { companyId, policyId } });
export const fetchCompanyPoliciesByType = (clientId, policyType) => API.get('/company/fetchPolicyByType', { params: { clientId, policyType } });
export const sendCompanyPolicies = (formData) => API.put('/company/sendCompanyPolicies', formData);

