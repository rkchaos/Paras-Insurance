function TextField({ label, id, name, placeholder, required, data, handleFormDataChange, type = 'text', repeat, repeatIndex }) {
    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }
    
    return (
        <div className='form-field'>
            <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>
            {repeat ?
                <input
                    type={type} id={id} name={`${repeatIndex}${name}`} placeholder={placeholder} required={required}
                    value={data[name]} onChange={handleFormDataChange} onKeyDown={handleEnter}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                :
                <input
                    type={type} id={id} name={name} placeholder={placeholder} required={required}
                    value={data[name]} onChange={handleFormDataChange}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
            }
        </div>
    );
}

export default TextField;