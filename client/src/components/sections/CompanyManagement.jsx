import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import CompanyTable from './companies/CompanyTable';
import CompanyForm from './companies/CompanyForm';
import { fetchAllCompanies } from '../../api';

function CompanyManagement() {
    const [showForm, setShowForm] = useState(false);
    const [companiesData, setCompaniesData] = useState([]);

  const getAllCompanies = async () => {
        try {
            const { data } = await fetchAllCompanies();
            console.log(data);
            setCompaniesData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllCompanies();
    }, []);

    const handleAddCompany = (newCompany) => {
        console.log(newCompany);
        // setCompanies(prev => [...prev, { ...newCompany, id: prev.length + 1 }]);
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
                    <CompanyTable companiesData={companiesData} />
                </div>
            </div>

            {showForm && (
                <CompanyForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleAddCompany}
                />
            )}
        </div>
    );
}

export default CompanyManagement;