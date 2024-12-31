function TelField({ label, id, name, placeholder, required, pattern, data, handleFormDataChange, repeat, repeatIndex }) {
    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    return (
        <div className='form-field'>
            <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
                {label}{required && <span className="text-red-600">*</span>}
            </label>
            {repeat
                ?
                <input
                    type='tel' id={id} name={`${repeatIndex}${name}`} placeholder={placeholder} required={required} pattern={pattern}
                    value={data[name]} onChange={handleFormDataChange} onKeyDown={handleEnter}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                :
                <input
                    type='tel' id={id} name={name} placeholder={placeholder} required={required} pattern={pattern}
                    value={data[name]} onChange={handleFormDataChange}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
            }
        </div>
    );
}

export default TelField;