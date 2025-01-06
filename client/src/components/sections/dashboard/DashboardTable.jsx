import { useMemo, useState } from 'react';
import { Checkbox, Tooltip } from '@mui/material';
import { DoneAllOutlined, FilterAltOutlined, PostAddOutlined, SearchOutlined, Upload, Visibility } from '@mui/icons-material';
import Spreadsheet from "react-spreadsheet";
import * as XLSX from 'xlsx';
import { addAvailableCompanyPolicies } from '../../../api';
import { ScrollArea } from '../../subcomponents/ScrollArea';

const DashboardTable = ({ unassignedPolicies, onSendCompanyPolicies, onAssignPolicy, reload }) => {
    console.log(unassignedPolicies);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const itemsPerPage = 10;

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUploadExcel = () => {
        // console.log(document.getElementById(`${policyId}FileInput`));
        document.getElementById(`excelUpload`)?.click();
        handleClose();
    }

    const [excelData, setData] = useState([]);
    const handleFileUpload = (event) => {
        console.log('yay');

        const file = event.target.files[0];
        console.log(file);
        const reader = new FileReader();

        reader.onload = (event) => {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

            // Transform the sheetData into the desired structure
            const formattedData = sheetData.map((row) =>
                row.map((cell) => ({
                    value: cell || '', // Ensure empty cells are explicitly '<empty>'
                    readOnly: true
                }))
            );

            setData(formattedData); // Set the transformed excelData
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
        console.log(policyIdForExcel)
        // excelData
        console.log(excelData);
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
        return unassignedPolicies.filter(unclientPolicy => {
            const searchMatch =
                unclientPolicy.clientDetails.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unclientPolicy.clientDetails.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unclientPolicy.clientDetails.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                unclientPolicy.clientDetails.phone.includes(searchTerm);

            const genderMatch = filterGender === 'ALL' || unclientPolicy.clientDetails.gender?.toLowerCase() === filterGender.toLowerCase();

            let policyMatch = true;
            return searchMatch && genderMatch && policyMatch;
        });
    }, [searchTerm, filterGender, unassignedPolicies]);

    const totalPages = Math.ceil(filteredUnassignedPolicies.length / itemsPerPage);
    const indexOfLastClient = currentPage * itemsPerPage;
    const indexOfFirstClient = indexOfLastClient - itemsPerPage;
    const currentUnassignedPolicies = filteredUnassignedPolicies.slice(indexOfFirstClient, indexOfLastClient);

    const handleViewDetails = (policy) => {
        setSelectedPolicy(policy);
    };

    const closeModal = () => {
        setSelectedPolicy(null);
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

    return (
        <div className="space-y-4">
            <div className="flex justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="text" placeholder="Search by name, email, or phone..."
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none ">
                        <SearchOutlined className="h-4 w-4" />
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <select
                        value={filterGender} onChange={(e) => setFilterGender(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="ALL">All Genders</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                    <FilterAltOutlined className="h-4 w-4" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
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
                                Gender
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Details
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Resolve
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Assigned
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentUnassignedPolicies.map((policy, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{policy.policyDetails.policyName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.policyDetails.policyType}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.clientDetails.firstName} {policy.clientDetails.lastName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.clientDetails.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{policy.clientDetails.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${policy.clientDetails.gender?.toLowerCase() === 'male'
                                        ? 'bg-green-100 text-blue-800'
                                        : policy.clientDetails.gender?.toLowerCase() === 'female' ? 'bg-red-100 text-pink-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {policy.clientDetails.gender?.toLowerCase() === 'male' ? 'Male' : policy.clientDetails.gender?.toLowerCase() === 'female' ? 'Female' : '-'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <button className="text-blue-600 hover:text-blue-900">
                                        <Tooltip title='View policy details'>
                                            <Visibility onClick={() => handleViewDetails(policy)} />
                                        </Tooltip>
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {/* <button className="text-green-600 hover:text-green-900 !ml-4">
                                            <Tooltip title='Enter quotation'>
                                            <PostAddOutlined  onClick={() => onSendCompanyPolicies(policy)} />
                                            </Tooltip>
                                            </button> */}
                                    <div className='flex items-center justify-start'>
                                        {/* <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                                >
                                                Dashboard
                                                </Button> */}
                                        <p id={`${policy._id}UploadedFile`}></p>
                                        <button className="flex relative text-green-600 hover:text-green-900">
                                            <Tooltip title='Enter quotation' >
                                                <PostAddOutlined onClick={() => handleExcelModalOpen(policy._id)} />
                                            </Tooltip>
                                            {
                                                policy.availablePolicies !== undefined && policy.availablePolicies?.length !== 0 &&
                                                <div className='absolute left-6'>
                                                    <Tooltip title='Policies Sent'>
                                                        {console.log(policy.availablePolicies)}
                                                        <DoneAllOutlined />
                                                    </Tooltip>
                                                </div>
                                            }
                                        </button>
                                        {/* <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>Enter details</MenuItem>
                                            <MenuItem onClick={() => handleUploadExcel(policy._id)}>Upload Excel</MenuItem>
                                        </Menu>
                                        <input id={`${policy._id}FileInput`} type="file" accept='.xlsx,.xls,.csv' multiple={false} onChange={() => handleFileUpload(event, policy._id)} className='opacity-0 absolute left-0 pointer-events-none' /> */}
                                    </div>
                                    {/* <button className="text-green-600 hover:text-green-900">
                                            <Tooltip title='Send company policies to user'>
                                                <Send onClick={() => onSendCompanyPolicies(policy)} />
                                            </Tooltip>
                                        </button> */}
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

                {selectedPolicy && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-xl leading-6 font-bold text-gray-900">Policy Details</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p><strong>Policy Name:</strong> {selectedPolicy.policyDetails.policyName}</p>
                                    <p><strong>Policy Type:</strong> {selectedPolicy.policyDetails.policyType}</p>
                                    <h2 className='text-xl font-semibold my-2'>Applicant Information</h2>
                                    <p className='ml-4'><strong>Client Name</strong>: {selectedPolicy.clientDetails['firstName']} {selectedPolicy.clientDetails['lastName']}</p>
                                    <p className='ml-4'><strong>Email</strong>: {selectedPolicy.clientDetails['email']}</p>
                                    <p className='ml-4'><strong>Phone</strong>: {selectedPolicy.clientDetails['phone']}</p>
                                    {Object.entries(selectedPolicy.policyDetails.policyForm.sections).map(([key, section]) => (
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
                                <div className="items-center px-4 py-3">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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
            </div>
        </div>
    );
};

export default DashboardTable;