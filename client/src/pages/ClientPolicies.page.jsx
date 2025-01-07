import { useContext, useEffect, useState } from 'react';
import * as XLSX from "xlsx";
import { tailChase } from 'ldrs';
import { useNavigate, useParams } from 'react-router-dom';
import { Timeline, TimelineDot, TimelineItem, TimelineConnector, TimelineContent, TimelineOppositeContent, timelineOppositeContentClasses, TimelineSeparator } from '@mui/lab';
// importing api end-points
import { fetchPoliciesData } from '../api';
// importing contexts
import { ClientContext } from '../contexts/Client.context';
// importing components
import { Badge } from '../components/subcomponents/Badge';
import { ScrollArea } from '../components/subcomponents/ScrollArea';
import Spreadsheet from 'react-spreadsheet';
import { Close, Download, Info } from '@mui/icons-material';
import { Button, Divider, Tab, Tabs } from '@mui/material';
import Footer from '../components/Footer';

const ClientProfile = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const { condenseClientInfo } = useContext(ClientContext);
    const [isLoadingClientPolicies, setIsLoadingClientPolicies] = useState(true);
    const [isUnauthorisedAction, setIsUnauthorisedAction] = useState(false);
    const [isClientPoliciesFound, setIsClientPoliciesFound] = useState(true);
    const [clientPolicies, setClientPolicies] = useState(true);
    const [clientName, setClientName] = useState('');

    const getClientPolicies = async () => {
        try {
            const { data } = await fetchPoliciesData({ clientId: id });
            const { clientPolicies, clientFirstName, clientLastName } = data;
            setClientPolicies(clientPolicies);
            if (clientLastName) {
                setClientName(`${clientFirstName} ${clientLastName}`);
            } else {
                setClientName(`${clientFirstName}`);
            }
            setIsLoadingClientPolicies(false);
        } catch (error) {
            const { status } = error;
            const errorMessage = error?.response?.data?.message;
            if (status === 400 && errorMessage === 'Unauthorised action.') {
                setIsLoadingClientPolicies(false);
                setIsUnauthorisedAction(true);
            } else if (status === 404 && errorMessage === 'No client found.') {
                setIsLoadingClientPolicies(false);
                setIsClientPoliciesFound(false);
            } else {
                console.error(error);
            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getClientPolicies();
    }, [id]);

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabIndexChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const [isCompanyPolicySelected, setIsCompanyPolicySelected] = useState(false);
    const [selectedCompanyPolicies, setSelectedCompanyPolicies] = useState([]);
    const selectCompanyPolicies = (availablePolicies) => {
        setIsCompanyPolicySelected(true);
        setSelectedCompanyPolicies(availablePolicies);
    }

    const [isPolicySelected, setIsPolicySelected] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState({});
    const selectPolicy = (policyData) => {
        setIsPolicySelected(true);
        setSelectedPolicy(policyData);
    }

    const handleDownloadExcel = () => {
        const worksheetData = selectedCompanyPolicies.map((row) =>
            Array.isArray(row) ? row.map((cell) => (cell.value ? cell.value : cell)) : row
        );

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, "Quotation.xlsx");
    };

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
            {isLoadingClientPolicies ?
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
                    !isClientPoliciesFound ?
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
                        <div className='pt-8 pb-16 sm:px-16 bg-white'>
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-[#111827]"></div>
                                <div
                                    className="absolute inset-0 bg-white"
                                    style={{ clipPath: 'polygon(0 65%, 100% 35%, 100% 100%, 0% 100%)' }}
                                />
                            </div>
                            <h1 className='text-3xl text-left font-semibold mb-6 relative text-white '>
                                {id !== condenseClientInfo._id && (
                                    condenseClientInfo.role?.toLowerCase() === 'superadmin' ||
                                    condenseClientInfo.role?.toLowerCase() === 'admin'
                                ) ? `${clientName}'s Policies` : 'My Policies'}
                            </h1>
                            <div className='pb-4 rounded-xl relative bg-white/95 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                <Tabs value={tabIndex} onChange={handleTabIndexChange}>
                                    <Tab label='Policies Interested In' className='!px-8 !py-4' />
                                    <Tab label='Policies Assigned' className='!px-8 !py-4' />
                                </Tabs>
                                <Divider />
                                <div className='px-8 py-2'>
                                    {(tabIndex === 0) &&
                                        <>
                                            <p className='text-md text-gray-500 mb-2'>Total policies: {clientPolicies.filter(policy => policy.stage === 'Interested').length}</p>
                                            {clientPolicies.filter(policy => policy.stage === 'Interested').length === 0
                                                ?
                                                <div className='bg-white mb-4 px-6 py-3 rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                                    No issued policies
                                                </div>
                                                :
                                                <ScrollArea className='max-h-[100vh]'>
                                                    {clientPolicies.slice().reverse().map((policy) => (
                                                        policy.stage === 'Interested' &&
                                                        <div key={policy?._id} className='bg-white rounded-xl mb-4 px-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                                            <div className='pt-3 pb-12 px-2'>
                                                                <h3 className='text-md font-semibold'>{policy?.policyDetails?.policyName}</h3>
                                                                <p className='text-sm text-gray-500 mb-2'>Issued On: {toFormattedDate(policy.createdAt)}</p>
                                                                {policy.availablePolicies?.length > 0 &&
                                                                    <button
                                                                        onClick={() => selectCompanyPolicies(policy?.availablePolicies)}
                                                                        className='float-right mr-4 bg-gray-900 text-white py-1 px-2 rounded-sm hover:opacity-95'
                                                                    >Quotations</button>
                                                                }
                                                                <Button
                                                                    onClick={() => selectPolicy({ data: policy?.data, format: policy?.policyDetails })}
                                                                    className='!flex !gap-2 !items-center !justify-center float-right mr-4 !text-white !bg-gray-900 py-1 px-2 rounded-sm hover:opacity-95'
                                                                >
                                                                    Details
                                                                    <Info className='!size-4' />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </ScrollArea>
                                            }
                                        </>
                                    } {(tabIndex === 1) &&
                                        <>
                                            <p className='text-md text-gray-500 mb-2'>Total policies: {clientPolicies.filter(policy => policy.stage === 'Assigned').length}</p>
                                            {clientPolicies.filter(policy => policy.stage === 'Assigned').length === 0
                                                ?
                                                <div className='bg-white mb-4 px-6 py-3 rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                                    No policies assigned
                                                </div>
                                                :
                                                <ScrollArea className='max-h-[100vh]'>
                                                    {clientPolicies.slice().reverse().map((policy) => (
                                                        policy.stage === 'Assigned' &&
                                                        <div key={policy?._id} className='mb-4'>
                                                            <div className='pt-3 pb-12 px-2'>
                                                                <h3 className='text-md font-semibold'>{policy?.policyDetails?.policyName}</h3>
                                                                <p className='text-sm text-gray-500 mb-2'>Issued On: {toFormattedDate(policy.createdAt)}</p>
                                                                {policy.availablePolicies?.length > 0 &&
                                                                    <button
                                                                        onClick={() => selectCompanyPolicies(policy?.availablePolicies)}
                                                                        className='float-right mr-4 bg-gray-900 text-white py-1 px-2 rounded-sm hover:opacity-95'
                                                                    >Quotations</button>
                                                                }
                                                                <Button
                                                                    onClick={() => selectPolicy({ data: policy?.data, format: policy?.policyDetails })}
                                                                    className='!flex !gap-2 !items-center !justify-center float-right mr-4 !text-white !bg-gray-900 py-1 px-2 rounded-sm hover:opacity-95'
                                                                >
                                                                    Details
                                                                    <Info className='!size-4' />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </ScrollArea>
                                            }
                                        </>
                                    }
                                </div>
                            </div>

                            <div className='relative bg-white/95 mt-4 p-6 rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                <h1 className='text-3xl text-left font-semibold'>
                                    Renew Policy
                                </h1>
                                <p className='mb-2'>
                                    To renew any lapsed policy, contact our customer support:
                                </p>
                                <ul>
                                    <li className='ml-2'>• <strong>Phone</strong>: +91 9876543210</li>
                                    <li className='ml-2'>• <strong>Email</strong>: support@paarasinsurance.com</li>
                                </ul>
                                <p className='mt-2'>
                                    Our team will guide you through the process of renewing your policy and provide you with the necessary information and requirements.
                                </p>
                            </div>

                            {isPolicySelected &&
                                <div className='fixed inset-0 bg-gray-100/25 flex justify-center items-center' onClick={() => setIsPolicySelected(false)}>
                                    <div
                                        onClick={(event) => event.stopPropagation()}
                                        className='bg-white w-[65vw] px-6 pb-6 rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
                                    >
                                        <div className='flex items-center justify-between'>
                                            <h1 className='text-3xl text-left font-semibold my-4'>
                                                Renew Policy
                                            </h1>
                                            <Close onClick={() => setIsPolicySelected(false)} className='cursor-pointer' />
                                        </div>
                                        <Divider />
                                        <h2 className='text-xl font-semibold mb-2'>Applicant Information</h2>
                                        <p className='ml-4'><strong>First Name</strong>: {selectedPolicy.data['firstName']}</p>
                                        <p className='ml-4'><strong>Last Name</strong>: {selectedPolicy.data['lastName']}</p>
                                        <p className='ml-4'><strong>Email</strong>: {selectedPolicy.data['email']}</p>
                                        <p className='ml-4'><strong>Phone</strong>: {selectedPolicy.data['phone']}</p>
                                        {Object.entries(selectedPolicy.format.policyForm.sections).map(([key, section]) => (
                                            Object.entries(section.fields).map(([key, field], index) => (
                                                field.type === 'repeat' ?
                                                    <>
                                                        <h2 className='text-xl font-semibold my-2'>Dependents Information</h2>
                                                        {repeatedFields(field.maxCount, field)}
                                                    </>
                                                    :
                                                    <p className='ml-4' key={index}>
                                                        <strong>{field.label}</strong>: {selectedPolicy.data[field.name]}
                                                    </p>
                                            ))
                                        ))}
                                    </div>

                                    {isCompanyPolicySelected &&
                                        <div className='mt-4'>
                                            <div className='p-6'>
                                                <h2 className='text-2xl font-bold mb-2'>Quotation(s)</h2>
                                                <button
                                                    type='button'
                                                    onClick={handleDownloadExcel}
                                                    className='mb-4 flex items-center gap-2 border-2 border-gray-900 float-right rounded-md py-0.5 px-2'
                                                >Download Excel <Download size={18} />
                                                </button>
                                                <br />
                                                <ScrollArea className='max-h-[300px] w-full'>
                                                    <div>
                                                        <Spreadsheet data={selectedCompanyPolicies} />
                                                    </div>
                                                </ScrollArea>
                                                {/* 
                                        {selectedCompanyPolicies.map((companyPolicy, index) => {
                                            return (
                                                <div className='bg-gray-100 mb-2 p-2 rounded-lg'>
                                                <p className='ml-4'><strong>Company Name</strong>: {companyPolicy.companyName}</p>
                                                <p className='ml-4'><strong>Policy Name</strong>: {companyPolicy.policyName}</p>
                                                <p className='ml-4'><strong>Policy Type</strong>: {companyPolicy.policyType}</p>
                                                <p className='ml-4'><strong>Policy Description</strong>: {companyPolicy.policyDescription}</p>
                                                <p className='ml-4'><strong>Policy Features</strong>: {companyPolicy.policyFeature}</p>
                                                <p className='ml-4'><strong>Coverage Amount</strong>: {companyPolicy.companyName}</p>
                                                <p className='ml-4'><strong>Coverage Type</strong>: {companyPolicy.coverageType}</p>
                                                <p className='ml-4'><strong>Premium Amount</strong>: {companyPolicy.premiumAmount}</p>
                                                <p className='ml-4'><strong>Premium Type</strong>: {companyPolicy.premiumType}</p>
                                                </div>
                                                )
                                            })} */}
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
            }

            <Footer />
        </div>
    );
}

export default ClientProfile;