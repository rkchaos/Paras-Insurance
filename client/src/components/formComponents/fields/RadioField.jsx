import React from 'react';

function RadioField({ label, id, required, children }) {
    return (
        <div className="form-field">
            <fieldset>
                <legend className="text-sm font-medium text-gray-700 mb-1">{label}</legend>
                <div className="space-y-2">
                    {children.length <= 2 ?
                        <div className='flex gap-8 sm:gap-16 lg:gap-32'>
                            {children.map((option, index) => (
                                <div key={`${id}-${index}`} className="flex items-center">
                                    <input
                                        type="radio" id={`${id}-${index}`} name={option.name} value={option.label} required={required}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor={`${id}-${index}`} className="ml-3 block text-sm font-medium text-gray-700">{option.label}</label>
                                </div>
                            ))}
                        </div>
                        :
                        children.map((option, index) => (
                            <div key={`${id}-${index}`} className="flex items-center">
                                <input
                                    type="radio" id={`${id}-${index}`} name={option.name} value={option.label} required={required}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label htmlFor={`${id}-${index}`} className="ml-3 block text-sm font-medium text-gray-700">{option.label}</label>
                            </div>
                        ))
                    }

                    {
                    }
                </div>
            </fieldset>
        </div>
    );
}

export default RadioField;