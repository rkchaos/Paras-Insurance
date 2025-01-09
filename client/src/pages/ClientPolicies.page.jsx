import { useContext, useEffect, useState } from 'react';
import { tailChase } from 'ldrs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, Divider, Tab, Tabs } from '@mui/material';
import { Assignment, AssignmentTurnedIn, Close, Event, Info, List, OpenInNew, Person } from '@mui/icons-material';
// importing api end-points
import { fetchAllSipsData, fetchPoliciesData } from '../api';
// importing contexts
import { ClientContext } from '../contexts/Client.context';
// importing components
import { ScrollArea } from '../components/subcomponents/ScrollArea';
import Footer from '../components/Footer';
// importing helper functions
import { toFormattedDate } from '../utils/helperFunctions';
import PolicyDetailModal from '../components/subcomponents/PolicyDetailModal';
import * as XLSX from "xlsx";
import Spreadsheet from 'react-spreadsheet';
import { Download } from '@mui/icons-material';

const ClientProfile = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const { condenseClientInfo } = useContext(ClientContext);
    const [isLoadingClientPolicies, setIsLoadingClientPolicies] = useState(true);
    const [isUnauthorisedAction, setIsUnauthorisedAction] = useState(false);
    const [isClientPoliciesFound, setIsClientPoliciesFound] = useState(true);
    const [clientPolicies, setClientPolicies] = useState([]);
    const [clientSips, setClientSips] = useState([]);
    const [clientName, setClientName] = useState('');

    const getClientPoliciesAndSips = async () => {
        try {
            const { status, data } = await fetchPoliciesData({ clientId: id });
            const { clientPolicies, clientFirstName, clientLastName } = data;
            setClientPolicies(clientPolicies);
            if (clientLastName) {
                setClientName(`${clientFirstName} ${clientLastName}`);
            } else {
                setClientName(`${clientFirstName}`);
            }
            if (status === 200) {
                const { data } = await fetchAllSipsData({ clientId: id });
                setClientSips(data);

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
        getClientPoliciesAndSips();
    }, [id]);

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabIndexChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const [isPolicySelected, setIsPolicySelected] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState({});
    const selectPolicy = (policyData) => {
        setIsPolicySelected(true);
        setSelectedPolicy(policyData);
    }

    const handleDownload = (policyCertificateURL) => {
        const fileUrl = `${import.meta.env.VITE_BACKEND_URL}uploads/${policyCertificateURL}`;
        window.open(fileUrl, "_blank");
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

    const [isCompanyPolicySelected, setIsCompanyPolicySelected] = useState(false);
    const [selectedCompanyPolicies, setSelectedCompanyPolicies] = useState([]);
    function transformData(inputArray) {
        if (inputArray[0].length === 0) {
            inputArray.shift();
        }
        let transformedArray = [];

        let headerRow = inputArray[0].map(item => ({
            value: item || "",
            readOnly: true
        }));
        transformedArray.push(headerRow);

        inputArray.slice(1).forEach(row => {
            let transformedRow = row.map(item => ({
                value: item || "",
                readOnly: true
            }));
            transformedArray.push(transformedRow);
        });

        return transformedArray;
    }
    const selectCompanyPolicies = (quotation) => {
        setSelectedCompanyPolicies(transformData(quotation));
        setIsCompanyPolicySelected(true);
    }
    const closeCompanyPolicies = () => {
        setSelectedCompanyPolicies([]);
        setIsCompanyPolicySelected(false);
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
                                <Tabs value={tabIndex} onChange={handleTabIndexChange} TabIndicatorProps={{ style: { background: "#111827" } }}>
                                    <Tab label='Policies Interested In' className='!px-8 !py-4 !text-gray-900' />
                                    <Tab label='Policies Assigned' className='!px-8 !py-4 !text-gray-900' />
                                    <Tab label='SIP(s)' className='!px-8 !py-4 !text-gray-900' />
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
                                                <ScrollArea className='max-h-[75vh]'>
                                                    {clientPolicies.slice().reverse().map((policy) => (
                                                        policy.stage === 'Interested' &&
                                                        <div key={policy?._id} className='bg-white rounded-xl mb-4 px-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                                            <div className='pt-3 pb-12 px-2'>
                                                                <h3 className='text-xl font-semibold'>{policy?.policyDetails?.policyName}</h3>
                                                                <div className='flex gap-1.5 items-center mt-1 mb-0.5'>
                                                                    <Person />
                                                                    <span className='text-gray-500'><strong>Applied By:</strong> {policy?.data?.email}</span>
                                                                </div>
                                                                <div className='flex gap-1.5 items-center mt-1 mb-0.5'>
                                                                    <Event />
                                                                    <span className='text-gray-500'><strong> Applied On:</strong> {toFormattedDate(policy.createdAt)}</span>
                                                                </div>
                                                                <Button
                                                                    onClick={() => selectPolicy({ data: policy?.data, format: policy?.policyDetails, stage: policy?.stage })}
                                                                    className='!flex !gap-2 !items-center !justify-center float-right !text-white !bg-gray-900 py-1 px-2 rounded-sm hover:opacity-95'
                                                                >
                                                                    Details
                                                                    <Info className='!size-4' />
                                                                </Button>
                                                                {policy.quotation?.length > 0 &&
                                                                    <Button
                                                                        onClick={() => selectCompanyPolicies(policy?.quotation)}
                                                                        className='!flex !gap-2 !items-center !justify-center float-right !mr-4 !text-white !bg-gray-900 py-1 px-2 rounded-sm hover:opacity-95'
                                                                    >
                                                                        Quotations
                                                                        <List className='!size-4' />
                                                                    </Button>
                                                                }
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
                                                <ScrollArea className='max-h-[75vh]'>
                                                    {clientPolicies.slice().reverse().map((policy) => (
                                                        policy.stage === 'Assigned' &&
                                                        <div key={policy?._id} className='bg-white rounded-xl mb-4 px-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                                            <div className='pt-3 pb-12 px-2'>
                                                                <h3 className='text-xl font-semibold'>{policy?.policyDetails?.policyName}</h3>
                                                                <div className='flex gap-1.5 items-center mt-1 mb-0.5'>
                                                                    <Person />
                                                                    <span className='text-gray-500'><strong>Applied By:</strong> {policy?.data?.email}</span>
                                                                </div>
                                                                <div className='flex gap-1.5 items-center mt-1 mb-0.5'>
                                                                    <Event />
                                                                    <span className='text-gray-500'><strong>Applied On:</strong> {toFormattedDate(policy.createdAt)}</span>
                                                                </div>
                                                                <div className='flex gap-1.5 items-center mt-1 mb-0.5'>
                                                                    <AssignmentTurnedIn />
                                                                    <span className='text-gray-500'><strong>Expiry Date:</strong> {policy?.expiryDate}</span>
                                                                </div>
                                                                <a href={policy?.policyCertificateURL}>Download this</a>
                                                                <Button
                                                                    onClick={() => selectPolicy({ data: policy?.data, format: policy?.policyDetails, stage: policy?.stage })}
                                                                    className='!ml-2 !flex !gap-2 !items-center !justify-center float-right mr-4 !text-white !bg-gray-900 py-1 px-2 rounded-sm hover:opacity-95'
                                                                >
                                                                    Details
                                                                    <Info className='!size-4' />
                                                                </Button>
                                                                <Button
                                                                    onClick={() => handleDownload(policy?.policyCertificateURL)}
                                                                    className='!flex !gap-2 !items-center !justify-center float-right mr-4 !text-white !bg-gray-900 py-1 px-2 rounded-sm hover:opacity-95'
                                                                >
                                                                    Policy Certificate
                                                                    <Assignment className='!size-4' />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </ScrollArea>
                                            }
                                        </>
                                    } {(tabIndex === 2) &&
                                        <>
                                            <p className='text-md text-gray-500 mb-2'>Total SIPs: {clientSips.length}</p>
                                            {clientSips.length === 0
                                                ?
                                                <div className='bg-white mb-4 px-6 py-3 rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                                    No Sips found
                                                </div>
                                                :
                                                <ScrollArea className='max-h-[75vh]'>
                                                    {clientSips.slice().reverse().map((sip, index) => (
                                                        <div key={index} className='bg-white rounded-xl pb-6 mb-4 px-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                                            <p className='font-semibold text-xl pt-3 pb-2'>{sip?.personalDetails?.firstName} {sip.personalDetails?.lastName}</p>
                                                            <div className="space-y-2">
                                                                <p className="text-sm text-gray-600">
                                                                    Email: {sip?.personalDetails?.contact?.email}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    Phone: {sip?.personalDetails?.contact?.phone}
                                                                </p>
                                                            </div>
                                                            <div className='flex justify-end'>
                                                                <Button
                                                                    onClick={() => selectSip(sip)}
                                                                    className='!flex !gap-2 !items-center !justify-center !text-white !bg-gray-900 py-1 px-2 rounded-sm hover:opacity-95'
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
                                <PolicyDetailModal
                                    selectedPolicy={selectedPolicy}
                                    closeModal={() => setIsPolicySelected(false)}
                                />
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
                            {isCompanyPolicySelected &&
                                <div className='fixed inset-0 bg-black/10 !z-[1000] flex justify-center items-center' onClick={closeCompanyPolicies}>
                                    <div onClick={(event) => event.stopPropagation()} className='bg-white max-w-[75vw] max-h-[75vh] rounded-lg'>
                                        <div className='px-6 py-4 flex justify-between items-center'>
                                            <h2 className='text-2xl font-bold mb-2'>Quotation(s)</h2>
                                            <Close onClick={closeCompanyPolicies} className='cursor-pointer' />
                                        </div>
                                        <Divider />
                                        <div className='mx-6 mt-3 mb-4'>
                                            <Button
                                                type='button'
                                                onClick={handleDownloadExcel}
                                                className='!flex !items-center !gap-2 !bg-gray-900 !text-white float-right'
                                            >
                                                Download Excel
                                                <Download className='!size-4' />
                                            </Button>
                                            <br />
                                            <ScrollArea className='w-full mt-6'>
                                                <div>
                                                    <Spreadsheet data={selectedCompanyPolicies} />
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
            }
            <Footer />
        </div>
    );
}

export default ClientProfile;