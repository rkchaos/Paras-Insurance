import { useContext, useEffect, useState } from 'react';
import { tailChase } from 'ldrs';
import { useNavigate, useParams } from 'react-router-dom';
import { Timeline, TimelineDot, TimelineItem, TimelineConnector, TimelineContent, TimelineOppositeContent, timelineOppositeContentClasses, TimelineSeparator } from '@mui/lab';
// importing api end-points
import { fetchAllClientData, logout } from '../api';
// importing contexts
import { ClientContext } from '../contexts/Client.context';
// importing components
import { Badge } from '../components/subcomponents/Badge';
import { ScrollArea } from '../components/subcomponents/ScrollArea';
import { ClientDetailsCard } from '../components/subcomponents/ClientDetailsCard';

const ClientProfile = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const { setIsLoggedIn, setCondenseClientInfo } = useContext(ClientContext);
    const [isLoadingClientData, setIsLoadingClientData] = useState(true);
    const [clientData, setClientData] = useState(true);

    const [isPolicySelected, setIsPolicySelected] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState({});
    const selectPolicy = (policyData) => {
        setIsPolicySelected(true);
        setSelectedPolicy(policyData);
    }

    const getClientData = async () => {
        try {
            const { data } = await fetchAllClientData({ clientId: id });
            setClientData(data);
            setIsLoadingClientData(false);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getClientData();
    }, [id]);

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false);
            setCondenseClientInfo(null);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    const repeatedFields = (n, field) => {
        // need to add default values in policies
        const elements = [];
        for (let index = 0; index < n; index++) {
            elements.push(
                ...Object.entries(field.children).map(([key, childField]) => {
                    if (selectedPolicy.data[`${index + 1}${childField.name}`] == null || selectedPolicy.data[`${index + 1}${childField.name}`] == '' || selectedPolicy.data[`${index + 1}${childField.name}`] == 'Self') {
                        return null;
                    } else {
                        return (
                            <p className='ml-4' key={`${index}-${key}`}>
                                <strong>{childField.label}</strong>: {selectedPolicy.data[`${index + 1}${childField.name}`]}
                            </p>
                        );
                    }
                })
            );
        }
        return elements;
    };

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
                <div className='py-4 sm:px-16 bg-gray-200'>
                    <h1 className='text-3xl text-center font-bold mb-6'>Client Dashboard</h1>
                    <div className='grid gap-6 md:grid-cols-2'>
                        <ClientDetailsCard>
                            <div className='h-full flex flex-col justify-between items-start'>
                                <div className='p-6'>
                                    <h2 className='text-2xl font-bold mb-4'>Profile</h2>
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
                                            {clientData?.personalDetails?.address?.PINCODE && <p className='ml-8'><strong>PINCODE:</strong> {clientData?.personalDetails?.address?.PINCODE}</p>}
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
                                            <p className='ml-4'><strong>PAN Card:</strong> {clientData?.financialDetails?.panCard}</p>
                                            <p className='ml-4'><strong>Aadhaar Number:</strong> {clientData?.financialDetails?.aadhaarNo}</p>
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
                                <button
                                    onClick={handleLogout}
                                    className='m-6 py-1 px-2 bg-red-600 text-white rounded-md hover:opacity-95'
                                >Logout</button>
                            </div>
                        </ClientDetailsCard>

                        <ClientDetailsCard>
                            <div className='p-6'>
                                <h2 className='text-2xl font-bold mb-2'>Policies Interested In</h2>
                                {Object.keys(clientData.assignedPolicies[0]).length === 0
                                    ?
                                    <>
                                        <p className='text-sm text-gray-500 mb-4'>Total policies: 0</p>
                                        <div className='bg-gray-100 px-4 py-2 rounded-md'>
                                            No issued policies
                                        </div>
                                    </>
                                    :
                                    <>
                                        <p className='text-sm text-gray-500 mb-4'>Total policies: {clientData.assignedPolicies.length}</p>
                                        <ScrollArea className='h-[300px]'>
                                            {clientData.assignedPolicies.slice().reverse().map((policy) => (
                                                <ClientDetailsCard key={policy?._id} className='mb-4'>
                                                    <div className='pt-4 pb-12 px-4'>
                                                        <h3 className='text-sm font-semibold'>{policy?.policyDetails?.policyName}</h3>
                                                        <p className='text-xs text-gray-500 mb-2'>Issued On: {new Date(policy.createdAt).toLocaleDateString()}</p>
                                                        <button
                                                            onClick={() => selectPolicy({ data: policy?.data, format: policy?.policyDetails })}
                                                            className='float-right mr-4 bg-gray-900 text-white py-1 px-2 rounded-sm hover:opacity-95'
                                                        >Details</button>
                                                    </div>
                                                </ClientDetailsCard>
                                            ))}
                                        </ScrollArea>
                                    </>
                                }
                            </div>
                        </ClientDetailsCard>
                    </div>
                    {isPolicySelected &&
                        <ClientDetailsCard className='mt-4'>
                            <div className='p-6'>
                                <h2 className='text-2xl font-bold mb-2'>Policy Details</h2>
                                <h2 className='text-xl font-semibold mb-2'>Applicant Information</h2>
                                <p className='ml-4'><strong>First Name</strong>: {selectedPolicy.data['firstName']}</p>
                                <p className='ml-4'><strong>Last Name</strong>: {selectedPolicy.data['lastName']}</p>
                                <p className='ml-4'><strong>Email</strong>: {selectedPolicy.data['email']}</p>
                                <p className='ml-4'><strong>Phone</strong>: {selectedPolicy.data['phone']}</p>
                                {Object.entries(selectedPolicy.format.form.sections).map(([key, section]) => (
                                    Object.entries(section.fields).map(([key, field]) => (
                                        field.type === 'repeat' ?
                                            <>
                                                <h2 className='text-xl font-semibold my-2'>Dependents Information</h2>
                                                {repeatedFields(field.maxCount, field)}
                                            </>
                                            :
                                            <p className='ml-4' key={key}>
                                                <strong>{field.label}</strong>: {selectedPolicy.data[field.name]}
                                            </p>
                                    ))
                                ))}
                            </div>
                        </ClientDetailsCard>
                    }
                    <div className='mt-4 grid gap-6 md:grid-cols-2'>
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

                        <ClientDetailsCard>
                            <div className='p-6'>
                                <h2 className='text-2xl font-bold mb-2'>Renew Policy</h2>
                                <p className='mb-2'>
                                    To renew any lapsed policy, contact our customer support:
                                </p>
                                <ul>
                                    <li className='ml-2'>• <strong>Phone</strong>: +91 9876543210</li>
                                    <li className='ml-2'>• <strong>Email</strong>: support@parasinsurance.com</li>
                                </ul>
                                <p className='mt-2'>
                                    Our team will guide you through the process of renewing your policy and provide you with the necessary information and requirements.
                                </p>
                            </div>
                        </ClientDetailsCard>
                    </div>
                </div>
            }
        </div>
    );
}

export default ClientProfile;