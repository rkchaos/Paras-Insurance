import { useContext, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { ClientContext } from '../../contexts/Client.context';
import { addEmployee, fetchAllEmployees, removeEmployeeAccess } from '../../api';
import EmployeeTable from './employees/EmployeeTable';
import EmployeeForm from './employees/EmployeeForm';

function EmployeeManagement() {
    const [showForm, setShowForm] = useState(false);

    const [employeesData, setEmployeesData] = useState([]);
    const { condenseClientInfo } = useContext(ClientContext);
    const getAllEmployees = async () => {
        try {
            const { data } = await fetchAllEmployees();
            setEmployeesData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllEmployees();
    }, []);

    const handleAddEmployee = async (newEmployeeData) => {
        try {
            newEmployeeData.employeeId = condenseClientInfo._id;
            const { data } = await addEmployee(newEmployeeData);
            setEmployeesData(prevEmployeesData => [...prevEmployeesData, { ...data }]);
            return false;
        } catch (error) {
            console.log(error);
            const { response } = error;
            return response?.data?.message;
        }
    };

    const handleRemoveAccess = async (employeeId) => {
        try {
            await removeEmployeeAccess({ employeeId });
            setEmployeesData(prevEmployeesData => prevEmployeesData.filter((employee) => employee._id !== employeeId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
                {condenseClientInfo.role === 'superAdmin'
                    &&
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        <Plus size={20} />
                        Add New Employee
                    </button>
                }
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 ">
                    <EmployeeTable
                        employeesData={employeesData}
                        onRemoveAccess={handleRemoveAccess}
                    />
                </div>
            </div>

            {showForm && (
                <EmployeeForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleAddEmployee}
                />
            )}
        </div>
    );
}

export default EmployeeManagement;