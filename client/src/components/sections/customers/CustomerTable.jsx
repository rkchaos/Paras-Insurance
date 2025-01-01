import React, { useState, useMemo } from 'react';
import { Edit2, Trash2, Search, Filter, UserPlus } from 'lucide-react';

function CustomerTable({ customers }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState('ALL');
    const [filterPolicy, setFilterPolicy] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    const filteredCustomers = useMemo(() => {
        return customers.filter(customer => {
            console.log(customer)
            const searchMatch =
                customer.personalDetails.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.personalDetails.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.personalDetails.contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.personalDetails.contact.phone.includes(searchTerm);

            const genderMatch = filterGender === 'ALL' || customer.Gender === filterGender;

            // let policyMatch = true;
            // if (filterPolicy !== 'ALL') {
            //     const [type, count] = filterPolicy.split(':');
            //     switch (type) {
            //         case 'TOTAL':
            //             policyMatch = customer.policyCount === count;
            //             break;
            //         case 'ACTIVE':
            //             policyMatch = customer.activePolicyCount === count;
            //             break;
            //         case 'EXPIRED':
            //             policyMatch = customer.expiredPolicyCount === count;
            //             break;
            //     }
            // }

            // return searchMatch && genderMatch && policyMatch;
            return searchMatch && genderMatch;
        });
    }, [searchTerm, filterGender, filterPolicy, customers]);

    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

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
                    <select
                        value={filterPolicy}
                        onChange={(e) => setFilterPolicy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="ALL">All Policies</option>
                        <option value="TOTAL:1">1 Total Policy</option>
                        <option value="TOTAL:2">2 Total Policies</option>
                        <option value="TOTAL:3">3 Total Policies</option>
                        <option value="ACTIVE:1">1 Active Policy</option>
                        <option value="ACTIVE:2">2 Active Policies</option>
                        <option value="EXPIRED:1">1 Expired Policy</option>
                        <option value="EXPIRED:2">2 Expired Policies</option>
                    </select>
                    <Filter className="h-4 w-4" />
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-1">
                        <UserPlus className="h-4 w-4" />
                        <span>Add Customer</span>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Count</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Policy Count</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expired Policy Count</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {customer.personalDetails.firstName} {customer.personalDetails.lastName}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{customer.personalDetails.contact.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{customer.personalDetails.contact.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{customer.policyCount}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{customer.activePolicyCount}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{customer.expiredPolicyCount}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${customer.personalDetails.gender?.toLowerCase() === 'male'
                                        ? 'bg-green-100 text-blue-800'
                                        : customer.personalDetails.gender?.toLowerCase() === 'female'? 'bg-red-100 text-pink-800': 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {customer.personalDetails.gender?.toLowerCase() === 'male' ? 'Male' : customer.personalDetails.gender?.toLowerCase() === 'female' ? 'Female' : '-'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <div className="flex space-x-2">
                                        <button className="p-1 border border-gray-300 rounded-md shadow-sm text-blue-600 hover:text-blue-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="p-1 border border-gray-300 rounded-md shadow-sm text-red-600 hover:text-red-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-700">
                    Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, filteredCustomers.length)} of {filteredCustomers.length} results
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

export default CustomerTable;

