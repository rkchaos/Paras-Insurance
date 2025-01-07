import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className='py-12 sm:px-16 bg-white'>
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[#111827]"></div>
                <div
                    className="absolute inset-0 bg-white"
                    style={{ clipPath: 'polygon(0 65%, 100% 35%, 100% 100%, 0% 100%)' }}
                />
            </div>

            <div className="relative z-10 pt-0 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-lg p-8">
                        <h1 className='text-3xl text-center font-semibold'>
                            About Us
                        </h1>
                        <div className="space-y-8 text-black mt-2">
                            <div className="border-l-4 border-black/70 pb-1 pl-4">
                                <h3 className="text-xl font-semibold mb-1">
                                    Our Mission
                                </h3>
                                <p className="text-gray-800 text-md ">
                                    At Paaras Financials, we are committed to providing comprehensive insurance solutions
                                    that protect what matters most to you. Our mission is to deliver peace of mind
                                    through reliable coverage and exceptional service.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg hover:bg-black/10 transition-all duration-300">
                                    <h4 className="text-xl font-semibold mb-1">
                                        Our Values
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-800">
                                        <li>Integrity in all our dealings</li>
                                        <li>Customer-first approach</li>
                                        <li>Professional excellence</li>
                                        <li>Innovation in solutions</li>
                                    </ul>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg hover:bg-black/10 transition-all duration-300">
                                    <h4 className="text-xl font-semibold mb-1">
                                        Why Choose Us
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1 text-gray-800">
                                        <li>25+ years of experience</li>
                                        <li>Comprehensive coverage options</li>
                                        <li>24/7 customer support</li>
                                        <li>Competitive rates</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="border-l-4 border-black/70 pb-1 pl-4">
                                <h3 className="text-xl font-semibold mb-1">
                                    Our Commitment
                                </h3>
                                <p className="text-gray-800 text-md ">
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