import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { addCompanyPolicy, createCompany, deleteCompany, fetchAllCompanies, removeCompanyPolicy } from '../../api';
import CompanyTable from './companies/CompanyTable';
import CompanyForm from './companies/CompanyForm';
import PolicyForm from './companies/PolicyForm';

const CompanyManagement = () => {
    const [showForm, setShowForm] = useState(false);
    const [showPolicyForm, setShowPolicyForm] = useState(false);
    const [companiesData, setCompaniesData] = useState([]);

    const getAllCompanies = async () => {
        try {
            const { data } = await fetchAllCompanies();
            setCompaniesData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllCompanies();
    }, []);

    const handleAddCompany = async (newCompanyData) => {
        try {
            const { data } = await createCompany(newCompanyData);
            setCompaniesData(prevEmployeesData => [...prevEmployeesData, { ...data }]);
            return false;
        } catch (error) {
            console.error(error);
            const { response } = error;
            return response?.data?.message;
        }
    };

    const handleDeleteCompany = async (companyId) => {
        try {
            await deleteCompany({ companyId });
            setCompaniesData(prevCompaniesData => prevCompaniesData.filter((company) => company._id !== companyId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddCompanyPolicy = async (newCompanyPolicyData) => {
        try {
            const { data } = await addCompanyPolicy({ companyId: showPolicyForm, policyData: newCompanyPolicyData });
            getAllCompanies();
            return false;
        } catch (error) {
            console.error(error);
            const { response } = error;
            return response?.data?.message;
        }
    };

    const handleRemoveCompanyPolicy = async ({ companyId, policyId }) => {
        try {
            const { data } = await removeCompanyPolicy(companyId, policyId);
            getAllCompanies();
            return false;
        } catch (error) {
            console.error(error);
            const { response } = error;
            return response?.data?.message;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Company Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Add New Company
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <CompanyTable
                        companiesData={companiesData}
                        onAddPolicy={(companyId) => setShowPolicyForm(companyId)}
                        onRemovePolicy={handleRemoveCompanyPolicy}
                        onDelete={handleDeleteCompany}
                    />
                </div>
            </div>

            {showForm && (
                <CompanyForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleAddCompany}
                />
            )}

            {showPolicyForm &&
                <PolicyForm
                    onClose={() => setShowPolicyForm(false)}
                    onSubmit={handleAddCompanyPolicy}
                />
            }
        </div>
    );
}

export default CompanyManagement;