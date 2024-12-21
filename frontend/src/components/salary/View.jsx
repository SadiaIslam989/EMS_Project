import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    const { id } = useParams();

    const fetchSalaries = async () => { 
        try {
            const response = await axios.get(
               `http://localhost:3000/api/salary/${id}`, {
               headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`,
               },
            });

            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchSalaries(); 
    }, []); 

    const filterSalaries = (query) => {
        const filteredRecords = salaries.filter((salary) =>
            salary.employeeId.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <>
            {filteredSalaries === null ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center mb-5">
                        <h2 className="text-2xl font-bold text-gray-800">Salary History</h2>
                    </div>
                    <div className="flex justify-end mb-4">
                        <input 
                           type="text"
                           placeholder="Search by Employee ID"
                           className="border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
                           onChange={(e) => filterSalaries(e.target.value)}
                        />
                    </div>
                    {filteredSalaries.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-600 border border-gray-300 bg-white rounded-lg shadow">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border-b">S.No</th>
                                    <th className="px-6 py-3 border-b">Employee ID</th>
                                    <th className="px-6 py-3 border-b">Salary</th>
                                    <th className="px-6 py-3 border-b">Allowance</th>
                                    <th className="px-6 py-3 border-b">Deduction</th>
                                    <th className="px-6 py-3 border-b">Net Salary</th>
                                    <th className="px-6 py-3 border-b">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary, index) => (
                                    <tr
                                       key={salary.id}
                                       className={`${
                                           index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                       } hover:bg-gray-100`}
                                    >
                                        <td className="px-6 py-3 border-b text-gray-700">{index + 1}</td>
                                        <td className="px-6 py-3 border-b text-gray-700">{salary.employeeId.employeeId}</td>
                                        <td className="px-6 py-3 border-b text-gray-700">{salary.basicSalary}</td>
                                        <td className="px-6 py-3 border-b text-gray-700">{salary.allowances}</td>
                                        <td className="px-6 py-3 border-b text-gray-700">{salary.deductions}</td>
                                        <td className="px-6 py-3 border-b text-gray-700">{salary.netSalary}</td>
                                        <td className="px-6 py-3 border-b text-gray-700">
                                            {new Date(salary.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center text-gray-600">No Records Found</div>
                    )}
                </div>
            )}
        </>
    );
};

export default View;
