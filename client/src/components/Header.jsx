import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
// importing contexts
import { ClientContext } from '../contexts/Client.context';
// importing components
import { Button } from './subcomponents/Button';

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, condenseClientInfo } = useContext(ClientContext);

    return (
        <header className='relative top-0 left-0 right-0 z-50 bg-gray-900 text-white border-b border-gray-800'>
            <div className='container flex h-16 px-8 items-center justify-between'>
                <Link to='/' className='font-semibold text-xl'>
                    Paaras Financials
                </Link>
                <nav className='hidden md:flex gap-8'>
                    {/* <Link to='/' className='text-sm hover:opacity-95'>
                        Insurance Products
                    </Link>
                    <Link to='/' className='text-sm hover:opacity-95'>
                        Renew Your Policy
                    </Link>
                    <Link to='/' className='text-sm hover:opacity-95'>
                        Start a SIP
                    </Link>
                    <Link to='/' className='text-sm hover:opacity-95'>
                        Support
                    </Link> */}
                </nav>
                {isLoggedIn ?
                    <Link to={`/profile/${condenseClientInfo._id}`}
                        className='flex gap-2 items-center justify-center hover:opacity-95'
                    >
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User size={20} className="text-gray-600" />
                        </div>
                        <p>{condenseClientInfo.firstName}</p>
                    </Link>
                    :
                    <Button label="Login" onClickFunction={() => navigate('/auth')} />
                }
            </div>
        </header>
    );
}

export default Header;