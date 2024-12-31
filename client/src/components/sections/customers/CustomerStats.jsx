import React from 'react';
import { Users, History, UserPlus } from 'lucide-react';

function CustomerStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600 font-medium">Total Customers</p>
            <p className="text-2xl font-bold text-blue-900">1,234</p>
          </div>
          <Users className="text-blue-600" size={24} />
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-600 font-medium">Active Policies</p>
            <p className="text-2xl font-bold text-green-900">892</p>
          </div>
          <History className="text-green-600" size={24} />
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-600 font-medium">New This Month</p>
            <p className="text-2xl font-bold text-purple-900">45</p>
          </div>
          <UserPlus className="text-purple-600" size={24} />
        </div>
      </div>
    </div>
  );
}

export default CustomerStats;