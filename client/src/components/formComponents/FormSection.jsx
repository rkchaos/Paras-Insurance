import FormField from './FormField';

const FormSection = ({ fields, data, handleFormDataChange }) => {
    return (
        <div className='form-section space-y-2'>
            {fields.map((field, index) => (
                <FormField key={`${field.id}-${index}`} {...field} data={data} handleFormDataChange={handleFormDataChange} />
            ))}
        </div>
    );
}

export default FormSection;