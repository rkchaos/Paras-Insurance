import { useEffect, useState } from 'react';
import { Button, Divider, TextField, Tooltip } from '@mui/material';
// importing api end-points
import { assignClientPolicy, fetchAllGeneralInsurances, fetchAllSips, fetchAllUnassignedPolicies, fetchCompanyPoliciesByType, sendCompanyPolicies, uploadClientPolicyMedia } from '../../api';
// importing components
import DashboardTable from './dashboard/DashboardTable';
import PolicyModal from './dashboard/PoliciesModal';
import { Close, OpenInNew, Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [unassignedPolicies, setUnassignedPolicies] = useState([]);
    const getAllUnassignedPolicies = async () => {
        try {
            const { data } = await fetchAllUnassignedPolicies();
            setUnassignedPolicies(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const [sips, setSips] = useState([]);
    const getAllSips = async () => {
        try {
            const { data } = await fetchAllSips();
            setSips(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    const [isSipSelected, setIsSipSelected] = useState(false);
    const [selectedSip, setSelectedSip] = useState({})
    const selectSip = (sip) => {
        setIsSipSelected(true);
        setSelectedSip(sip)
    }
    const closeSip = () => {
        setIsSipSelected(false);
        setSelectedSip({})
    }
    const [gis, setGis] = useState([]);
    const getAllGis = async () => {
        try {
            const { data } = await fetchAllGeneralInsurances();
            setGis(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
    const [isGiSelected, setIsGiSelected] = useState(false);
    const [selectedGi, setSelectedGi] = useState({})
    const selectGi = (gi) => {
        setIsGiSelected(true);
        setSelectedGi(gi)
    }
    const closeGi = () => {
        setIsGiSelected(false);
        setSelectedGi({})
    }
    useEffect(() => {
        getAllUnassignedPolicies();
        getAllSips();
        getAllGis();
    }, []);

    const [currentAssignedPolicyId, setCurrentAssignedPolicyId] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companyPolicies, setCompanyPolicies] = useState([]);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSend = async () => {
        try {
            await sendCompanyPolicies({ clientPolicyId: currentAssignedPolicyId, companyPolicies });
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendCompanyPolicies = async (policy) => {
        try {
            setCurrentAssignedPolicyId(policy._id);
            const { data } = await fetchCompanyPoliciesByType(policy.clientId, policy.policyDetails.policyType);
            setCompanyPolicies(data);
            handleOpenModal();
        } catch (error) {
            console.log(error);
        }
    }
    const [expiryDate, setExpiryDate] = useState('');
    const handleExpiryDateChange = (event) => {
        setExpiryDate(event.target.value);
    }
    const [policyCertificate, setPolicyCertificate] = useState('');
    const handlePolicyCertificateUpload = (event) => {
        const file = event.target.files[0];
        setPolicyCertificate(prevFiles => {
            return { ...prevFiles, 'policyCertificate': file }
        });
    }
    const [assignPolicyID, setAssignPolicyID] = useState(null);
    const [isAssignPolicyModalOpen, setIsAssignPolicyModalOpen] = useState(false);
    const openAssignPolicyModal = async (clientPolicyId) => {
        setAssignPolicyID(clientPolicyId)
        setIsAssignPolicyModalOpen(true);
    }
    const closeAssignPolicyModal = async (clientPolicyId) => {
        setIsAssignPolicyModalOpen(false);
        setAssignPolicyID(null)
        setPolicyCertificate('');
        setExpiryDate('');
    }
    const handleSubmit = async () => {
        event.preventDefault();
        try {
            const { status, data } = await assignClientPolicy({ assignPolicyID, expiryDate });
            if (status === 200) {
                const { data } = await uploadClientPolicyMedia({ ...policyCertificate, assignPolicyID })
                getAllUnassignedPolicies();
                closeAssignPolicyModal();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Unassigned Policies ({unassignedPolicies?.length})</h1>
                <Tooltip title='Refresh Data'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jxhgzthg.json"
                        trigger="click" stroke="bold" state="loop-cycle"
                        colors="primary:#111827,secondary:#111827"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                        onClick={getAllUnassignedPolicies}
                    />
                </Tooltip>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <DashboardTable
                        unassignedPolicies={unassignedPolicies}
                        onSendCompanyPolicies={handleSendCompanyPolicies}
                        onAssignPolicy={openAssignPolicyModal}
                        reload={getAllUnassignedPolicies}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mt-12 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">SIPs ({sips?.length})</h1>
                <Tooltip title='Refresh Data'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jxhgzthg.json"
                        trigger="click" stroke="bold" state="loop-cycle"
                        colors="primary:#111827,secondary:#111827"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                        onClick={getAllSips}
                    />
                </Tooltip>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sips.map((client) => (
                                    <tr key={client._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.personalDetails.firstName} {client.personalDetails.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.personalDetails.contact.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.personalDetails.contact.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.personalDetails.address.city}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.stage}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Visibility onClick={() =>selectSip(client)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-12 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">General Insurance ({gis?.length})</h1>
                <Tooltip title='Refresh Data'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jxhgzthg.json"
                        trigger="click" stroke="bold" state="loop-cycle"
                        colors="primary:#111827,secondary:#111827"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                        onClick={getAllGis}
                    />
                </Tooltip>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {gis.map((client) => (
                                    <tr key={client._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.personalDetails.firstName} {client.personalDetails.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.personalDetails.contact.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.personalDetails.contact.phone}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.personalDetails.address.city}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {client.stage}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Visibility onClick={() =>selectSip(client)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <PolicyModal
                companyPolicies={companyPolicies}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSend={handleSend}
            />
            {isAssignPolicyModalOpen
                &&
                <div className='fixed inset-0 bg-black/10 !z-[1000] flex justify-center items-center' onClick={closeAssignPolicyModal}>
                    <div onClick={(event) => event.stopPropagation()} className='bg-white max-w-[75vw] max-h-[75vh] rounded-lg'>
                        <div className='px-6 py-4 flex gap-16 justify-between items-center'>
                            <h3 className='text-xl font-semibold'>Enter Policy Assigenment Details</h3>
                            <Close onClick={closeAssignPolicyModal} className='cursor-pointer' />
                        </div>
                        <Divider />

                        <form onSubmit={handleSubmit} className='px-6 py-4'>
                            <p className='font-semibold mb-1'>Policy Expiry Date</p>
                            <TextField
                                type='date' name='expiryDate' required
                                value={expiryDate} onChange={handleExpiryDateChange}
                                className='w-full'
                            />
                            <br /><br />
                            <input required type='file' name='policyCertificateURL' accept='image/*,.pdf' onChange={handlePolicyCertificateUpload} />
                            <br /><br />
                            <div className='flex justify-end'>
                                <Button
                                    type='submit'
                                    className='!flex !items-center !gap-2 !bg-gray-900 !text-white'
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {isSipSelected &&
                <div className='fixed inset-0 bg-black/10 !z-[1000] flex justify-center items-center' onClick={closeSip}>
                    <div onClick={(event) => event.stopPropagation()} className='bg-white max-w-[75vw] max-h-[75vh] rounded-lg'>
                        <div className='px-6 py-4 flex justify-between items-center'>
                            <h2 className='text-2xl font-bold mb-2'>SIP Details</h2>
                            <Close onClick={closeSip} className='cursor-pointer' />
                        </div>
                        <Divider />
                        <div className="grid grid-cols-4 gap-8 mx-6 mt-3 mb-4">
                            <div className='col-span-1'>
                                <h3 className="text-lg font-semibold">Personal Details</h3>
                                <p>Name: {selectedSip?.personalDetails?.firstName} {selectedSip?.personalDetails?.lastName}</p>
                                <p>Gender: {selectedSip?.personalDetails?.gender}</p>
                                <p>DOB: {new Date(selectedSip?.personalDetails?.dob).toLocaleDateString()}</p>
                            </div>
                            <div className='col-span-2'>
                                <h3 className="text-lg font-semibold">Financial Details</h3>
                                <p>PAN Card No: {selectedSip?.financialDetails.panCardNo}</p>
                                <p>PAN Card URL: {selectedSip?.financialDetails.panCardURL}</p>
                                <div className='flex justify-between'>
                                    {selectedSip?.financialDetails?.panCardURL &&
                                        <div className='flex w-72'>
                                            <Link
                                                to={`/uploads/${selectedSip?.financialDetails?.panCardURL}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className='w-full py-1 px-2 rounded-md text-white bg-gray-900 hover:opacity-95'
                                            > <div className='text-xs flex gap-2 items-center justify-center'>
                                                    Uploaded PAN Card
                                                    <OpenInNew className='!size-3' />
                                                </div>
                                            </Link>
                                        </div>}
                                </div>
                                <div className='flex justify-between'>
                                    <p>Aadhaar:{selectedSip?.financialDetails.aadhaar}</p>
                                    {selectedSip?.financialDetails?.aadhaarURL &&
                                        <div className='flex w-72'>
                                            <Link
                                                to={`/uploads/${selectedSip?.financialDetails?.aadhaarURL}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className='w-full py-1 px-2 rounded-md text-white bg-gray-900 hover:opacity-95'
                                            > <div className='text-xs flex gap-2 items-center justify-center'>
                                                    Uploaded Aadhaar
                                                    <OpenInNew className='!size-3' />
                                                </div>
                                            </Link>
                                        </div>
                                    }
                                </div>
                                <p>Designation: {selectedSip?.employmentDetails.designation || 'N/A'}</p>
                                <p>Annual Income: ₹{selectedSip?.employmentDetails.annualIncome}</p>
                            </div>
                            <div className='col-span-1'>
                                <h3 className="text-lg font-semibold">Employment Details</h3>
                                <p>Company: {selectedSip?.employmentDetails.companyName}</p>
                                <p>Designation: {selectedSip?.employmentDetails.designation || 'N/A'}</p>
                                <p>Annual Income: ₹{selectedSip?.employmentDetails.annualIncome}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;