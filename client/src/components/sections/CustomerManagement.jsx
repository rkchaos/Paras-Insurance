import React, { useEffect, useState } from 'react';
import { Upload, FileDown } from 'lucide-react';
import CustomerTable from './customers/CustomerTable';
import CustomerStats from './customers/CustomerStats';
import { fetchAllCustomers } from '../../api';

const CustomerManagement = () => {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle CSV file upload
            console.log('File uploaded:', file.name);
        }
    };

    const downloadSampleCSV = () => {
        const sampleData = `First Name,Last Name,Email,Phone,Policy Number,Status
John,Doe,john@example.com,+1234567890,POL001,Active
Jane,Smith,jane@example.com,+1234567891,POL002,Active`;

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
                        <FileDown size={20} />
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