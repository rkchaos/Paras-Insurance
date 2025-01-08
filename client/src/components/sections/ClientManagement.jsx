import { useEffect, useState } from 'react';
import { Upload, Download } from '@mui/icons-material';
import Papa from "papaparse";
// importing api end-points
import { countAllAssignedPolicies, fetchAllClients } from '../../api';
// importing components
import ClientTable from './clients/ClientTable';
import ClientStats from './clients/ClientStats';

const ClientManagement = () => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    const csvData = result.data;
                    let errorCount = 0;
                    const validData = csvData.map((row) => {
                        const { firstName, lastName, email, phone, userType, age, gender } = row;
                        if (!phone || !email || !firstName || !lastName || !userType || !age || !gender) {
                            errorCount += 1;
                            return null;
                        }
                        const newClient = {
                            userType: userType || 'Lead',
                            personalDetails: {
                                firstName: firstName || '',
                                lastName: lastName || '',
                                contact: {
                                    email: email || '',
                                    phone: phone || ''
                                }
                            },
                            KYC: false,
                            leadDetails: {
                                notes: []
                            },
                            interactionHistory: [],
                            notes: [],
                            policies: [],
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            __v: 0
                        };

                        return newClient;
                    }).filter(Boolean);
                    setClients((prevClients) => {
                        const existingPhones = new Set(prevClients.map((client) => client.personalDetails.contact.phone));
                        const newClients = validData.filter((client) => !existingPhones.has(client.personalDetails.contact.phone));
                        return [...prevClients, ...newClients];
                    });

                    if (errorCount > 0) {
                        alert(`Missing required field for ${errorCount} row(s)`);
                    }
                },
                header: true,
                skipEmptyLines: true,
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
    
    const [assignedPoliciesCount, setAssignedPoliciesCount] = useState([]);
    const getCountAllAssignedPolicies = async () => {
        try {
            const { data } = await countAllAssignedPolicies();
            setAssignedPoliciesCount(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllClients();
        getCountAllAssignedPolicies();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Client Management ({clients?.length})</h1>
                <div className="flex gap-3">
                    <label className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 cursor-pointer">
                        <Upload />
                        Upload CSV
                        <input
                            type="file" accept=".csv"
                            onChange={handleFileUpload}
                            className="hidden"
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
                    <ClientStats clients={clients} assignedPoliciesCount={assignedPoliciesCount} />
                    <div className="mt-6">
                        <ClientTable clients={clients} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientManagement;