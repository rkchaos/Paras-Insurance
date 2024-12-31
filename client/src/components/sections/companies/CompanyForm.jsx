import React, { useState } from 'react';
import { X } from 'lucide-react';

function CompanyForm({ onClose, onSubmit }) {
    // const [formData, setFormData] = useState({
    //     name: '',
    //     type: 'Corporate',
    //     description: '',
    //     contactPerson: '',
    //     email: '',
    //     phone: '',
    //     registrationNumber: '',
    //     taxId: '',
    //     status: 'Active',
    //     address: ''
    // });
    const [formData, setFormData] = useState({
        name: 'Test',
        type: 'Corporate',
        description: 'test description',
        contactPerson: 'test person',
        email: 'test@test.test',
        phone: '8178984562',
        status: 'Active',
        address: 'test address'
    });

    function transformToCompanySchema(data) {
        return {
            companyName: data.name, 
            companyType: data.type, // Map "type" to "companyType"
            companyDescription: data.description, // Map "description" to "companyDescription"
            contactInfo: {
                contactPerson: data.contactPerson, // Map "contactPerson" to "contactInfo.contactPerson"
                phone: data.phone, // Map "phone" to "contactInfo.phone"
                email: data.email, // Map "email" to "contactInfo.email"
                website: data.website || "", // Add "website" with a default empty string if not provided
            },
            address: data.address,
            policies: [] 
        };
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(transformToCompanySchema(formData));
        onClose();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">Add New Company</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="Corporate">Corporate</option>
                                <option value="Enterprise">Enterprise</option>
                                <option value="SME">SME</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Person
                            </label>
                            <input
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add Company
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CompanyForm;