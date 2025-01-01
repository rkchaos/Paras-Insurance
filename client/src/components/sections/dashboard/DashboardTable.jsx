import { useMemo, useState } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import { Eye, Search, Send, UserPlus } from 'lucide-react';

const DashboardTable = ({ unassignedPolicies, onSendCompanyPolicies, onAssignPolicy }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const itemsPerPage = 10;

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const filteredUnassignedPolicies = useMemo(() => {
        return unassignedPolicies.filter(unassignedPolicy => {
            const searchMatch =
                unassignedPolicy.clientDetails.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unassignedPolicy.clientDetails.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unassignedPolicy.clientDetails.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unassignedPolicy.clientDetails.phone.includes(searchTerm);

            const genderMatch = filterGender === 'ALL' || unassignedPolicy.clientDetails.gender?.toLowerCase() === filterGender.toLowerCase();

            let policyMatch = true;
            return searchMatch && genderMatch && policyMatch;
        });
    }, [searchTerm, filterGender, unassignedPolicies]);

    const totalPages = Math.ceil(filteredUnassignedPolicies.length / itemsPerPage);
    const indexOfLastCustomer = currentPage * itemsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
    const currentUnassignedPolicies = filteredUnassignedPolicies.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const handleViewDetails = (policy) => {
        setSelectedPolicy(policy);
    };

    const closeModal = () => {
        setSelectedPolicy(null);
    };

    const repeatedFields = (n, field) => {
        // need to add default values in policies
        const elements = [];
        for (let index = 0; index < n; index++) {
            elements.push(
                ...Object.entries(field.children).map(([key, childField]) => {
                    if (selectedPolicy.data[`${index + 1}${childField.name}`] == null || selectedPolicy.data[`${index + 1}${childField.name}`] == '' || selectedPolicy.data[`${index + 1}${childField.name}`] == 'Self') {
                        return null;
                    } else {
                        return (
                            <p className='ml-4' key={`${index}-${key}`}>
                                <strong>{childField.label}</strong>: {selectedPolicy.data[`${index + 1}${childField.name}`]}
                            </p>
                        );
                    }
                })
            );
        }
        return elements;
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Search className="h-4 w-4" />
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <select
                        value={filterGender}
                        onChange={(e) => setFilterGender(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="ALL">All Genders</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Policy Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Policy Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Gender
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentUnassignedPolicies.map((policy, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{policy.policyDetails.policyName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.policyDetails.policyType}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.clientDetails.firstName} {policy.clientDetails.lastName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.clientDetails.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.clientDetails.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.clientDetails.gender ? policy.clientDetails.gender : '-'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex space-x-2">
                                        <button className="text-green-600 hover:text-green-900">
                                            <Tooltip title='View policy details'>
                                                <Eye size={18} onClick={() => handleViewDetails(policy)} />
                                            </Tooltip>
                                        </button>
                                        <button className="text-green-600 hover:text-green-900">
                                            <Tooltip title='Send company policies to user'>
                                                <Send size={18} onClick={() => onSendCompanyPolicies(policy)} />
                                            </Tooltip>
                                        </button>
                                        <button className="text-green-600 hover:text-green-900">
                                            <Tooltip title='Policy assigned'>
                                                <Checkbox onChange={() => onAssignPolicy(policy._id)} checked={false} />
                                            </Tooltip>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-700">
                        Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, filteredUnassignedPolicies.length)} of {filteredUnassignedPolicies.length} results
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {selectedPolicy && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-xl leading-6 font-bold text-gray-900">Policy Details</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p><strong>Policy Name:</strong> {selectedPolicy.policyDetails.policyName}</p>
                                    <p><strong>Policy Type:</strong> {selectedPolicy.policyDetails.policyType}</p>
                                    <h2 className='text-xl font-semibold my-2'>Applicant Information</h2>
                                    <p className='ml-4'><strong>Client Name</strong>:{selectedPolicy.clientDetails['firstName']} {selectedPolicy.clientDetails['lastName']}</p>
                                    <p className='ml-4'><strong>Email</strong>: {selectedPolicy.clientDetails['email']}</p>
                                    <p className='ml-4'><strong>Phone</strong>: {selectedPolicy.clientDetails['phone']}</p>
                                    {Object.entries(selectedPolicy.policyDetails.policyForm.sections).map(([key, section]) => (
                                        Object.entries(section.fields).map(([key, field]) => (
                                            field.type === 'repeat' ?
                                                <>
                                                    <h2 className='text-xl font-semibold my-2'>Dependents Information</h2>
                                                    {repeatedFields(field.maxCount, field)}
                                                </>
                                                :
                                                <p className='ml-4' key={key}>
                                                    <strong>{field.label}</strong>: {selectedPolicy.data[field.name]}
                                                </p>
                                        ))
                                    ))}
                                </div>
                                <div className="items-center px-4 py-3">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardTable;