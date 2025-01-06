import { useState } from 'react';
import { Close } from '@mui/icons-material';

const PolicyModal = ({ policyData, onClose, onRemovePolicy }) => {
    const [error, setError] = useState('');
    const { policy, company } = policyData;

    const handleRemovePolicy = async () => {
        const errorMessage = await onRemovePolicy({ companyId: company._id, policyId: policy._id });
        if (!errorMessage) {
            onClose();
        } else {
            setError(errorMessage);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">{policy.policyName}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <Close />
                    </button>
                </div>

                <div className="p-6">
                    <div className="mb-3">
                        <p className="text-sm text-gray-600">Offered by: <strong>{company.companyName}</strong></p>
                    </div>

                    <div className="mb-3">
                        <h3 className="font-medium">Policy Features</h3>
                        {policy.policyFeatures.split(',').map((feature, index) => (
                            <p key={index} className="text-gray-600">{feature.trim()}</p>
                        ))}
                    </div>

                    <div className="mb-3">
                        <h3 className="font-medium">Policy Type</h3>
                        <p className="text-gray-600">{policy.policyType}</p>
                    </div>

                    <div className="mb-3">
                        <h3 className="font-medium">Policy Description</h3>
                        <p className="text-gray-600">{policy.policyDescription}</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className="mb-3">
                            <h3 className="font-medium">Coverage Type</h3>
                            <p className="text-gray-600">{policy.coverageType}</p>
                        </div>
                        <div className="mb-3">
                            <h3 className="font-medium">Coverage Amount</h3>
                            <p className="text-gray-600">{policy.coverageAmount}</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className="mb-3">
                            <h3 className="font-medium">Premium Type</h3>
                            <p className="text-gray-600">{policy.premiumType}</p>
                        </div>
                        <div className="mb-3">
                            <h3 className="font-medium">Premium Amount</h3>
                            <p className="text-gray-600">{policy.premiumAmount}</p>
                        </div>
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
                            type="button"
                            onClick={handleRemovePolicy}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Remove Policy
                        </button>
                    </div>

                    <div className='relative'>
                        {error && <span className='absolute bottom-0 text-sm text-red-600'>{error}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicyModal;