import { useContext, useState } from 'react';
import { User } from 'lucide-react';
import { ClientContext } from '../contexts/Client.context';
import Sidebar from './Sidebar';
import CustomerManagement from './sections/CustomerManagement';
import CompanyManagement from './sections/CompanyManagement';
import EmployeeManagement from './sections/EmployeeManagement';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard');
    const { condenseClientInfo } = useContext(ClientContext)

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'companies':
                return <CompanyManagement />;
            case 'customers':
                return <CustomerManagement />;
            case 'employee':
                return <EmployeeManagement />;
            case 'dashbord':
                return <div>On it's way</div>;
            default:
                return <div>On it's way</div>;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}
                activeSection={activeSection} setActiveSection={setActiveSection}
            />

            <div className={`flex-1 ${isCollapsed ? 'ml-16' : 'ml-64'} transition-none`}>
                <header className="bg-white shadow-sm px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1" />
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Link to={`/profile/${condenseClientInfo._id}`}
                                    className='flex gap-2 items-center justify-center hover:opacity-95'
                                >
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                        <User size={20} className="text-gray-600" />
                                    </div>
                                    <p>{condenseClientInfo.firstName}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="p-6">
                    {renderSection()}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;