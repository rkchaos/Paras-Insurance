import { Users, Building2, ChevronLeft, ChevronRight, User, Receipt } from 'lucide-react';

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Receipt },
    { id: 'customers', label: 'Customer Management', icon: Users },
    { id: 'companies', label: 'Company Management', icon: Building2 },
    { id: 'employee', label: 'Employee Management', icon: User },
];

function Sidebar({ isCollapsed, toggleSidebar, activeSection, setActiveSection }) {
    return (
        <div className={`${isCollapsed ? 'w-16' : 'w-64'} fixed left-0 h-screen bg-gray-900 text-white transition-none`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                {!isCollapsed && <span className="text-xl font-bold">Admin Panel</span>}
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="mt-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center p-4 hover:bg-gray-800 transition-colors ${activeSection === item.id ? 'bg-blue-600' : ''
                                }`}
                        >
                            <Icon size={20} />
                            {!isCollapsed && <span className="ml-4">{item.label}</span>}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}

export default Sidebar;