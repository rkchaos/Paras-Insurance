import { useEffect, useState } from 'react';
import Papa from "papaparse";
import { Upload, Download } from '@mui/icons-material';
import { fetchAllClients } from '../../api';
import ClientTable from './clients/ClientTable';
import ClientStats from './clients/ClientStats';

const ClientManagement = () => {
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

                        // Map the CSV fields to the client structure
                        const newClient = {
                            userType: userType || 'Lead',  // Default userType if missing
                            personalDetails: {
                                firstName: firstName || '',
                                lastName: lastName || '',
                                contact: {
                                    email: email || '',
                                    phone: phone || ''
                                }
                            },
                            KYC: false,  // Assuming new clients don't have KYC completed
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

                        return newClient;
                    }).filter(Boolean); // Remove null values from invalid rows

                    // Append valid rows to the existing clients list
                    setClients((prevClients) => {
                        // Use phone as the unique identifier for deduplication
                        const existingPhones = new Set(prevClients.map((client) => client.personalDetails.contact.phone));
                        const newClients = validData.filter((client) => !existingPhones.has(client.personalDetails.contact.phone));
                        return [...prevClients, ...newClients];
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
        a.download = 'sample_clients.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const [clients, setClients] = useState([]);

    const getAllClients = async () => {
        try {
            const { data } = await fetchAllClients();
            setClients(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllClients();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Client Management</h1>
                <div className="flex gap-3">
                    <label className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 cursor-pointer">
                        <Upload />
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
                        <Download />
                        Sample CSV
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <ClientStats clients={clients} />
                    <div className="mt-6">
                        <ClientTable clients={clients} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientManagement;