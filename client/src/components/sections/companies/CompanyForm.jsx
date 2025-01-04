import { useState } from 'react';
import { Close } from '@mui/icons-material';

const CompanyForm = ({ onClose, onSubmit }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        type: 'Corporate',
        description: '',
        contactPerson: '',
        email: '',
        phone: '',
        registrationNumber: '',
        taxId: '',
        status: 'Active',
        address: ''
    });

    const transformToCompanySchema = (data) => {
        return {
            companyName: data.name,
            companyType: data.type,
            companyDescription: data.description,
            companyStatus: data.status,
            contactInfo: {
                contactPerson: data.contactPerson,
                phone: data.phone,
                email: data.email,
                website: data.website || "",
            },
            address: data.address,
            policies: []
        };
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData, [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errorMessage = await onSubmit(transformToCompanySchema(formData));
        if (!errorMessage) {
            onClose();
        } else {
            setError(errorMessage);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">Add New Company</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <Close size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name<span className='text-red-600'>*</span>
                            </label>
                            <input
                                type="text" name="name" required
                                value={formData.name} onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Type<span className='text-red-600'>*</span>
                            </label>
                            <select
                                name="type"
                                value={formData.type} onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="Corporate">Corporate</option>
                                <option value="Enterprise">Enterprise</option>
                                <option value="SME">SME</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Description<span className='text-red-600'>*</span>
                        </label>
                        <textarea
                            name="description" rows="3" required
                            value={formData.description} onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Person<span className='text-red-600'>*</span>
                            </label>
                            <input
                                type="text" name="contactPerson" required
                                value={formData.contactPerson} onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email<span className='text-red-600'>*</span>
                            </label>
                            <input
                                type="email" name="email" required
                                value={formData.email} onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone<span className='text-red-600'>*</span>
                            </label>
                            <input
                                type="tel" name="phone" required
                                value={formData.phone} onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status<span className='text-red-600'>*</span>
                            </label>
                            <select
                                name="status"
                                value={formData.status} onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Website
                        </label>
                        <input
                            name="website"
                            value={formData.website} onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address<span className='text-red-600'>*</span>
                        </label>
                        <textarea
                            name="address" rows="3" required
                            value={formData.address} onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    <div className="mt-2 flex justify-end space-x-3">
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

                    <div className='relative'>
                        {error && <span className='absolute bottom-0 text-sm text-red-600'>{error}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CompanyForm;