import { useContext } from 'react';
// importing contexts
import { ClientContext } from '../contexts/Client.context';
// importing components
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import ServicesGrid from '../components/ServicesGrid';
import InsuranceServices from '../components/InsuranceServices';
import AdminPanel from '../components/AdminPanel';
import Footer from '../components/Footer';

const Home = () => {
    const { isLoggedIn, condenseClientInfo } = useContext(ClientContext);

    if (isLoggedIn && (condenseClientInfo.role?.toLowerCase() === 'superadmin' || condenseClientInfo.role?.toLowerCase() === 'admin')) {
        return <AdminPanel />;
    }

    return (
        <>
            <div className='flex flex-col'>
                <main className='flex-1 pt-12'>
                    <Hero />
                    <ServicesGrid />
                    <InsuranceServices />
                    <Testimonials />
                </main>
            </div>
            <Footer />
        </>
    );
}

export default Home;