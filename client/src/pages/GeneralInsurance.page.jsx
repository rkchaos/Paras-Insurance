import { useEffect, useState } from 'react';
import { tailChase } from 'ldrs';
// importing api end-points
import { fetchProfileData } from '../api';
// importing components
import UpdateProfileForm from '../components/UpdateProfileForm';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const GeneralInsurance = () => {
    const { id } = useParams();

    const [isLoadingClientData, setIsLoadingClientData] = useState(true);
    const [isUnauthorisedAction, setIsUnauthorisedAction] = useState(false);
    const [isClientDataFound, setIsClientDataFound] = useState(true);
    const [clientData, setClientData] = useState({});

    const getClientData = async () => {
        try {
            const { data } = await fetchProfileData({ clientId: id });
            setClientData(data);
            setIsLoadingClientData(false);
            setIsUpdateProfileOpen(true);
        } catch (error) {
            const { status } = error;
            const errorMessage = error?.response?.data?.message;
            if (status === 400 && errorMessage === 'Unauthorised action.') {
                setIsLoadingClientData(false);
                setIsUnauthorisedAction(true);
            } else if (status === 404 && errorMessage === 'No client found.') {
                setIsLoadingClientData(false);
                setIsClientDataFound(false);
            } else {
                console.error(error);
            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        getClientData();

        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [id]);

    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
    const closeUpdateProfile = () => { }
    const handleGeneralInsurance = async (formData, removedFiles, files, currentPolicyId) => {
        // TODO: General Insurance table me add kardo
        console.log(formData);
        console.log(removedFiles);
        console.log(files);
        console.log(currentPolicyId);
    }

    tailChase.register();

    return (
        <div className='!overflow-y-hidden'>
            {isLoadingClientData ?
                <div className='min-h-screen flex justify-center items-center'>
                    <l-tail-chase size='40' speed='1.75' color='#111827' />
                </div>
                :
                isUnauthorisedAction ?
                    <div className="flex flex-col justify-center items-center my-16">
                        <lord-icon
                            src='https://cdn.lordicon.com/dicvhxpz.json'
                            trigger='morph'
                            stroke='bold' state='morph-cross'
                            colors='primary:#111827,secondary:#111827'
                            style={{ width: '250px', height: '250px' }}
                        />
                        <p className='text-3xl font-semibold text-gray-900'>Unauthorised action performed</p>
                    </div>
                    :
                    !isClientDataFound ?
                        <div className="flex flex-col justify-center items-center my-16">
                            <lord-icon
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover"
                                colors='primary:#111827,secondary:#111827'
                                style={{ width: '250px', height: '250px' }}
                            />
                            <p className='text-3xl font-semibold text-gray-900'>No client found</p>
                        </div>
                        :
                        <div className='h-[100vh] relative bg-white overflow-hidden'>
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-[#111827]"></div>
                                <div
                                    className="absolute inset-0 bg-white"
                                    style={{ clipPath: 'polygon(0 65%, 100% 35%, 100% 100%, 0% 100%)' }}
                                />
                            </div>
                        </div>
            }
            <Footer />
            {isUpdateProfileOpen &&
                <UpdateProfileForm
                    clientData={clientData}
                    closeUpdateProfile={closeUpdateProfile}
                    isNotClosable={true}
                    onSubmit={handleGeneralInsurance}
                    label='General Insurance'
                    includePolicyType={true}
                />
            }
        </div>
    );
}

export default GeneralInsurance;