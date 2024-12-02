import { useContext, useEffect, useState } from 'react';
import { tailChase } from 'ldrs';
import { useNavigate, useParams } from 'react-router-dom';
import { assignPolicy, fetchAllPolicyFields } from '../api';
import FormSection from '../components/formComponents/FormSection';
import { ClientContext } from '../contexts/Client.context';
import RegisterModal from '../components/RegisterModal';

const InsuranceForm = () => {
    const { id } = useParams();
    const { isLoggedIn, setIsLoggedIn, condenseClientInfo, setCondenseClientInfo } = useContext(ClientContext);

    const navigate = useNavigate();
    const [isLoadingForm, setIsLoadingForm] = useState(true);
    const [formFields, setFormFields] = useState({});
    const [formData, setFormData] = useState({});
    function handleFormDataChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            return { ...prevFormData, [name]: value };
        });
    }

    const [error, setError] = useState("");
    const handleError = (error) => {
        if (error.code === 'ERR_NETWORK') {
            setError('Server is down. Please try again later.');
        } else {
            setError(error.response.data.message);
        }
    }
    const getAllPolicyFields = async () => {
        try {
            const { data } = await fetchAllPolicyFields({ policyId: id });
            setFormData(data?.dataFormat);
            setFormFields(data?.form);
            setIsLoadingForm(false);
        } catch (error) {
            handleError(error);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getAllPolicyFields();
    }, []);

    const [currentSection, setCurrentSection] = useState(0);
    const handleNext = () => {
        if (document.getElementById('insuranceForm').checkValidity()) {
            if (currentSection < formFields.sections.length - 1) {
                setCurrentSection(currentSection + 1);
            }
        }
    };
    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // if (formData?.repeatsCount) {
        //     console.log(formData.repeatsCount);
        //     console.log(formData.maxCount);
        // }

        try {
            if (isLoggedIn) {
                const { data } = await assignPolicy({ formData: formData, policyId: id, clientId: condenseClientInfo._id });
                const { clientInfo } = data;
                setCondenseClientInfo(clientInfo);
                navigate('/');
            } else {
                setShowRegisterModal(true);
                return;
            }
        } catch (error) {
            handleError(error);
        }
    }

    const handleLogin = async (password) => {
        try {
            const { data } = await assignPolicy({ formData: formData, policyId: id, clientId: '', password: password });
            const { clientInfo } = data;
            setShowRegisterModal(false);
            setIsLoggedIn(true);
            setCondenseClientInfo(clientInfo);
            navigate('/');
        } catch (error) {
            handleError(error);
        }
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
                        <form id="insuranceForm" onSubmit={handleFormSubmit} className='bg-white shadow-md rounded-lg py-6 px-8 transition duration-300 ease-in-out hover:shadow-xl'>
                            <h1 className='text-2xl font-bold text-center mb-4'>{formFields.sections[currentSection].heading}</h1>
                            <FormSection
                                fields={formFields.sections[currentSection].fields}
                                data={formData}
                                handleFormDataChange={handleFormDataChange}
                            />
                            <div className='flex justify-between mt-6'>
                                {currentSection > 0 && (
                                    <button type='button' onClick={handlePrevious} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>
                                        Previous
                                    </button>
                                )}
                                {currentSection < formFields.sections.length - 1 && (
                                    <button type='button' onClick={handleNext} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                        Next
                                    </button>
                                )}
                                {currentSection === formFields.sections.length - 1 && (
                                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                        {formFields.submitButtonLabel}
                                    </button>
                                )}
                            </div>
                            <p className='text-red-500 mt-4 text-sm'>
                                {error && error}
                            </p>
                        </form>
                    </div>
                </div>
            }
            <RegisterModal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onSubmit={handleLogin}
            />
        </div>
    );
}

export default InsuranceForm;