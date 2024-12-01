import React, { useState } from 'react';
import FormField from '../FormField';

function RepeatField({ maxCount, children, buttonLabel, data, handleFormDataChange }) {
    const [repeats, setRepeats] = useState(1);

    const handleAddRepeat = async (event) => {
        if (repeats < maxCount) {
            await setRepeats(repeats + 1);
        }
        // event.target.name = "repeatsCount";
        // event.target.value = repeats+1;
        // await handleFormDataChange(event);
        // event.target.name = "maxCount";
        // event.target.value = maxCount;
        // await handleFormDataChange(event);
    };

    return (
        <div className='repeat-field space-y-6'>
            {Array.from({ length: repeats }).map((_, index) => (
                <div key={index} className='repeat-group bg-gray-50 p-4 rounded-md'>
                    <div className='space-y-2'>
                        {children.map((field, fieldIndex) => (
                            <FormField
                                key={`${field.id}-${index}-${fieldIndex}`}
                                {...field} repeat={true} repeatIndex={index + 1}
                                data={data} handleFormDataChange={handleFormDataChange}
                            />
                        ))}
                    </div>
                </div>
            ))}
            {repeats < maxCount && (
                <button
                    type="button"
                    onClick={handleAddRepeat}
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
                >
                    {buttonLabel || 'Add More'}
                </button>
            )}
        </div>
    );
}

export default RepeatField;