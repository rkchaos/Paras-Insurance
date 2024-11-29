import { useEffect, useState } from 'react';
import { tailChase } from 'ldrs';
import { useParams } from 'react-router-dom';
import { fetchAllPolicyFields } from '../api';
import FormSection from '../components/formComponents/formSection';

const InsuranceForm = () => {
    const { id } = useParams();
    const [isLoadingForm, setIsLoadingForm] = useState(true);
    const [formData, setFormData] = useState({});

    const getAllPolicyFields = async () => {
        try {
            const { data } = await fetchAllPolicyFields({ policyId: id });
            setFormData(data?.form);
            setIsLoadingForm(false);
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                setError('Server is down. Please try again later.');
            } else {
                setError(error.response.data.message);
            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getAllPolicyFields();
    }, []);

    const [currentSection, setCurrentSection] = useState(0);
    const handleNext = () => {
        if (currentSection < formData.sections.length - 1) {
            setCurrentSection(currentSection + 1);
        }
    };
    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('submitted');
    }

    tailChase.register();

    return (
        <div>
            {isLoadingForm ?
                <div className='min-h-screen flex justify-center items-center'>
                    <l-tail-chase size='40' speed='1.75' color='#111827' />
                </div>
                :
                <div className='min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8'>
                    <div className='max-w-lg w-full space-y-8'>
                        <form onSubmit={handleFormSubmit} className='bg-white shadow-md rounded-lg py-6 px-8 transition duration-300 ease-in-out hover:shadow-xl'>
                            <h1 className='text-2xl font-bold text-center mb-4'>{formData.sections[currentSection].heading}</h1>
                            <FormSection
                                fields={formData.sections[currentSection].fields}
                            />
                            <div className='flex justify-between mt-6'>
                                {currentSection > 0 && (
                                    <button onClick={handlePrevious} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>
                                        Previous
                                    </button>
                                )}
                                {currentSection < formData.sections.length - 1 && (
                                    <button onClick={handleNext} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                        Next
                                    </button>
                                )}
                                {currentSection === formData.sections.length - 1 && (
                                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                        {formData.submitButtonLabel}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}

export default InsuranceForm;