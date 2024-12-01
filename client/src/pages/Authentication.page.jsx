import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { register, login, forgotPassword } from '../api';
import { ClientContext } from '../contexts/Client.context';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

const Authentication = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, setCondenseClientInfo } = useContext(ClientContext);

    const firstNameField = useRef(null);
    const lastNameField = useRef(null);
    const emailField = useRef(null);
    const phoneField = useRef(null);
    const passwordField = useRef(null);
    const confirmPasswordField = useRef(null);
    const emailOrPhoneField = useRef(null);

    const [isRegister, setIsRegister] = useState(false);
    function handleIsRegister() {
        setIsRegister(prevIsRegister => {
            return !prevIsRegister;
        });
    }

    const [authData, setAuthData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: "",
        emailOrPhone: '',
    });
    function handleAuthDataChange(event) {
        const { name, value } = event.target;
        setAuthData(prevAuthData => {
            return { ...prevAuthData, [name]: value };
        });
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(false);
    const handleError = (error) => {
        if (error.code === 'ERR_NETWORK') {
            setError('Server is down. Please try again later.');
        } else {
            setError(error?.response?.data?.message);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (isRegister) {
            if (authData.firstName.trim() === '') {
                firstNameField.current.focus();
                return false;
            }
            if (authData.email.trim() === '') {
                emailField.current.focus();
                return false;
            }
            if (authData.phone.trim() === '') {
                phoneField.current.focus();
                return false;
            }
            if (authData.confirmPassword.trim() === "") {
                confirmPasswordField.current.focus();
                return false;
            } else if (authData.confirmPassword.trim() !== authData.password.trim()) {
                confirmPasswordField.current.focus();
                setError('Password do not match.')
                return false;
            }
        } else {
            if (authData.emailOrPhone.trim() === '') {
                emailOrPhoneField.current.focus();
                return false;
            }
        }
        if (authData.password.trim() === '') {
            passwordField.current.focus();
            return false;
        }
        if (isRegister) {
            try {
                const { data } = await register(authData);
                setCondenseClientInfo(data);
                setIsLoggedIn(true);
                navigate('/');
            } catch (error) {
                handleError(error);
            }
        } else {
            try {
                const { data } = await login(authData);
                setCondenseClientInfo(data);
                setIsLoggedIn(true);
                navigate('/');
            } catch (error) {
                handleError(error);
            }
        }
    }

    const [showForgotPasswordModal, setForgotPasswordModal] = useState(false);
    const [modalFieldIsDisabled, setModalFieldIsDisabled] = useState(false);
    const [modalText, setModalText] = useState("");
    const handleForgotPassword = async (email) => {
        try {
            setModalText('');
            const { data } = await forgotPassword({ email });
            setModalText(data?.message);
            if (data?.message === 'No such user found.') {
                setModalFieldIsDisabled(false);
            }
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className='bg-gray-100 flex flex-col justify-center py-4 sm:px-6 lg:px-8'>
            <h1 className='font-bold text-3xl text-center'>{isRegister ? 'Register' : 'Login'}</h1>
            <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    {isRegister && (
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
                                    First Name*
                                </label>
                                <div className='mt-1'>
                                    <input
                                        id='firstName' name='firstName' type='text' ref={firstNameField} placeholder='Enter your first name' required
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        value={authData.firstName} onChange={handleAuthDataChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
                                    Last Name
                                </label>
                                <div className='mt-1'>
                                    <input
                                        id='lastName' name='lastName' type='text' placeholder='Enter your last name' ref={lastNameField}
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        value={authData.lastName} onChange={handleAuthDataChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                                    Email*
                                </label>
                                <div className='mt-1'>
                                    <input
                                        id='email' name='email' type='email' ref={emailField} placeholder='Enter your email' required
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        value={authData.email} onChange={handleAuthDataChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
                                    Phone number*
                                </label>
                                <div className='mt-1'>
                                    <input
                                        id='phone' name='phone' type='tel' pattern='[7-9]{1}[0-9]{9}' placeholder='Enter your phone number' ref={phoneField} required
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        value={authData.phone} onChange={handleAuthDataChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                    Create Password*
                                </label>
                                <div className='mt-1 relative'>
                                    <input
                                        id='password' name='password' type={showPassword ? 'text' : 'password'} ref={passwordField} placeholder='Create a strong password' required
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        value={authData.password} onChange={handleAuthDataChange}
                                    />
                                    <button
                                        type='button' onClick={() => setShowPassword(!showPassword)}
                                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className='h-5 w-5 text-gray-400' />
                                        ) : (
                                            <FaEye className='h-5 w-5 text-gray-400' />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
                                    Confirm Password*
                                </label>
                                <div className='mt-1 relative'>
                                    <input
                                        id='confirmPassword' name='confirmPassword' type={showConfirmPassword ? 'text' : 'password'} ref={confirmPasswordField} placeholder='Retype your password' required
                                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        value={authData.confirmPassword} onChange={handleAuthDataChange}
                                    />
                                    <button
                                        type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className='h-5 w-5 text-gray-400' />
                                        ) : (
                                            <FaEye className='h-5 w-5 text-gray-400' />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            >
                                Register
                            </button>
                        </form>
                    )}
                    {!isRegister &&
                        <>
                            <form className='space-y-6' onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor='emailOrPhone' className='block text-sm font-medium text-gray-700'>
                                        Email or Phone number
                                    </label>
                                    <div className='mt-1'>
                                        <input
                                            id='emailOrPhone' name='emailOrPhone' type='text' ref={emailOrPhoneField} placeholder='Enter either your email or phone number' required
                                            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                            value={authData.emailOrPhone} onChange={handleAuthDataChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                                        Password
                                    </label>
                                    <div className='mt-1 relative'>
                                        <input
                                            id='password' name='password' type={showPassword ? 'text' : 'password'} ref={passwordField} placeholder='Enter your password' required
                                            className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                            value={authData.password} onChange={handleAuthDataChange}
                                        />
                                        <button
                                            type='button' onClick={() => setShowPassword(!showPassword)}
                                            className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className='h-5 w-5 text-gray-400' />
                                            ) : (
                                                <FaEye className='h-5 w-5 text-gray-400' />
                                            )}
                                        </button>
                                    </div>
                                    <span
                                        onClick={() => setForgotPasswordModal(true)}
                                        className='text-sm font-semibold mt-1 text-blue-600 hover:underline cursor-pointer'
                                    >Forgot password?</span>
                                </div>
                                <button
                                    type='submit'
                                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                                    Login
                                </button>
                            </form>
                            <div className='mt-6'>
                                <div className='relative'>
                                    <div className='absolute inset-0 flex items-center'>
                                        <div className='w-full border-t border-gray-300'></div>
                                    </div>
                                    <div className='relative flex justify-center text-sm'>
                                        <span className='px-2 bg-white text-gray-500'>Or</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    <p className='text-center mt-2'>
                        {isRegister ?
                            <>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={handleIsRegister}> Login</span></>
                            : <>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={handleIsRegister}> Register</span></>
                        }
                    </p>
                    <p className='text-red-500 mt-4 text-sm'>
                        {error && error}
                    </p>
                </div>
            </div>
            <ForgotPasswordModal
                isOpen={showForgotPasswordModal}
                onClose={() => setForgotPasswordModal(false)}
                modalText={modalText}
                modalFieldIsDisabled={modalFieldIsDisabled}
                setModalFieldIsDisabled={setModalFieldIsDisabled}
                onSubmit={handleForgotPassword}
            ></ForgotPasswordModal>
        </div>
    );
}

export default Authentication;
