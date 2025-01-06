import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import { Timeline, TimelineDot, TimelineItem, TimelineConnector, TimelineContent, TimelineOppositeContent, timelineOppositeContentClasses, TimelineSeparator } from '@mui/lab';
// import { Download } from '@mui/icons-material';
// import * as XLSX from 'xlsx';
// import Spreadsheet from 'react-spreadsheet';
import { tailChase } from 'ldrs';
// importing api end-points
import { deleteProfile, fetchProfileData } from '../api';
// importing contexts
import { ClientContext } from '../contexts/Client.context';
// importing components
import Footer from '../components/Footer';
import { Badge } from '../components/subcomponents/Badge';
import { ScrollArea } from '../components/subcomponents/ScrollArea';
import { ClientDetailsCard } from '../components/subcomponents/ClientDetailsCard';
import { IconButton } from '@mui/material';
import UpdateProfileForm from '../components/UpdateProfileForm';

const ClientProfile = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const { setIsLoggedIn, condenseClientInfo, setCondenseClientInfo } = useContext(ClientContext);
    const [isLoadingClientData, setIsLoadingClientData] = useState(true);
    const [isUnauthorisedAction, setIsUnauthorisedAction] = useState(false);
    const [isClientDataFound, setIsClientDataFound] = useState(true);
    const [clientData, setClientData] = useState(true);
    const [clientName, setClientName] = useState('');

    // const [isCompanyPolicySelected, setIsCompanyPolicySelected] = useState(false);
    // const [selectedCompanyPolicies, setSelectedCompanyPolicies] = useState([]);
    // const selectCompanyPolicies = (availablePolicies) => {
    //     setIsCompanyPolicySelected(true);
    //     console.log(selectedCompanyPolicies);
    //     setSelectedCompanyPolicies(availablePolicies);
    // }

    // const [policies, setPolicies] = useState([]);

    // const [isPolicySelected, setIsPolicySelected] = useState(false);
    // const [selectedPolicy, setSelectedPolicy] = useState({});
    // const selectPolicy = (policyData) => {
    //     setIsPolicySelected(true);
    //     setSelectedPolicy(policyData);
    // }

    const getClientData = async () => {
        try {
            const { data } = await fetchProfileData({ clientId: id });
            const { client, clientFirstName, clientLastName } = data;
            setClientData(client);
            if (clientLastName) {
                setClientName(`${clientFirstName} ${clientLastName}`);
            } else {
                setClientName(`${clientFirstName}`);
            }
            setIsLoadingClientData(false);
        } catch (error) {
            const { status } = error;
            const errorMessage = error?.response?.data?.message;
            if (status === 400 && errorMessage === 'Unauthorised action.') {
                setIsLoadingClientData(false);
                setIsUnauthorisedAction(true);
            } else if (status === 404 && errorMessage === 'No client found.') {
                setIsLoadingClientData(false);
                setIsClientDataFound(false);
            } else {
                console.error(error);
            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getClientData();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteProfile();
            setIsLoggedIn(false);
            setCondenseClientInfo(null);
            navigate('/');
        } catch (error) {
            console.error(error);
        }

    }
    const [updateProfile, setUpdateProfile] = useState(false);
    const openUpdateProfile = () => {
        setUpdateProfile(true);
    }
    const closeUpdateProfile = () => {
        setUpdateProfile(false);
    }
    const handleUpdate = async () => {

    }

    // const handleDownloadExcel = () => {
    //     const worksheetData = selectedCompanyPolicies.map((row) =>
    //         Array.isArray(row) ? row.map((cell) => (cell.value ? cell.value : cell)) : row
    //     );

    //     const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    //     XLSX.writeFile(workbook, 'Quotation.xlsx');
    // };

    // const repeatedFields = (n, field) => {
    //     const elements = [];
    //     for (let index = 0; index < n; index++) {
    //         elements.push(
    //             ...Object.entries(field.children).map(([key, childField]) => {
    //                 if (selectedPolicy.data[`${index + 1}${childField.name}`] == null || selectedPolicy.data[`${index + 1}${childField.name}`] == '' || selectedPolicy.data[`${index + 1}${childField.name}`] == 'Self') {
    //                     return null;
    //                 } else {
    //                     return (
    //                         <p className='ml-4' key={`${index}-${key}`}>
    //                             <strong>{childField.label}</strong>: {selectedPolicy.data[`${index + 1}${childField.name}`]}
    //                         </p>
    //                     );
    //                 }
    //             })
    //         );
    //     }
    //     return elements;
    // };

    const toFormattedDate = (timestamp) => {
        const formattedDate = new Date(Date.parse(timestamp))
        const date = formattedDate.getDate();
        const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthsArray[formattedDate.getMonth()];
        const year = formattedDate.getFullYear();

        return `${date} ${month}, ${year}`;
    }

    const toFormattedTime = (timestamp) => {
        const date = new Date(Date.parse(timestamp))

        const hours24 = date.getHours();
        const minutes = date.getMinutes();

        const period = hours24 >= 12 ? 'PM' : 'AM';
        const hours12 = hours24 % 12 || 12;

        return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    tailChase.register();

    return (
        <div>
            {isLoadingClientData ?
                <div className='min-h-screen flex justify-center items-center'>
                    <l-tail-chase size='40' speed='1.75' color='#111827' />
                </div>
                :
                isUnauthorisedAction ?
                    <div className="flex flex-col justify-center items-center my-16">
                        <lord-icon
                            src='https://cdn.lordicon.com/dicvhxpz.json'
                            trigger='morph'
                            stroke='bold' state='morph-cross'
                            colors='primary:#111827,secondary:#111827'
                            style={{ width: '250px', height: '250px' }}
                        />
                        <p className='text-3xl font-semibold text-gray-900'>Unauthorised action performed</p>
                    </div>
                    :
                    !isClientDataFound ?
                        <div className="flex flex-col justify-center items-center my-16">
                            <lord-icon
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover"
                                colors='primary:#111827,secondary:#111827'
                                style={{ width: '250px', height: '250px' }}
                            />
                            <p className='text-3xl font-semibold text-gray-900'>No client found</p>
                        </div>
                        :
                        <div className='py-4 sm:px-16 bg-gray-200'>
                            <h1 className='text-3xl text-center font-bold mb-6'>
                                {id !== condenseClientInfo._id && (
                                    condenseClientInfo.role?.toLowerCase() === 'superadmin' ||
                                    condenseClientInfo.role?.toLowerCase() === 'admin'
                                ) ? `${clientName}'s Profile` : 'My Profile'}
                            </h1>
                            <div className='grid gap-6 md:grid-cols-2'>
                                <ClientDetailsCard>
                                    <div className='h-full flex flex-col justify-between items-start'>
                                        <div className='p-6 w-full'>
                                            <div className='flex justify-between'>
                                                <h2 className='text-2xl font-bold'>Profile</h2>
                                                <IconButton onClick={openUpdateProfile}>
                                                    <Edit />
                                                </IconButton>
                                            </div>
                                            <p className='font-bold'>Personal Details</p>
                                            <p className='ml-4'><strong>Name:</strong> {clientData?.personalDetails?.firstName} {clientData?.personalDetails?.lastName}</p>
                                            <p className='ml-4'><strong>User Type:</strong> {clientData?.userType}</p>
                                            {clientData?.personalDetails?.dob && <p className='ml-4'><strong>DOB:</strong> {toFormattedDate(clientData?.personalDetails?.dob)}</p>}
                                            {clientData?.personalDetails?.gender && <p className='ml-4'><strong>Gender:</strong> {clientData?.personalDetails?.gender}</p>}
                                            <p className='ml-4'><strong>Email:</strong> {clientData?.personalDetails?.contact?.email} </p>
                                            <p className='ml-4'><strong>Phone:</strong> +91-{clientData?.personalDetails?.contact?.phone}</p>
                                            <p className='ml-4'><strong>KYC:</strong> {clientData?.KYC ? <Badge label='Uploaded' status='good' /> : <Badge label='NA' status='bad' />}</p>

                                            {clientData?.personalDetails?.address &&
                                                <div>
                                                    <p className='ml-4'><strong>Address:</strong></p>
                                                    {clientData?.personalDetails?.address?.street && <p className='ml-8'><strong>Street:</strong> {clientData?.personalDetails?.address?.street}</p>}
                                                    {clientData?.personalDetails?.address?.city && <p className='ml-8'><strong>City:</strong> {clientData?.personalDetails?.address?.city}</p>}
                                                    {clientData?.personalDetails?.address?.state && <p className='ml-8'><strong>State:</strong> {clientData?.personalDetails?.address?.state}</p>}
                                                    {clientData?.personalDetails?.address?.pincode && <p className='ml-8'><strong>pincode:</strong> {clientData?.personalDetails?.address?.pincode}</p>}
                                                    {clientData?.personalDetails?.address?.country && <p className='ml-8'><strong>Country:</strong> {clientData?.personalDetails?.address?.country}</p>}
                                                </div>
                                            }
                                            {clientData?.personalDetails?.nominee && (
                                                <div>
                                                    <p className='font-bold'>Nominee Details</p>
                                                    <p className='ml-4'><strong>Name:</strong> {clientData?.personalDetails?.nominee?.name}</p>
                                                    <p className='ml-4'><strong>DOB:</strong> {clientData?.personalDetails?.nominee?.dob}</p>
                                                    <p className='ml-4'><strong>Relationship:</strong> {clientData?.personalDetails?.nominee?.relationship}</p>
                                                    <p className='ml-4'><strong>Phone:</strong> {clientData?.personalDetails?.nominee?.phone}</p>
                                                </div>
                                            )}

                                            {clientData?.financialDetails && (
                                                <div>
                                                    <p className='font-bold'>Financial Details</p>
                                                    <p className='ml-4'><strong>PAN Card Number:</strong> {clientData?.financialDetails?.panCardNo}</p>
                                                    <Link to={`/uploads/${clientData?.financialDetails?.panCardURL}`} target="_blank" rel="noopener noreferrer">PAN Card</Link>
                                                    <p className='ml-4'><strong>Aadhaar Number:</strong> {clientData?.financialDetails?.aadhaarNo}</p>
                                                    <Link to={`/uploads/${clientData?.financialDetails?.aadhaarURL}`} target="_blank" rel="noopener noreferrer">Aadhar</Link>
                                                    {clientData?.financialDetails?.accountDetails && (
                                                        <div>
                                                            <p className='ml-4'><strong>Account Details:</strong></p>
                                                            <p className='ml-8'><strong>Account Number:</strong> {clientData?.financialDetails?.accountDetails?.accountNo}</p>
                                                            <p className='ml-8'><strong>IFSC Code:</strong> {clientData?.financialDetails?.accountDetails?.ifscCode}</p>
                                                            <p className='ml-8'><strong>Bank Name:</strong> {clientData?.financialDetails?.accountDetails?.bankName}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {clientData?.employmentDetails && (
                                                <div>
                                                    <p className='font-bold'>Employment Details</p>
                                                    <p className='ml-4'><strong>Company Name:</strong> {clientData?.employmentDetails?.companyName}</p>
                                                    <p className='ml-4'><strong>Designation:</strong> {clientData?.employmentDetails?.designation}</p>
                                                    <p className='ml-4'><strong>Annual Income:</strong> ₹{clientData?.employmentDetails?.annualIncome}</p>
                                                </div>
                                            )}

                                        </div>
                                        <div className='flex '>
                                            <button
                                                onClick={handleDelete}
                                                className='my-6 ml-4 py-1 px-2 bg-red-600 text-white rounded-md hover:opacity-95'
                                            >Delete Profile</button>
                                        </div>
                                    </div>
                                </ClientDetailsCard>

                                <ClientDetailsCard>
                                    <div className='p-6'>
                                        <h2 className='text-2xl font-bold mb-4'>Interaction History</h2>
                                        {clientData?.interactionHistory?.length === 0 &&
                                            <div className='bg-gray-100 px-4 py-2 rounded-md'>
                                                No prior interaction history
                                            </div>
                                        }
                                        <ScrollArea className='h-[300px]'>
                                            <Timeline sx={{ [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.2, }, }}>
                                                {clientData?.interactionHistory?.map(({ timestamp, type, description }, index) => (
                                                    <TimelineItem key={index} className='!p-0' sx={{ p: 0 }} >
                                                        <TimelineOppositeContent color='textSecondary'
                                                            className='!text-xs !flex !items-center !pl-0'
                                                        >
                                                            {toFormattedDate(timestamp)}
                                                            <br />
                                                            {toFormattedTime(timestamp)}
                                                        </TimelineOppositeContent>
                                                        <TimelineSeparator>
                                                            <TimelineDot />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <div className='bg-gray-100 px-4 py-2 rounded-md'>
                                                                <p><strong>Type:</strong>&nbsp;{type}</p>
                                                                <p><strong>Description:</strong>&nbsp;{description}</p>
                                                            </div>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                ))}
                                            </Timeline>
                                        </ScrollArea>
                                    </div>
                                </ClientDetailsCard>
                            </div>

                            <div className='mt-4 grid gap-6 md:grid-cols-2'>
                                <ClientDetailsCard>
                                    <div className='p-6'>
                                        <h2 className='text-2xl font-bold mb-2'>Renew Policy</h2>
                                        <p className='mb-2'>
                                            To renew any lapsed policy, contact our client support:
                                        </p>
                                        <ul>
                                            <li className='ml-2'>• <strong>Phone</strong>: +91 9876543210</li>
                                            <li className='ml-2'>• <strong>Email</strong>: support@paarasfinancials.com</li>
                                        </ul>
                                        <p className='mt-2'>
                                            Our team will guide you through the process of renewing your policy and provide you with the necessary information and requirements.
                                        </p>
                                    </div>
                                </ClientDetailsCard>
                            </div>
                        </div>
            }
            {updateProfile &&
                <UpdateProfileForm clientData={clientData} setClientData={setClientData} closeUpdateProfile={closeUpdateProfile} />
            }
            <Footer />
        </div>
    );
}

export default ClientProfile;