import { useMemo, useState } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import { DoneAllOutlined, OpenInNew, PostAddOutlined, SearchOutlined, Upload, Visibility } from '@mui/icons-material';
import Spreadsheet from "react-spreadsheet";
import * as XLSX from 'xlsx';
// importing api end-points
import { addAvailableCompanyPolicies } from '../../../api';
// importing components
import { ScrollArea } from '../../subcomponents/ScrollArea';
import PolicyDetailModal from '../../subcomponents/PolicyDetailModal';
// importing helper functions
import { toFormattedDate } from '../../../utils/helperFunctions';

const DashboardTable = ({ unassignedPolicies, onSendCompanyPolicies, onAssignPolicy, reload }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };
    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleUploadExcel = () => {
        document.getElementById(`excelUpload`)?.click();
    }

    const [excelData, setData] = useState([]);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
            const formattedData = sheetData.map((row) =>
                row.map((cell) => ({
                    value: cell || '',
                    readOnly: true
                }))
            );

            setData(formattedData);
        };
        reader.readAsBinaryString(file);
        document.getElementById(`excelUploadFileName`).textContent = file.name
    }

    const [excelModal, setExcelModal] = useState(false);
    const [policyIdForExcel, setPolicyIdForExcel] = useState('');
    const handleExcelModalOpen = (policyId) => {
        setPolicyIdForExcel(policyId);
        setExcelModal(true);
    }
    const handleExcelModalClose = () => {
        setExcelModal(false);
        setData([]);
    }
    const handleSendExcel = async () => {
        try {
            const { data, status } = await addAvailableCompanyPolicies({ policyIdForExcel, excelData });
            if (status === 200) {
                handleExcelModalClose();
                reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const filteredUnassignedPolicies = useMemo(() => {
        return unassignedPolicies.filter(unassignedPolicy => {
            const searchMatch =
                unassignedPolicy.clientDetails.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unassignedPolicy.clientDetails.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unassignedPolicy.clientDetails.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unassignedPolicy.clientDetails.phone.includes(searchTerm);

            let policyMatch = true;
            return searchMatch && policyMatch;
        });
    }, [searchTerm, unassignedPolicies]);

    const totalPages = Math.ceil(filteredUnassignedPolicies.length / itemsPerPage);
    const indexOfLastClient = currentPage * itemsPerPage;
    const indexOfFirstClient = indexOfLastClient - itemsPerPage;
    const currentUnassignedPolicies = filteredUnassignedPolicies.slice(indexOfFirstClient, indexOfLastClient);

    const [isPolicySelected, setIsPolicySelected] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const handleSelectPolicy = (policyData) => {
        setSelectedPolicy(policyData);
        setIsPolicySelected(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="text" placeholder="Search by name, email, or phone..."
                        value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none ">
                        <SearchOutlined className="h-4 w-4" />
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 whitespace-nowrap">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Policy Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Policy Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Client Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Assigned On
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Details
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Resolve
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Assign
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentUnassignedPolicies.map((policy, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{policy?.format?.policyName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy?.format?.policyType}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a href={`/profile/${policy?.clientId}`} target='_blank' className="flex gap-1 !items-center text-sm text-gray-500 cursor-pointer hover:underline">
                                        {policy.clientDetails.firstName} {policy.clientDetails.lastName}
                                        <Tooltip title='View profile'>
                                            <OpenInNew className='!size-4' />
                                        </Tooltip>
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.clientDetails.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.clientDetails.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{toFormattedDate(policy.createdAt)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <button className="text-blue-600 hover:text-blue-900">
                                        <Tooltip title='View policy details'>
                                            <Visibility onClick={() => handleSelectPolicy(policy)} />
                                        </Tooltip>
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <div className='flex items-center justify-start'>
                                        <p id={`${policy._id}UploadedFile`}></p>
                                        <button className="flex relative text-green-600 hover:text-green-900">
                                            <Tooltip title='Enter quotation' >
                                                <PostAddOutlined onClick={() => handleExcelModalOpen(policy._id)} />
                                            </Tooltip>
                                            {policy.availablePolicies !== undefined && policy.availablePolicies?.length !== 0 &&
                                                <div className='absolute left-6'>
                                                    <Tooltip title='Policies Sent'>
                                                        {console.log(policy.availablePolicies)}
                                                        <DoneAllOutlined />
                                                    </Tooltip>
                                                </div>
                                            }
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <button className="text-green-600 hover:text-green-900">
                                        <Tooltip title='Policy assigned'>
                                            <Checkbox onChange={() => onAssignPolicy(policy._id)} checked={false} />
                                        </Tooltip>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-700">
                        Showing {indexOfFirstClient + 1} to {Math.min(indexOfLastClient, filteredUnassignedPolicies.length)} of {filteredUnassignedPolicies.length} results
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {excelModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                        <div className="relative top-10 mx-auto p-5 border w-full lg:w-[50vw] shadow-lg rounded-md bg-white">
                            <input id='excelUpload' type='file' multiple={false} accept='.xlsx,.xls,.csv' onChange={handleFileUpload} className='opacity-0 absolute pointer-events-none' />
                            <div className='bg-gray-100 rounded-md p-4'>
                                <div className="mt-3 flex flex-col gap-2 items-center cursor-pointer" onClick={handleUploadExcel}>
                                    <Upload />
                                    Upload Excel (.xlsx, .xls, .csv)
                                </div>
                            </div>
                            <p id='excelUploadFileName'></p>
                            <ScrollArea className='max-h-[50vh]'>
                                {excelData.length !== 0 && (
                                    <div>
                                        <h2>Imported Excel:</h2>
                                        <Spreadsheet data={excelData} setData={setData} />
                                        {/* <pre>{JSON.stringify(excelData, null, 2)}</pre> */}
                                    </div>
                                )}
                            </ScrollArea>
                            <div className='w-full flex justify-end mt-2'>
                                <button
                                    type='button'
                                    onClick={handleExcelModalClose}
                                    className='px-4 py-2 rounded-md text-gray-900 bg-white mr-2 border-2 border-gray-900 mt-2 hover:opacity-95'
                                >Cancel</button>
                                <button
                                    disabled={excelData.length === 0}
                                    onClick={handleSendExcel}
                                    className='px-4 py-2 rounded-md bg-gray-900 text-white mr-2 mt-2 hover:opacity-95'
                                >Send</button>
                            </div>
                        </div>
                    </div>
                )}
                {isPolicySelected &&
                    <PolicyDetailModal
                        selectedPolicy={selectedPolicy}
                        closeModal={() => setIsPolicySelected(false)}
                    />
                }
            </div>
        </div>
    );
};

export default DashboardTable;