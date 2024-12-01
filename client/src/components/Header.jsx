import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './subcomponents/Button';
import { ClientContext } from '../contexts/Client.context';
import { FaRegUserCircle } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const { isLoggedIn, condenseClientInfo } = useContext(ClientContext);

    return (
        <header className='relative top-0 left-0 right-0 z-50 bg-gray-900 text-white border-b border-gray-800'>
            <div className='container flex h-16 px-8 items-center justify-between'>
                <Link to='/' className='font-semibold text-xl'>
                    Paras Insurance
                </Link>
                <nav className='hidden md:flex gap-8'>
                    <Link to='/' className='text-sm hover:text-primary'>
                        Insurance Products
                    </Link>
                    <Link to='/' className='text-sm hover:text-primary'>
                        Renew Your Policy
                    </Link>
                    <Link to='/' className='text-sm hover:text-primary'>
                        Claim
                    </Link>
                    <Link to='/' className='text-sm hover:text-primary'>
                        Support
                    </Link>
                </nav>
                {isLoggedIn ?
                    <Link to={`/profile/${condenseClientInfo._id}`} className='flex gap-2 items-center justify-center'>
                        <FaRegUserCircle />
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