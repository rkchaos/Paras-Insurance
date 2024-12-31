const SelectField = ({ id, label, name, required, children, data, handleFormDataChange, repeat, repeatIndex }) => {
    return (
        <div className="form-field">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}{required && <span className="text-red-600">*</span>}
            </label>
            {repeat
                ?
                <select
                    id={id} required={required} name={`${repeatIndex}${name}`} onChange={handleFormDataChange} defaultValue="Select an option"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    {children.map((option, index) => (
                        <option key={`${id}-${index}-${repeatIndex}`} value={option.name} disabled={option.value === "" ? true : false}>
                            {option.label}
                        </option>
                    ))}
                </select>
                :
                <select
                    id={id} required={required} name={name} onChange={handleFormDataChange} defaultValue="Select an option"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    {children.map((option, index) => (
                        <option key={`${id}-${index}`} value={option.name} disabled={option.value === "" ? true : false}>
                            {option.label}
                        </option>
                    ))}
                </select>
            }
        </div>
    );
};

export default SelectField;