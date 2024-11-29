import axios from 'axios';

axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

// Client
export const register = (authData) => API.post('/client/register', authData);
export const login = (authData) => API.post('/client/login', authData);
export const logout = () => API.delete('/client/logout');

// Policy
export const fetchAllPolicies = () => API.get('/policy/fetchAll');
export const fetchAllPolicyFields = (policyId) => API.get('/policy/fetchAllFields', { params: policyId });