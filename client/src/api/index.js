import axios from 'axios';

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

// Client
export const register = (authData) => API.post('/client/register', authData);
export const login = (authData) => API.post('/client/login', authData);
export const fetchCondenseClientInfo = () => API.get('/client/fetchCondenseInfo');
export const fetchProfileData = (clientId) => API.get('/client/fetchProfileData', { params: clientId });
export const fetchPoliciesData = (clientId) => API.get('/client/fetchPoliciesData', { params: clientId });
export const fetchAllClients = () => API.get('/client/fetchAll');
export const updateProfile = (formData) => API.post('/client/updateProfile', { formData });
export const uploadProfileMedia = (media) => API.post('/client/uploadProfileMedia', media, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const logout = () => API.delete('/client/logout');
export const deleteProfile = () => API.delete('/client/deleteProfile');
export const forgotPassword = (email) => API.get('/client/forgotPassword', { params: email });
export const resetPassword = (authData) => API.patch('/client/resetPassword', authData);

// Policy
export const fetchAllPolicies = () => API.get('/policy/fetchAll');
export const fetchAllPolicyFields = (policyId) => API.get('/policy/fetchAllFields', { params: policyId });
export const fetchEveryPolicyId = () => API.get('/policy/fetchEveryPolicyId');

// ClientPolicy
export const createClientPolicy = (clientPolicyData) => API.post('/clientPolicy/createClientPolicy', clientPolicyData);
export const fetchClientPolicy = (clientPolicyId) => API.get('/clientPolicy/fetchClientPolicy', { params: clientPolicyId });
export const fetchAllUnassignedPolicies = () => API.get('/clientPolicy/fecthAllUnassigned');
export const fetchAllAssignedPolicies = () => API.get('/clientPolicy/fecthAllAssigned');
export const countAllAssignedPolicies = () => API.get('/clientPolicy/countAllAssigned');
export const assignClientPolicy = (data) => API.post('/clientPolicy/assignClientPolicy', data);
export const uploadClientPolicyMedia = (media) => API.post('/clientPolicy/uploadClientPolicyMedia', media, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const addAvailableCompanyPolicies = (formData) => API.post('/clientPolicy/addAvailableCompany', formData);

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

// Quotation
export const createQuotation = (formData) => API.post('/quotation/create', { formData });

// SIP
export const createSip = (formData) => API.post('/sip/create', { formData });
export const uploadSipMedia = (media) => API.post('/sip/uploadMedia', media, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const fetchAllSipsData = (clientId) => API.get('/sip/fetchAllData', { params: clientId });
export const fetchAllSips = () => API.get('/sip/fetchAllSips');

// SIP
export const createGeneralInsurance = (formData) => API.post('/generalInsurance/create', { formData });
export const uploadGeneralInsuranceMedia = (media) => API.post('/generalInsurance/uploadMedia', media, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});
export const fetchAllGeneralInsurancesData = (clientId) => API.get('/generalInsurance/fetchAllData', { params: clientId });
export const fetchAllGeneralInsurances = () => API.get('/generalInsurance/fetchAllGeneralInsurances');
