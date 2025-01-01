import { useMemo, useState } from 'react';
import { Tooltip } from '@mui/material';
import { CirclePlus, Edit2, Filter, Search, Trash2 } from 'lucide-react';
import PolicyModal from './PolicyModal';

const CompanyTable = ({ companiesData, onAddPolicy, onRemovePolicy, onDelete }) => {
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 10;

    const filteredCompaniesData = useMemo(() => {
        return companiesData.filter(company => {
            console.log(company)
            const searchMatch =
                company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.contactInfo.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.contactInfo.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.contactInfo.email.includes(searchTerm);

            const statusMatch = filterStatus === 'ALL' || company.companyStatus?.toLowerCase() === filterStatus.toLowerCase();

            return searchMatch && statusMatch;
        });
    }, [searchTerm, filterStatus, companiesData]);

    const totalPages = Math.ceil(filteredCompaniesData.length / companiesPerPage);
    const indexOfLastCompany = currentPage * companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    const currentCompaniesData = filteredCompaniesData.slice(indexOfFirstCompany, indexOfLastCompany);

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search by company name, contact person, email, or phone..."
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
                        value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                    <Filter className="h-4 w-4" />
                </div>
            </div>
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
                        {currentCompaniesData.map((company, index) => (
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
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${company.companyStatus?.toLowerCase() === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {company.companyStatus?.toLowerCase() === 'active' ? 'Active' : 'Inactive'}
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
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-700">
                    Showing {indexOfFirstCompany + 1} to {Math.min(indexOfLastCompany, filteredCompaniesData.length)} of {filteredCompaniesData.length} results
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CompanyTable;