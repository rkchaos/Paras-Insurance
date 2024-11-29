import FormField from './FormField';

function FormSection({ fields }) {
    return (
        <div className='form-section space-y-2'>
            {fields.map((field, index) => (
                <FormField key={`${field.id}-${index}`} {...field} />
            ))}
        </div>
    );
}

export default FormSection;