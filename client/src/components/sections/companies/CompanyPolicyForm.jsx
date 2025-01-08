import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';

const CompanyPolicyForm = ({ onClose, onSubmit }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        policyName: '',
        policyType: '',
        policyDescription: '',
        policyFeatures: '',
        coverageType: '',
        coverageAmount: '',
        premiumType: '',
        premiumAmount: '',
        contactPersonName: '',
        contactPersonPhone: '',
        contactPersonEmail: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData, [name]: value
        }));
    };

    const transformToFormat = (data) => {
        return {
            policyName: data.policyName,
            policyType: data.policyType,
            policyDescription: data.policyDescription,
            coverageAmount: data.coverageAmount,
            coverageType: data.coverageType,
            premiumType: data.premiumType,
            premiumAmount: data.premiumAmount,
            policyFeatures: data.policyFeatures,
            contactPerson: {
                name: data.contactPersonName,
                phone: data.contactPersonPhone,
                email: data.contactPersonEmail,
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errorMessage = await onSubmit(transformToFormat(formData));
        if (!errorMessage) { onClose() }
        else { setError(errorMessage) }
    };

    return (
        <div className="fixed z-[1000] inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                onClick={(event) => event.stopPropagation()}
                className="bg-white rounded-lg w-full max-w-2xl"
            >
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Add New Company Policy</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <Close />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 pb-4">
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <TextField
                            label="Policy Name" name="policyName" variant="outlined" required
                            value={formData.policyName} onChange={handleChange}
                        />
                        <TextField
                            label="Policy Type" name="policyType" variant="outlined" required
                            value={formData.policyType} onChange={handleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <TextField
                            label="Policy Description" name="policyDescription" required
                            multiline rows={3}
                            value={formData.policyDescription} onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <TextField
                            label="Coverage Type" name="coverageType" variant="outlined" required
                            value={formData.coverageType} onChange={handleChange}
                        />
                        <TextField
                            type='number' label="Coverage Amount" name="coverageAmount" variant="outlined" required
                            value={formData.coverageAmount} onChange={handleChange}
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <TextField
                            label="Premium Type" name="premiumType" variant="outlined" required
                            value={formData.premiumType} onChange={handleChange}
                        />
                        <TextField
                            type='number' label="Premium Amount" name="premiumAmount" variant="outlined" required
                            value={formData.premiumAmount} onChange={handleChange}
                        />
                    </div>

                    <div className="mt-4">
                        <TextField
                            label="Policy Features" name="policyFeatures" required
                            multiline rows={3}
                            placeholder='Enter comma-seprated values'
                            value={formData.policyFeatures} onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <p className='mt-4 mb-2'>Contact Person Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextField
                            label="Name" name="contactPersonName" variant="outlined" required
                            value={formData.contactPersonName} onChange={handleChange}
                        />
                        <TextField
                            type='tel' label="Phone" name="contactPersonPhone" variant="outlined" required
                            value={formData.contactPersonPhone} onChange={handleChange}
                        />
                        <TextField
                            type='email' label="Email" name="contactPersonEmail" variant="outlined" required
                            value={formData.contactPersonEmail} onChange={handleChange}
                        />
                    </div>

                    <div className="mt-2 flex justify-end space-x-3">
                        <Button
                            type="submit" variant='contained'
                            className="!text-white !bg-gray-900 hover:opacity-95"
                        >
                            Add Policy
                        </Button>
                    </div>

                    <div className='relative'>
                        {error && <span className='absolute bottom-0 text-sm text-red-600'>{error}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyPolicyForm;