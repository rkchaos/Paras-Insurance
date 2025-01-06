import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { Close, Delete, OpenInNew, Upload } from '@mui/icons-material';

const UpdateProfileForm = ({ clientData, closeUpdateProfile, isNotClosable, onSubmit, label }) => {
    const [error, setError] = useState('');

    const [formData, setFormData] = useState(clientData);
    const handleChange = (e, section, subsection = null) => {
        const { name, value } = e.target;
        if (subsection) {
            setFormData(prevState => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [subsection]: {
                        ...prevState[section][subsection],
                        [name]: value
                    }
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [section]: {
                    ...prevState[section],
                    [name]: value
                }
            }));
        }
    };

    const steps = ["User Details", "Financial Details", "Employment Details"]
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        if (activeStep === 0) {
            setError('');
            if (formData?.personalDetails?.firstName?.trim() === '') {
                setError('First name is mandatory');
            } else if (formData?.personalDetails?.contact?.email?.trim() === '') {
                setError('Email is mandatory');
            } else if (formData?.personalDetails?.contact?.phone?.trim() === '') {
                setError('Phone is mandatory');
            } else {
                setActiveStep(1)
            }
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [files, setFiles] = useState({
        panCard: '',
        aadhaar: ''
    });
    const [removedFiles, setRemovedFiles] = useState({
        panCard: false,
        aadhaar: false
    });
    const handleFileUploadPanCard = () => {
        document.getElementById(`panCardFileUpload`)?.click();
    }
    const handleFileUploadAadhaar = () => {
        document.getElementById(`aadhaarFileUpload`)?.click();
    }
    const removeUploadFilePanCard = () => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData, 'financialDetails': {
                    ...prevFormData['financialDetails'], 'panCardURL': ''
                }
            }
        });
        setRemovedFiles(prevState => ({ ...prevState, panCard: true }));
    }
    const removeUploadFileAadhaar = () => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData, 'financialDetails': {
                    ...prevFormData['financialDetails'], 'aadhaarURL': ''
                }
            }
        });
        setRemovedFiles(prevState => ({ ...prevState, aadhaar: true }));
    }
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const { name } = event.target;
        setFiles(prevFiles => {
            return { ...prevFiles, [name]: file }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        const errorMessage = await onSubmit(formData, removedFiles, files);
        if (!errorMessage) {
            closeUpdateProfile();
        } else {
            setError(errorMessage);
        }
    };

    return (
        <div onClick={closeUpdateProfile} className={`fixed z-30 inset-0 ${!isNotClosable && 'bg-gray-600 bg-opacity-50'} overflow-y-auto h-full w-full flex items-center justify-center`}>
            <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg shadow-md mt-16 pb-8'>
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">{label}</h2>
                    {!isNotClosable &&
                        <button onClick={closeUpdateProfile} className="text-gray-500 hover:text-gray-700">
                            <Close />
                        </button>
                    }
                </div>

                <form onSubmit={handleSubmit} className="w-[65vw] mx-auto px-6 py-4">
                    {(activeStep === 0) &&
                        <section className="mb-4">
                            <h3 className="block text-sm font-medium text-gray-700 mb-2">Personal Details</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                                <input
                                    type="text" name="firstName" placeholder="First Name*" required={true}
                                    value={formData.personalDetails?.firstName} onChange={(e) => handleChange(e, 'personalDetails')}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text" name="lastName" placeholder="Last Name"
                                    value={formData.personalDetails?.lastName} onChange={(e) => handleChange(e, 'personalDetails')}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="email" name="email" placeholder="Email*" required={true}
                                    value={formData.personalDetails?.contact?.email} onChange={(e) => handleChange(e, 'personalDetails', 'contact')}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="tel" name="phone" placeholder="Phone*" required={true}
                                    value={formData.personalDetails?.contact?.phone} onChange={(e) => handleChange(e, 'personalDetails', 'contact')}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="date" name="dob"
                                    value={formData.personalDetails?.dob ? formData.personalDetails?.dob.split('T')[0] : ''} onChange={(e) => handleChange(e, 'personalDetails')}
                                    className="border p-2 rounded"
                                />
                                <select
                                    name="gender"
                                    value={formData.personalDetails?.gender} onChange={(e) => handleChange(e, 'personalDetails')}
                                    className="border p-2 rounded"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                            </div>
                            <div className="mt-4">
                                <h4 className="block text-sm font-medium text-gray-700 mb-2">Residence Details</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                    <input
                                        type="text" name="street" placeholder="Street"
                                        value={formData.personalDetails?.address?.street} onChange={(e) => handleChange(e, 'personalDetails', 'address')}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="text" name="city" placeholder="City"
                                        value={formData.personalDetails?.address?.city} onChange={(e) => handleChange(e, 'personalDetails', 'address')}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="text" name="state" placeholder="State"
                                        value={formData.personalDetails?.address?.state} onChange={(e) => handleChange(e, 'personalDetails', 'address')}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        value={formData.personalDetails?.address?.country}
                                        onChange={(e) => handleChange(e, 'personalDetails', 'address')}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="text" name="pincode" placeholder="PINCODE"
                                        value={formData.personalDetails?.address?.pincode} onChange={(e) => handleChange(e, 'personalDetails', 'address')}
                                        className="border p-2 rounded"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="block text-sm font-medium text-gray-700 mb-2">Nominee Details</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <input
                                        type="text" name="name" placeholder="Nominee Name"
                                        value={formData.personalDetails?.nominee?.name} onChange={(e) => handleChange(e, 'personalDetails', 'nominee')}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="tel" name="phone" placeholder="Nominee Phone"
                                        value={formData.personalDetails?.nominee?.phone} onChange={(e) => handleChange(e, 'personalDetails', 'nominee')}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="date" name="dob" placeholder="Nominee DOB"
                                        value={formData.personalDetails?.nominee?.dob} onChange={(e) => handleChange(e, 'personalDetails', 'nominee')}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="text" name="relationship" placeholder="Relationship"
                                        value={formData.personalDetails?.nominee?.relationship} onChange={(e) => handleChange(e, 'personalDetails', 'nominee')}
                                        className="border p-2 rounded"
                                    />
                                </div>
                            </div>
                        </section>
                    } {(activeStep === 1) &&
                        <section className="mb-4">
                            <h3 className="block text-sm font-medium text-gray-700 mb-2">Financial Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className='flex gap-2 items-center'>
                                    <input
                                        type="text" name="panCardNo" placeholder="PAN Card Number"
                                        value={formData.financialDetails?.panCardNo} onChange={(e) => handleChange(e, 'financialDetails')}
                                        className="w-full border p-2 rounded"
                                    />
                                    {formData.financialDetails?.panCardURL ?
                                        <>
                                            <Link
                                                to={`/uploads/${formData.financialDetails?.panCardURL}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className='w-60 flex gap-2 justify-center items-center py-1 px-2 cursor-pointer rounded-md text-white bg-gray-900'
                                            >
                                                PAN Card
                                                <OpenInNew className='!size-4' />
                                            </Link>
                                            <button
                                                type='button'
                                                onClick={removeUploadFilePanCard}
                                                className='w-72 py-1 px-2 flex gap-2 justify-center items-center rounded-md text-white bg-red-600'
                                            >
                                                Remove file
                                                <Delete className='!size-4' />
                                            </button>
                                        </>
                                        :
                                        <div>
                                            <input
                                                type="file" name="panCard" id="panCardFileUpload"
                                                multiple={false} accept=".pdf, image/*" onChange={handleFileUpload}
                                                className="border p-2 rounded opacity-0 absolute -z-10"
                                            />
                                            <div
                                                onClick={handleFileUploadPanCard}
                                                className='w-80 h-8 flex gap-2 justify-center items-center py-1 px-2 cursor-pointer rounded-md text-white bg-gray-900'
                                            >
                                                <span className='overflow-hidden whitespace-nowrap text-ellipsis'>
                                                    {files.panCard ? files.panCard?.name : 'Upload PAN Card'}
                                                </span>
                                                <Upload className='!size-4' />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className='flex gap-2 items-center justify-between'>
                                    <input
                                        type="text" name="aadhaarNo" placeholder="Aadhaar Number"
                                        value={formData.financialDetails?.aadhaarNo} onChange={(e) => handleChange(e, 'financialDetails')}
                                        className="w-full border p-2 rounded"
                                    />
                                    {formData.financialDetails?.aadhaarURL ?
                                        <>
                                            <Link
                                                to={`/uploads/${formData.financialDetails?.aadhaarURL}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className='w-28 flex gap-2 justify-center items-center py-1 px-2 cursor-pointer rounded-md text-white bg-gray-900'
                                            >
                                                Aadhaar
                                                <OpenInNew className='!size-4' />
                                            </Link>
                                            <button
                                                type='button'
                                                onClick={removeUploadFileAadhaar}
                                                className='w-72 py-1 px-2 flex gap-2 justify-center items-center rounded-md text-white bg-red-600'
                                            >
                                                Remove file
                                                <Delete className='!size-4' />
                                            </button>
                                        </>
                                        :
                                        <div>
                                            <input
                                                type="file" name="aadhaar" id="aadhaarFileUpload"
                                                multiple={false} accept=".pdf, image/*" onChange={handleFileUpload}
                                                className="border p-2 rounded opacity-0 absolute -z-10"
                                            />
                                            <div
                                                onClick={handleFileUploadAadhaar}
                                                className='w-80 h-8 flex gap-2 justify-center items-center py-1 px-2 cursor-pointer rounded-md text-white bg-gray-900'
                                            >
                                                <span className='overflow-hidden whitespace-nowrap text-ellipsis'>
                                                    {files.aadhaar ? files.aadhaar?.name : 'Upload Aadhaar'}
                                                </span>
                                                <Upload className='!size-4' />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="block text-sm font-medium text-gray-700 mb-2">Account Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <input
                                        type="text" name="accountNo" placeholder="Account Number"
                                        value={formData.financialDetails?.accountDetails?.accountNo} onChange={(e) => handleChange(e, 'financialDetails', 'accountDetails')}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="text" name="ifscCode" placeholder="IFSC Code"
                                        value={formData.financialDetails?.accountDetails?.ifscCode} onChange={(e) => handleChange(e, 'financialDetails', 'accountDetails')}
                                        className="border p-2 rounded"
                                    />
                                    <input
                                        type="text" name="bankName" placeholder="Bank Name"
                                        value={formData.financialDetails?.accountDetails?.bankName} onChange={(e) => handleChange(e, 'financialDetails', 'accountDetails')}
                                        className="border p-2 rounded"
                                    />
                                </div>
                            </div>
                        </section>
                    } {(activeStep === 2) &&
                        <section className="mb-4">
                            <h3 className="block text-sm font-medium text-gray-700 mb-2">Employment Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <input
                                    type="text" name="companyName" placeholder="Company Name"
                                    value={formData.employmentDetails?.companyName} onChange={(e) => handleChange(e, 'employmentDetails')}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text" name="designation" placeholder="Designation"
                                    value={formData.employmentDetails?.designation} onChange={(e) => handleChange(e, 'employmentDetails')}
                                    className="border p-2 rounded"
                                />
                                <input
                                    type="text" name="annualIncome" placeholder="Annual Income"
                                    value={formData.employmentDetails?.annualIncome} onChange={(e) => handleChange(e, 'employmentDetails')}
                                    className="border p-2 rounded"
                                />
                            </div>
                        </section>
                    }
                    <div className='w-full h-12 mt-6'>
                        {(activeStep === 1 || activeStep === 2) &&
                            <div className='float-left'>
                                <Button variant="outlined" size="large" onClick={handleBack}>Back</Button>
                            </div>
                        } {(activeStep === 0 || activeStep === 1) &&
                            <div className='float-right'>
                                <Button variant="contained" color="primary" size="large" onClick={handleNext}>Next</Button>
                            </div>
                        } {(activeStep === 2) &&
                            <div className='float-right'>
                                <Button variant="contained" color="primary" size="large" type='submit'>{label}</Button>
                            </div>
                        }
                    </div>
                    <div className='relative'>
                        {error && <span className='absolute bottom-0 text-sm text-red-600'>{error}</span>}
                    </div>
                </form>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        </div>
    );
};

export default UpdateProfileForm;