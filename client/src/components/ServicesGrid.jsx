import { Link } from 'react-router-dom';
import { Activity, Car, Briefcase, Plane, Home, HeartPulse, Bike, Landmark, Baby, Building2 } from 'lucide-react';
import Card from './subcomponents/Card';

const ServicesGrid = () => {
    const services = [
        { icon: HeartPulse, label: 'Health Insurance', description: 'Safeguard your home and belongings against unforeseen circumstances.', to: '/health-insurance' },
        { icon: Activity, label: 'Term Life Insurance', description: "Protect your loved ones' financial future with our life insurance plans.", to: '/term-life-insurance' },
        { icon: Car, label: 'Vehicle Insurance', description: 'Comprehensive coverage for your vehicle on and off the road.', to: '/car-insurance' },
        { icon: Plane, label: 'Travel Insurance', description: "Travel with peace of mind knowing you're covered for unexpected events.", to: '/travel-insurance' },
        // { icon: Bike, label: '2 Wheeler Insurance', description: 'Safeguard your home and belongings against unforeseen circumstances.', to: '/2-wheeler-insurance' },
        // { icon: Activity, label: 'Term Insurance (Women)', description: 'Safeguard your home and belongings against unforeseen circumstances.', to: '/term-insurance' },
        // { icon: Landmark, label: 'Return of Premium', description: 'Safeguard your home and belongings against unforeseen circumstances.', to: '/home-insurance' },
        // { icon: Baby, label: 'Child Saving Plans', description: 'Comprehensive coverage for your vehicle on and off the road.', to: '/car-insurance' },
        // { icon: Briefcase, label: 'Retirement Plans', description: 'Comprehensive coverage for your vehicle on and off the road.', to: '/car-insurance' },
        // { icon: Building2, label: 'Employee Group Health Insurance', description: 'Comprehensive coverage for your vehicle on and off the road.', to: '/car-insurance' },
    ];

    return (
        <section className='py-8 md:py-12 px-8 bg-gray-50'>
            <div className='container px-4 md:px-6'>
                <h2 className='text-3xl font-bold text-center mb-8'>Our Insurance Products</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {services.map((service, index) => (
                        <Link to={service.to} key={index} className='block bg-white rounded-lg py-8'>
                            <div className='w-full flex justify-center'>
                                <service.icon />
                            </div>
                            <Card
                                label={service.label}
                                description={service.description}
                                className='bg-white h-full transition-shadow hover:shadow-md'
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesGrid;