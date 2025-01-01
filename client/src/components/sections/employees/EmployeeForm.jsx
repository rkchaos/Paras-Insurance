import { useState } from 'react';
import { X } from 'lucide-react';
import { Switch } from '@mui/material';

const EmployeeForm = ({ onClose, onSubmit }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        managerId: '',
        role: 'admin',
        loginAccess: true,
        status: 'active',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errorMessage = await onSubmit(formData);
        if (!errorMessage) {
            onClose();
        } else {
            setError(errorMessage);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'loginAccess') {
            setFormData(prevFormData => ({
                ...prevFormData, 'loginAccess': event.target.checked
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData, [name]: value
            }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">Add New Employee</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name<span className='text-red-600'>*</span>
                            </label>
                            <input
                                type="text" name="firstName" required
                                value={formData.firstName} onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name
                            </label>
                            <input
                                type="text" name="lastName"
                                value={formData.lastName} onChange={handleChange}
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role<span className='text-red-600'>*</span>
                            </label>
                            <select
                                name="role"
                                value={formData.role} onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="admin">Admin</option>
                                <option value="superAdmin">Super Admin</option>
                            </select>
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
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className='flex justify-between items-center'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Login Access<span className='text-red-600'>*</span>
                            </label>
                            <Switch name="loginAccess" checked={formData.loginAccess} onChange={handleChange} />
                        </div>
                        {/* Manager ID */}
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
                            Add Employee
                        </button>
                    </div>

                    <div className='relative'>
                        {error && <span className='absolute bottom-0 text-sm text-red-600'>{error}</span>}
                    </div>
                    
                    <p className='text-gray-600'>The employee password will be [firstName]@[lastName]</p>
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;