import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-white pt-12 pb-4 px-4 md:px-40'>
            <div className='mx-auto'>
                <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8'>
                    <div>
                        <h5 className='font-bold text-md sm:text-xl mb-4'>Paaras Financials</h5>
                        <ul className='sm:space-y-2'>
                            <li><a href='#' className='text-xs sm:text-md hover:text-gray-400'>Home</a></li>
                            <li><Link to='/aboutUs' className='text-xs sm:text-md hover:text-gray-400'>About Us</Link></li>
                            <li><Link to='/contactUs' className='text-xs sm:text-md hover:text-gray-400'>Contact Us</Link></li>
                            {/* 
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>Renew your policy</Link></li>
                            */}
                        </ul>
                    </div>
                    <div>
                        <h5 className='font-bold text-md sm:text-xl mb-4'>Our Solutions</h5>
                        <ul className='sm:space-y-2'>
                            <li><a href='#productsAndServices' className='text-xs sm:text-md hover:text-gray-400'>Products & Services</a></li>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>Start a SIP</Link></li>
                        </ul>
                    </div>
                    {/* 
                    <div>
                        <h5 className='font-bold text-md sm:text-xl mb-4'>Companies</h5>
                        <ul className='sm:space-y-2'>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>TATA</Link></li>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>HDFC</Link></li>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>NIVA BUPA</Link></li>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>ABHI</Link></li>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>MAGMA HDI</Link></li>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>ICICI</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className='font-bold text-md sm:text-xl mb-4'>Community</h5>
                        <ul className='sm:space-y-2'>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>Issues</Link></li>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>Discussions</Link></li>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>Corporate sponsors</Link></li>
                            <li><Link to='/' className='text-xs sm:text-md hover:text-gray-400'>Open Collective</Link></li>
                        </ul>
                    </div> 
                    */}
                    <div>
                        <h5 className='font-bold text-md sm:text-xl mb-4'>Support</h5>
                        <ul className='sm:space-y-2'>
                            <li className='text-xs sm:text-md py-1'>+91 9876543210</li>
                            <li className='text-xs sm:text-md py-1'>support@paarasinsurance.com</li>
                        </ul>
                    </div>
                </div>
                <div className='mt-8 pt-4 border-t text-center border-gray-700'>
                    <p className='text-gray-400 text-sm'>
                        Designed and built with all the love in the world by the RASH Technologies team.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;