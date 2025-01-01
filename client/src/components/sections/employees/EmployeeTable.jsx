import { useContext } from 'react';
import { Tooltip } from '@mui/material';
import { tailChase } from 'ldrs';
import { Edit2, Trash2 } from 'lucide-react';
import { ClientContext } from '../../../contexts/Client.context';

const EmployeeTable = ({ employeesData, onRemoveAccess }) => {
    const { condenseClientInfo } = useContext(ClientContext);
    
    tailChase.register();

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Employee Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone No.
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Login Access
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {employeesData.map((employee, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {employee.firstName} {employee.lastName}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.role === 'superAdmin'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {employee.role === 'superAdmin' ? 'Super Admin' : 'Admin'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{employee.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{employee.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{employee.loginAccess ?
                                    'Approved'
                                    : 'Denied'

                                }</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900">
                                        <Tooltip title='Edit details'>
                                            <Edit2 size={18} />
                                        </Tooltip>
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        {condenseClientInfo.role === 'superAdmin' &&
                                            <Tooltip title='Remove access'>
                                                <Trash2 size={18} onClick={() => onRemoveAccess(employee._id)} />
                                            </Tooltip>
                                        }
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default EmployeeTable;