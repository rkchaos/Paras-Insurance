import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
// importing api end-points
import { addAssignPolicy, fetchAllUnassignedPolicies, fetchCompanyPoliciesByType, sendCompanyPolicies } from '../../api';
// importing components
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

    const [currentAssignedPolicyId, setCurrentAssignedPolicyId] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companyPolicies, setCompanyPolicies] = useState([]);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSend = async () => {
        try {
            await sendCompanyPolicies({ clientPolicyId: currentAssignedPolicyId, companyPolicies });
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

    const handleAssignPolicy = async (clientPolicyId) => {
        try {
            const { data } = await addAssignPolicy({ clientPolicyId });
            getAllUnassignedPolicies();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Unassigned Policies ({unassignedPolicies?.length})</h1>
                <Tooltip title='Refresh Data'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jxhgzthg.json"
                        trigger="click" stroke="bold" state="loop-cycle"
                        colors="primary:#111827,secondary:#111827"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                        onClick={getAllUnassignedPolicies}
                    />
                </Tooltip>
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