import { useEffect, useState } from 'react';
import Papa from "papaparse";
import { Upload, Download } from '@mui/icons-material';
import { fetchAllCustomers } from '../../api';
import CustomerTable from './customers/CustomerTable';
import CustomerStats from './customers/CustomerStats';

const CustomerManagement = () => {
    const [countError, setCountError] = useState(0);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setCountError(0); // Reset error count
        if (file) {
            console.log('File uploaded:', file.name);

            // Parse CSV file using PapaParse
            Papa.parse(file, {
                complete: (result) => {
                    const csvData = result.data;
                    let errorCount = 0; // Local error count for the current file

                    // Validation and mapping
                    const validData = csvData.map((row) => {
                        const { firstName, lastName, email, phone, userType, age, gender } = row;

                        // Basic validation for missing or incorrect fields
                        if (!phone || !email || !firstName || !lastName || !userType || !age || !gender) {
                            errorCount += 1; // Increment error count for invalid rows
                            return null; // Skip invalid row
                        }

                        // Map the CSV fields to the customer structure
                        const newCustomer = {
                            userType: userType || 'Lead',  // Default userType if missing
                            personalDetails: {
                                firstName: firstName || '',
                                lastName: lastName || '',
                                contact: {
                                    email: email || '',
                                    phone: phone || ''
                                }
                            },
                            KYC: false,  // Assuming new customers don't have KYC completed
                            leadDetails: {
                                notes: []  // Initialize empty notes
                            },
                            interactionHistory: [],  // Initialize empty interaction history
                            notes: [],  // Initialize empty notes
                            policies: [],  // Initialize empty policies
                            createdAt: new Date().toISOString(),  // Assign current date as createdAt
                            updatedAt: new Date().toISOString(),  // Assign current date as updatedAt
                            __v: 0  // MongoDB version field, assuming no versioning needed
                        };

                        return newCustomer;
                    }).filter(Boolean); // Remove null values from invalid rows

                    // Append valid rows to the existing customers list
                    setCustomers((prevCustomers) => {
                        // Use phone as the unique identifier for deduplication
                        const existingPhones = new Set(prevCustomers.map((customer) => customer.personalDetails.contact.phone));
                        const newCustomers = validData.filter((customer) => !existingPhones.has(customer.personalDetails.contact.phone));
                        return [...prevCustomers, ...newCustomers];
                    });

                    // Show the alert after the file is processed
                    if (errorCount > 0) {
                        alert(`Missing required field for ${errorCount} row(s)`);
                    }
                },
                header: true, // Assuming the first row is the header
                skipEmptyLines: true, // Skip any empty lines in the CSV
            });
        }
    };

    const downloadSampleCSV = () => {
        const sampleData = `firstName,lastName,email,phone,userType,age,gender
            John,Doe,john@example.com,+1234567890,Lead,22,Male
            Jane,Smith,jane@example.com,+1234567891,Client,56,Female`;

        const blob = new Blob([sampleData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample_customers.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const [customers, setCustomers] = useState([]);

    const getAllCustomers = async () => {
        try {
            const { data } = await fetchAllCustomers();
            setCustomers(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllCustomers();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
                <div className="flex gap-3">
                    <label className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 cursor-pointer">
                        <Upload size={20} />
                        Upload CSV
                        <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                    <button
                        onClick={downloadSampleCSV}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        <Download size={20} />
                        Sample CSV
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <CustomerStats customers={customers} />
                    <div className="mt-6">
                        <CustomerTable customers={customers} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerManagement;