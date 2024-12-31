import React from 'react';

function CustomerTabs({ activeTab, setActiveTab }) {
  const tabs = ['Customer List', 'Customer History', 'Profile Updates'];
  
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-4 px-4" aria-label="Tabs">
        {tabs.map((tab) => (
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
  );
}

export default CustomerTabs;