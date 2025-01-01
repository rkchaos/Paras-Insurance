import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';

function PolicyManagement() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Policy Management</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} />
                    Create New Policy
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-4 px-4" aria-label="Tabs">
                        {['Policy Overview', 'Policy Updates', 'Policy Insights'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                                className={`px-3 py-4 text-sm font-medium border-b-2 ${activeTab === tab.toLowerCase().replace(' ', '-')
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-600 font-medium">Active Policies</p>
                                    <p className="text-2xl font-bold text-blue-900">567</p>
                                </div>
                                <FileText className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicyManagement;