import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
// importing api end-points
import { fetchAllAssignedPolicies } from '../../api';
// importing components
import PolicyTable from './policies/PolicyTable';

const PolicyManagement = () => {
    const [assignedPolicies, setAssignedPolicies] = useState([]);
    const getAllAssignedPolicies = async () => {
        try {
            const { data } = await fetchAllAssignedPolicies();
            setAssignedPolicies(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllAssignedPolicies();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Assigned Policies ({assignedPolicies?.length})</h1>
                <Tooltip title='Refresh Data'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jxhgzthg.json"
                        trigger="click" stroke="bold" state="loop-cycle"
                        colors="primary:#111827,secondary:#111827"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                        onClick={getAllAssignedPolicies}
                    />
                </Tooltip>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <PolicyTable
                        assignedPolicies={assignedPolicies}
                        reload={getAllAssignedPolicies}
                    />
                </div>
            </div>
        </div>
    );
}

export default PolicyManagement;