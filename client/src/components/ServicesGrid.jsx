import { Link } from 'react-router-dom';
import { Activity, Car, Plane, HeartPulse } from 'lucide-react';
// import { Activity, Car, Briefcase, Plane, Home, HeartPulse, Bike, Landmark, Baby, Building2 } from 'lucide-react';
import PolicyCard from './subcomponents/PolicyCard';
import { useEffect, useState } from 'react';
import { fetchAllPolicies } from '../api';
import { tailChase } from 'ldrs';

const ServicesGrid = () => {
    const [services, setServices] = useState([]);

    const getAllPolicies = async () => {
        const { data } = await fetchAllPolicies();
        setServices(data);
    }

    useEffect(() => {
        getAllPolicies();
    }, []);

    const policy_icons = [HeartPulse, Activity, Car, Plane];
    const renderIcon = (index) => {
        const IconComponent = policy_icons[index];
        return IconComponent ? <IconComponent /> : null;
    };

    tailChase.register();

    return (
        <section className='py-8 md:py-12 px-8 bg-gray-50'>
            <div className='container px-4 md:px-6'>
                <h2 className='text-3xl font-bold text-center mb-8'>Our Insurance Products</h2>
                <div className='flex flex-col sm:flex-row gap-6 justify-center'>
                    {services.length == 0 ?
                        <l-tail-chase size="40" speed="1.75" color="#111827" />
                        :
                        services.map((service, index) => (
                            <Link to={`/insurance-form/${service._id}`} key={index} className='block bg-white rounded-lg py-8'>
                                <div className='w-full flex justify-center'>
                                    {renderIcon(service.policy_icon)}
                                </div>
                                <PolicyCard
                                    label={service.policy_name}
                                    description={service.policy_description}
                                    className='bg-white h-full transition-shadow hover:shadow-md'
                                />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default ServicesGrid;