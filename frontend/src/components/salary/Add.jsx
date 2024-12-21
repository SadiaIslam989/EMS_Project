import React, { useEffect, useState } from 'react';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [salary, setSalary] = useState({ 
        employeeId: '',
        basicSalary: '', 
        allowances: '',  
        deductions: '',  
        payDate: new Date().toISOString().split('T')[0],
    });
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // Fetch departments on mount
    useEffect(() => {
        const getDepartments = async () => {
            const fetchedDepartments = await fetchDepartments();
            setDepartments(fetchedDepartments || []);
        };
        getDepartments();
    }, []);

    // Fetch employees by department
    const handleDepartment = async (e) => {
        const departmentId = e.target.value;
        const fetchedEmployees = await getEmployees(departmentId);
        setEmployees(fetchedEmployees || []);
    };

    // Update salary state with validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prev) => ({
            ...prev,
            [name]: ['basicSalary', 'allowances', 'deductions'].includes(name)
                ? value === '' ? '' : Math.max(0, Number(value)) // Prevent negative values and handle empty inputs
                : value,
        }));
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:3000/api/salary/add`, 
                salary, {
                headers:  {Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            if (response.data.success) {
                navigate("/admin-dashboard/employees"  );
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {departments.length ? (
                <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Department</label>
                                <select 
                                    name="department" 
                                    onChange={handleDepartment}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dep) => (
                                        <option key={dep._id} value={dep._id}>
                                            {dep.dep_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Employee */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Employee</label>
                                <select 
                                    name="employeeId" 
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {employees.map((emp) => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.employeeId}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Basic Salary */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
                                <input 
                                    type="number" 
                                    name="basicSalary"
                                    value={salary.basicSalary}
                                    onChange={handleChange}
                                    placeholder="Basic Salary"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                    step="0.01" 
                                    min="0"    
                                />
                            </div>

                            {/* Allowances */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Allowances</label>
                                <input 
                                    type="number"
                                    name="allowances"
                                    value={salary.allowances}
                                    onChange={handleChange}
                                    placeholder="Allowances"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                    step="0.01"
                                    min="0"    
                                />
                            </div>

                            {/* Deductions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deductions</label>
                                <input 
                                    type="number"
                                    name="deductions"
                                    value={salary.deductions}
                                    onChange={handleChange}
                                    placeholder="Deductions"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                    step="0.01" 
                                    min="0"   
                                />
                            </div>

                            {/* Pay Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                                <input 
                                    type="date"
                                    name="payDate" 
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Add Salary
                        </button>
                    </form>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default Add;
