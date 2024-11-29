import React from 'react';

function CheckboxField({ label, id, required, children }) {
    // js for required
    return (
        <div className="form-field">
            <fieldset>
                <legend className="text-sm font-medium text-gray-700 mb-1">{label}</legend>
                <div className="space-y-2">
                    {children.map((option, index) => (
                        <div key={`${id}-${index}`} className="flex items-center">
                            <input
                                type="checkbox" id={`${id}-${index}`} name={option.name} value={option.label}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label htmlFor={`${id}-${index}`} className="ml-3 block text-sm font-medium text-gray-700">{option.label}</label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}

export default CheckboxField;