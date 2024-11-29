import React from 'react';

function TextField({ label, id, placeholder, required, type = 'text' }) {
    return (
        <div className='form-field'>
            <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
            <input
                type={type} id={id} placeholder={placeholder} required={required}
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
        </div>
    );
}

export default TextField;