import { useState } from 'react';

const PolicyForm = ({ onSubmit, onClose }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        policyName: '',
        policyType: '',
        coverageAmount: '',
        coverageType: '',
        policyFeatures: '',
        premiumType: '',
        premiumAmount: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData, [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errorMessage = await onSubmit(formData);
        if (!errorMessage) {
            onClose();
        } else {
            setError(errorMessage);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white">
                <div className="mt-1 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Company Policy</h3>
                    <form onSubmit={handleSubmit} className="mt-6 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Policy Name<span className='text-red-600'>*</span>
                                </label>
                                <input
                                    name="policyName" required
                                    value={formData.policyName} onChange={handleChange}
                                    className="p-2 w-full border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Policy Type<span className='text-red-600'>*</span>
                                </label>
                                <input
                                    name="policyType" required
                                    value={formData.policyType} onChange={handleChange}
                                    className="p-2 w-full border rounded"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Policy Description<span className='text-red-600'>*</span>
                                </label>
                                <textarea
                                    name="policyDescription" rows={3} required
                                    value={formData.policyDescription} onChange={handleChange}
                                    className="p-2 w-full border rounded"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Coverage Amount<span className='text-red-600'>*</span>
                                </label>
                                <input
                                    name="coverageAmount" type="number" required
                                    value={formData.coverageAmount} onChange={handleChange}
                                    className="p-2 w-full border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Coverage Type<span className='text-red-600'>*</span>
                                </label>
                                <input
                                    name="coverageType" required
                                    value={formData.coverageType} onChange={handleChange}
                                    className="p-2 w-full border rounded"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Policy features<span className='text-red-600'>*</span>
                                </label>
                                <textarea
                                    name="policyFeatures" rows={3} required
                                    value={formData.policyFeatures} onChange={handleChange}
                                    placeholder="(comma-separated)"
                                    className="p-2 w-full border rounded"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Premium Amount<span className='text-red-600'>*</span>
                                </label>
                                <input
                                    name="premiumAmount" type="number" required
                                    value={formData.premiumAmount} onChange={handleChange}
                                    className="p-2 w-full border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Premium Type<span className='text-red-600'>*</span>
                                </label>
                                <input
                                    name="premiumType" required
                                    value={formData.premiumType} onChange={handleChange}
                                    className="p-2 w-full border rounded"
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end space-x-3">
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
                                Add Policy
                            </button>
                        </div>

                        <div className='relative'>
                            {error && <span className='absolute bottom-0 text-sm text-red-600'>{error}</span>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PolicyForm;