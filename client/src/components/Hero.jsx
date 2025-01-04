import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// importing contexts
import { ClientContext } from '../contexts/Client.context';

const Hero = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(ClientContext);

    return (
        <section className='pb-8 md:pb-12'>
            <div className='px-4 md:px-40'>
                <div className='grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12 items-center'>
                    <div className='flex flex-col justify-center space-y-4'>
                        <div className='inline-block rounded-lg bg-primary/10 pr-3 py-1 text-sm text-primary'>
                            Comprehensive Coverage
                        </div>
                        <h1 className='text-4xl font-thin tracking-tighter'>
                            Protecting your future with <span className='font-semibold'>Paaras</span>
                        </h1>
                        <p className='max-w-[600px] text-gray-500 md:text-lg'>
                            Secure your tomorrow with tailored insurance solutions for every aspect of your life.
                        </p>
                        <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                            {isLoggedIn
                                ?
                                <a
                                    href='#productsAndServices'
                                    className='px-4 py-1 font-semibold text-lg rounded-md text-white bg-gray-900 border-white hover:opacity-95'
                                >Get Started</a>
                                :
                                <button
                                    onClick={() => navigate('/auth')}
                                    className='px-4 py-1 font-semibold text-lg rounded-md text-white bg-gray-900 border-white hover:opacity-95'
                                >Get Started</button>

                            }
                        </div>
                    </div>
                    <img
                        src='https://media.istockphoto.com/id/1199060494/photo/insurance-protecting-family-health-live-house-and-car-concept.jpg?s=612x612&w=0&k=20&c=W8bPvwF5rk7Rm2yDYnMyFhGXZfNqK4bUPlDcRpKVsB8='
                        alt='Insurance Protection Concept'
                        className='w-[612px] h-[256px] object-cover rounded-lg'
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;