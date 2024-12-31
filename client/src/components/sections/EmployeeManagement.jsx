import React, { useContext, useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import EmployeeTable from './employees/EmployeeTable';
import EmployeeForm from './employees/EmployeeForm';
import { addEmployee, fetchAllEmployees } from '../../api';
import { ClientContext } from '../../contexts/Client.context';

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
        // setEmployees(prev => [...prev, { ...newEmployee, id: prev.length + 1 }]);
        try {
            const copyNewEmployeeData = structuredClone(newEmployeeData);
            newEmployeeData.employeeId = condenseClientInfo._id;
            const { data } = await addEmployee(newEmployeeData);
            console.log(data);
            setEmployeesData(prevEmployeesData => [...prevEmployeesData, { ...copyNewEmployeeData }]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Add New Employee
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 ">
                    <EmployeeTable employeesData={employeesData} />
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