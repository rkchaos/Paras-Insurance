import React from 'react';

export function Badge({ label, status }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'good':
                return 'bg-green-100 text-green-800';
            case 'bad':
                return 'bg-red-100 text-red-800';
            case 'neutral':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {label}
        </span>
    );
}