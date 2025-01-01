import { useState } from 'react';
import { CirclePlus, Edit2, Trash2 } from 'lucide-react';
import PolicyModal from './PolicyModal';
import { Tooltip } from '@mui/material';

const CompanyTable = ({ companiesData, onAddPolicy, onRemovePolicy, onDelete }) => {
    const [selectedPolicy, setSelectedPolicy] = useState(null);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Company Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Person
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Policies Offered
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {companiesData.map((company, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{company.companyName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{company.companyType}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{company.contactInfo.contactPerson}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{company.contactInfo.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{company.contactInfo.email}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500">
                                    {company.policies?.length === 0 ?
                                        <div>No data available</div>
                                        :
                                        company.policies.map((policy, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedPolicy({ policy, company })}
                                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1 hover:bg-blue-200 cursor-pointer"
                                            >
                                                {policy.policyName}
                                            </button>
                                        ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${company.companyStatus === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {company.companyStatus === 'active' ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex space-x-2">
                                    <button className="text-green-600 hover:text-green-900">
                                        <Tooltip title='Add policies'>
                                            <CirclePlus size={18} onClick={() => onAddPolicy(company._id)} />
                                        </Tooltip>
                                    </button>
                                    <button className="text-blue-600 hover:text-blue-900">
                                        <Tooltip title='Edit details'>
                                            <Edit2 size={18} />
                                        </Tooltip>
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        <Tooltip title='Delete company'>
                                            <Trash2 size={18} onClick={() => onDelete(company._id)} />
                                        </Tooltip>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedPolicy && (
                <PolicyModal
                    policyData={selectedPolicy}
                    onClose={() => setSelectedPolicy(null)}
                    onRemovePolicy={onRemovePolicy}
                />
            )}
        </div>
    );
}

export default CompanyTable;