import React from 'react';
import { X } from 'lucide-react';

const policyDetails = {
  'Health Insurance': {
    description: 'Comprehensive health coverage for individuals and families',
    coverage: ['Hospital expenses', 'Medications', 'Preventive care'],
    minAmount: '₹500,000',
    maxAmount: '₹5,000,000'
  },
  'Life Insurance': {
    description: 'Financial protection for your loved ones',
    coverage: ['Death benefit', 'Terminal illness', 'Accidental death'],
    minAmount: '₹1,000,000',
    maxAmount: '₹10,000,000'
  },
  'Vehicle Insurance': {
    description: 'Protection for your vehicles against damage and accidents',
    coverage: ['Third-party liability', 'Own damage', 'Personal accident'],
    minAmount: '₹100,000',
    maxAmount: '₹1,000,000'
  },
  'Property Insurance': {
    description: 'Coverage for commercial and residential properties',
    coverage: ['Natural disasters', 'Fire', 'Theft'],
    minAmount: '₹2,000,000',
    maxAmount: '₹20,000,000'
  },
  'Business Insurance': {
    description: 'Comprehensive coverage for business operations',
    coverage: ['Property damage', 'Liability', 'Business interruption'],
    minAmount: '₹5,000,000',
    maxAmount: '₹50,000,000'
  },
  'Travel Insurance': {
    description: 'Protection during domestic and international travel',
    coverage: ['Medical emergencies', 'Trip cancellation', 'Lost baggage'],
    minAmount: '₹50,000',
    maxAmount: '₹500,000'
  }
};

function PolicyModal({ policy, onClose }) {
  const details = policyDetails[policy.name] || {
    description: 'Policy details not available',
    coverage: [],
    minAmount: 'N/A',
    maxAmount: 'N/A'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{policy.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Offered by: {policy.company}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-600">{details.description}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Coverage</h3>
            <ul className="list-disc list-inside text-gray-600">
              {details.coverage.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Min Coverage</h3>
              <p className="text-gray-600">{details.minAmount}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Max Coverage</h3>
              <p className="text-gray-600">{details.maxAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicyModal;