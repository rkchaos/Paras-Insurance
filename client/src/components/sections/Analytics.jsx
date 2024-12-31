import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

function Analytics() {
  const [activeTab, setActiveTab] = useState('customer-analytics');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics & Reporting</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-4" aria-label="Tabs">
            {['Customer Analytics', 'Sales Reports', 'Conversion Tracking'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                className={`px-3 py-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.toLowerCase().replace(' ', '-')
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
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-indigo-900">$1.2M</p>
                </div>
                <TrendingUp className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;