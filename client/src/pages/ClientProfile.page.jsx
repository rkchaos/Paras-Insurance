import { useContext, useEffect, useState } from 'react';
import { tailChase } from 'ldrs';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllClientData, logout } from '../api';
import { ClientDetailsCard } from '../components/subcomponents/ClientDetailsCard';
import { ScrollArea } from '../components/subcomponents/ScrollArea';
import { Badge } from '../components/subcomponents/Badge';
import { ClientContext } from '../contexts/Client.context';

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
                    if (selectedPolicy.data[`${index + 1}${childField.name}`] == null || selectedPolicy.data[`${index + 1}${childField.name}`] == "" || selectedPolicy.data[`${index + 1}${childField.name}`] == "Self") {
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

    tailChase.register();

    return (
        <div>
            {isLoadingClientData ?
                <div className='min-h-screen flex justify-center items-center'>
                    <l-tail-chase size='40' speed='1.75' color='#111827' />
                </div>
                :
                <div className='py-4 px-4 xl:px-16 bg-white'>
                    <div className="container mx-auto py-4 sm:px-16 bg-gray-50">
                        <h1 className="text-3xl text-center font-bold mb-6">Client Dashboard</h1>
                        <div className="grid gap-6 md:grid-cols-2">
                            <ClientDetailsCard>
                                <div className='h-full flex flex-col justify-between items-start'>
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-4">Profile</h2>
                                        <p><strong>Name:</strong> {clientData?.personalDetails?.firstName} {clientData?.personalDetails?.lastName}</p>
                                        <p><strong>Email:</strong> {clientData?.personalDetails?.contact?.email ? clientData?.personalDetails?.contact?.email : "NA"} </p>
                                        <p><strong>Phone:</strong> +91-{clientData?.personalDetails?.contact?.phone}</p>
                                        <p><strong>User Type:</strong> {clientData?.userType}</p>
                                        <p><strong>KYC:</strong> {clientData?.KYC ? <Badge label="Uploaded" status="good" /> : <Badge label="NA" status="bad" />}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className='m-6 py-1 px-2 bg-red-600 text-white rounded-md hover:opacity-95'
                                    >Logout</button>
                                </div>
                            </ClientDetailsCard>

                            <ClientDetailsCard>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-2">Policies</h2>
                                    {Object.keys(clientData.assignedPolicies[0]).length === 0
                                        ?
                                        <>
                                            <p className="text-sm text-gray-500 mb-4">Total policies: 0</p>
                                            <div className='bg-gray-100 px-4 py-2 rounded-md'>
                                                No issued policies
                                            </div>
                                        </>
                                        :
                                        <>
                                            <p className="text-sm text-gray-500 mb-4">Total policies: {clientData.assignedPolicies.length}</p>
                                            <ScrollArea className="h-[300px]">
                                                {clientData.assignedPolicies.map((policy) => (
                                                    <ClientDetailsCard key={policy?._id} className="mb-4">
                                                        <div className="pt-4 pb-12 px-4">
                                                            <h3 className="text-sm font-semibold">{policy?.policyDetails?.policy_name}</h3>
                                                            <p className="text-xs text-gray-500 mb-2">Issued On: {new Date(policy.createdAt).toLocaleDateString()}</p>
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
                                    <h2 className="text-2xl font-bold mb-2">Policy Details</h2>
                                    <h2 className="text-xl font-semibold mb-2">Applicant Information</h2>
                                    {Object.entries(selectedPolicy.format.form.sections).map(([key, section]) => (
                                        Object.entries(section.fields).map(([key, field]) => (
                                            field.type === "repeat" ?
                                                <>
                                                    <h2 className="text-xl font-semibold my-2">Dependents Information</h2>
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
                        <div className="mt-4 grid gap-6 md:grid-cols-2">
                            <ClientDetailsCard>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-4">Interaction History</h2>
                                    {clientData?.interactionHistory?.length === 0 &&
                                        <div className='bg-gray-100 px-4 py-2 rounded-md'>
                                            No prior interaction history
                                        </div>
                                    }
                                    <ScrollArea className="h-[300px]">
                                        {clientData?.interactionHistory?.map(({ date, type, description }, index) => (
                                            <div className='bg-gray-100 px-4 py-2 rounded-md'>
                                                <p><strong>Date:</strong> {date}</p>
                                                <p><strong>Type:</strong> {type} </p>
                                                <p><strong>Description:</strong>{description}</p>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </div>
                            </ClientDetailsCard>

                            <ClientDetailsCard>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-2">Renew Policy</h2>
                                    <p className="mb-2">
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
                </div>
            }
        </div>
    );
}

export default ClientProfile;