import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { addAssignPolicy, fetchAllUnassignedPolicies, fetchCompanyPoliciesByType, sendCompanyPolicies } from '../../api';
import DashboardTable from './dashboard/DashboardTable';
import PolicyModal from './dashboard/PoliciesModal';

const Dashboard = () => {
    const [unassignedPolicies, setUnassignedPolicies] = useState([]);

    const getAllUnassignedPolicies = async () => {
        try {
            const { data } = await fetchAllUnassignedPolicies();
            setUnassignedPolicies(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllUnassignedPolicies();
    }, []);

    // const [currentPolicyId, setCurrentPolicyId] = useState('');
    const [currentAssignedPolicyId, setCurrentAssignedPolicyId] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companyPolicies, setCompanyPolicies] = useState([]);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSend = async () => {
        try {
            await sendCompanyPolicies({ assignedPolicyId: currentAssignedPolicyId, companyPolicies });
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendCompanyPolicies = async (policy) => {
        try {
            setCurrentAssignedPolicyId(policy._id);
            const { data } = await fetchCompanyPoliciesByType(policy.clientId, policy.policyDetails.policyType);
            setCompanyPolicies(data);
            handleOpenModal();
        } catch (error) {
            console.log(error);
        }
    }

    const handleAssignPolicy = async (assignedPolicyId) => {
        try {
            const { data } = await addAssignPolicy({assignedPolicyId});
            getAllUnassignedPolicies();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Unassigned Policies ({unassignedPolicies?.length})</h1>
                {/* 
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Assign New Policy
                </button> 
                */}
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <DashboardTable
                        unassignedPolicies={unassignedPolicies}
                        onSendCompanyPolicies={handleSendCompanyPolicies}
                        onAssignPolicy={handleAssignPolicy}
                        reload={getAllUnassignedPolicies}
                    />
                </div>
            </div>
            <PolicyModal
                companyPolicies={companyPolicies}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSend={handleSend}
            />
        </div>
    );
}

export default Dashboard;