import { useState } from 'react';
import { Close, Download, OpenInNew, Upload } from '@mui/icons-material';
import { updateProfile, uploadProfileMedia } from '../api';
import { Link } from 'react-router-dom';


const UpdateProfileForm = ({ clientData, setClientData, closeUpdateProfile }) => {
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

    const [files, setFiles] = useState({
        panCard: '',
        aadhaar: ''
    });
    const handleFileUploadPanCard = () => {
        document.getElementById(`panCardFileUpload`)?.click();
    }
    const handleFileUploadAadhaar = () => {
        document.getElementById(`aadhaarFileUpload`)?.click();
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
        console.log(formData);
        console.log(files);
        setError('');
        try {
            const { status, data } = await updateProfile(formData);
            console.log(status);
            console.log(data);
            const updatedClientData = data;
            if (status === 200) {
                setClientData(updatedClientData);
                const { status, data } = await uploadProfileMedia({ ...files, clientId: clientData._id });
                console.log(data);
                setClientData(data);
                if (status === 200) {
                    closeUpdateProfile();
                }
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message;
            setError(errorMessage);
            console.log(error);
        }
        // Here you would typically send the data to your backend
    };

    return (
        <div onClick={closeUpdateProfile} className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center'>
            <div onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 bg-white rounded-t-lg border-b">
                    <h2 className="text-xl font-semibold">Update Details</h2>
                    <button onClick={closeUpdateProfile} className="text-gray-500 hover:text-gray-700">
                        <Close />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-4 bg-white shadow-md rounded-b-lg">
                    <section className="mb-4">
                        <h3 className="block text-sm font-medium text-gray-700 mb-2">Personal Details</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                                type="date" name="dob"
                                value={formData.personalDetails?.dob ? formData.personalDetails?.dob.split('T')[0] : ''} onChange={(e) => handleChange(e, 'personalDetails')}
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
                        <div className="mt-2">
                            <h4 className="block text-sm font-medium text-gray-700 mb-2">Address</h4>
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
                        <div className="mt-2">
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

                    <section className="mb-4">
                        <h3 className="block text-sm font-medium text-gray-700 mb-2">Financial Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className='flex gap-4 items-center justify-center'>
                                <input
                                    type="text" name="panCardNo" placeholder="PAN Card Number"
                                    value={formData.financialDetails?.panCardNo} onChange={(e) => handleChange(e, 'financialDetails')}
                                    className="border p-2 rounded"
                                />
                                {formData.financialDetails?.panCardURL ?
                                    <>
                                        <Link
                                            to={`/uploads/${formData.financialDetails?.panCardURL}`}
                                            target="_blank" rel="noopener noreferrer"
                                            className='flex gap-2 items-center py-1 px-2 cursor-pointer'
                                        ><p>PAN Card <OpenInNew /></p>
                                        </Link>
                                        <input
                                            type="file" name="panCard" id="panCardFileUpload"
                                            multiple={false} accept=".pdf, image/*" onChange={handleFileUpload}
                                            className="border p-2 rounded opacity-0 absolute -z-10"
                                        />
                                        <div>
                                            <div
                                                onClick={handleFileUploadPanCard}
                                                className='flex h-10 gap-2 items-center border-2 rounded-md py-0 px-2 cursor-pointer'
                                            >
                                                <span className='text-sm text-ellipsis'>
                                                    {files.panCard ? files.panCard?.name : 'Upload PAN Card'}
                                                </span>
                                                <Upload />
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <input
                                            type="file" name="panCard" id="panCardFileUpload"
                                            multiple={false} accept=".pdf, image/*" onChange={handleFileUpload}
                                            className="border p-2 rounded opacity-0 absolute -z-10"
                                        />
                                        <div>
                                            <div
                                                onClick={handleFileUploadPanCard}
                                                className='flex h-10 gap-2 items-center border-2 rounded-md py-0 px-2 cursor-pointer'
                                            >
                                                <span className='text-sm text-ellipsis'>
                                                    {files.panCard ? files.panCard?.name : 'Upload PAN Card'}
                                                </span>
                                                <Upload />
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className='flex gap-4 items-center justify-between'>
                                <input
                                    type="text" name="aadhaarNo" placeholder="Aadhaar Number"
                                    value={formData.financialDetails?.aadhaarNo} onChange={(e) => handleChange(e, 'financialDetails')}
                                    className="border p-2 rounded"
                                />
                                {formData.financialDetails?.aadhaarURL ?
                                    <>
                                        <Link
                                            to={`/uploads/${formData.financialDetails?.aadhaarURL}`}
                                            target="_blank" rel="noopener noreferrer"
                                            className='flex gap-2 items-center py-1 px-2 cursor-pointer'
                                        ><p>Aadhaar <OpenInNew /></p>
                                        </Link>
                                        <input
                                            type="file" name="aadhaar" id="aadhaarFileUpload"
                                            multiple={false} accept=".pdf, image/*" onChange={handleFileUpload}
                                            className="border p-2 rounded opacity-0 absolute -z-10"
                                        />
                                        <div
                                            onClick={handleFileUploadAadhaar}
                                            className='flex gap-2 items-center border-2 rounded-md py-1 px-2 cursor-pointer'
                                        >
                                            <span className='text-sm text-ellipsis'>
                                                {files.aadhaar ? files.aadhaar?.name : 'Upload Aadhaar'}
                                            </span>
                                            <Upload />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <input
                                            type="file" name="aadhaar" id="aadhaarFileUpload"
                                            multiple={false} accept=".pdf, image/*" onChange={handleFileUpload}
                                            className="border p-2 rounded opacity-0 absolute -z-10"
                                        />
                                        <div
                                            onClick={handleFileUploadAadhaar}
                                            className='flex gap-2 items-center border-2 rounded-md py-1 px-2 cursor-pointer'
                                        >
                                            <span className='text-sm text-ellipsis'>
                                                {files.aadhaar ? files.aadhaar?.name : 'Upload Aadhaar'}
                                            </span>
                                            <Upload />
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="mt-2">
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

                    <div className="mt-2 flex justify-end space-x-3">
                        <button
                            type="button" onClick={closeUpdateProfile}
                            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                        >Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >Update Details
                        </button>
                    </div>
                    <div className='relative'>
                        {error && <span className='absolute bottom-0 text-sm text-red-600'>{error}</span>}
                    </div>
                </form>
            </div></div>
    );
};

export default UpdateProfileForm;