import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// importing assets
// import backgroundVideo from '../assets/vid-background.mp4';
import imgAboutUs from '../assets/img-AboutUs.svg';

const AboutUs = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) { videoRef.current.playbackRate = 1.2 }
    }, []);

    return (
        <div className="flex gap-6 items-center justify-center min-h-[90vh] relative bg-white overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[#111827]"></div>
                <div
                    className="absolute inset-0 bg-white"
                    style={{ clipPath: 'polygon(0 65%, 100% 35%, 100% 100%, 0% 100%)' }}
                />
            </div>
            <div className='relative z-10 h-[100vh] bg-gray-100 flex items-center max-w-[30%] rounded-lg'>
                <img
                    src={imgAboutUs}
                    className=''
                />
            </div>
            <div className="relative z-10 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-100 backdrop-blur-sm shadow-2xl rounded-lg p-8">
                        <h1 className='text-3xl text-left font-semibold'>
                            We've got an entire team dedicated
                        </h1>
                        <h1 className='text-3xl text-left font-semibold'>
                            to supporting you and your needs
                        </h1>
                        <div className="space-y-4 text-black">
                            <div className="">
                                <h3 className="text-xl font-semibold mb-2">
                                    Our Mission
                                </h3>
                                <p className="text-gray-800 text-md leading-relaxed">
                                    At Paaras Financials, we are committed to providing comprehensive insurance solutions
                                    that protect what matters most to you. Our mission is to deliver peace of mind
                                    through reliable coverage and exceptional service.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg hover:bg-black/20 transition-all duration-300">
                                    <h4 className="text-xl font-semibold mb-3">
                                        Our Values
                                    </h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-800">
                                        <li>Integrity in all our dealings</li>
                                        <li>Customer-first approach</li>
                                        <li>Professional excellence</li>
                                        <li>Innovation in solutions</li>
                                    </ul>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg hover:bg-black/20 transition-all duration-300">
                                    <h4 className="text-xl font-semibold mb-3">
                                        Why Choose Us
                                    </h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-800">
                                        <li>25+ years of experience</li>
                                        <li>Comprehensive coverage options</li>
                                        <li>24/7 customer support</li>
                                        <li>Competitive rates</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-2">
                                    Our Commitment
                                </h3>
                                <p className="text-gray-800 text-md leading-relaxed">
                                    We understand that every client has unique insurance needs. That's why we
                                    offer tailored solutions backed by our team of experienced professionals who
                                    are dedicated to providing personalized service and expert guidance.
                                </p>
                            </div>

                            <div className="flex justify-center mt-8">
                                <Link
                                    to='/contactUs'
                                    className="bg-white/50 backdrop-blur-sm text-gray-900 px-8 py-3 rounded-md font-medium transition-all duration-300 ease-in-out hover:bg-gray-900 hover:shadow-lg hover:scale-105 hover:text-white active:transform active:scale-95"
                                >Get in Touch</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;