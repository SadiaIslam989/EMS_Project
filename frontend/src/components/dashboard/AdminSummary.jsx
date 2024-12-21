import React from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the bar chart
const leaveData = [
  { name: 'Applied', value: 6 },
  { name: 'Approved', value: 2 },
  { name: 'Pending', value: 3 },
  { name: 'Rejected', value: 1 },
];

const AdminSummary = () => {
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={13} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Department" number={5} color="bg-indigo-600" />
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number="$550" color="bg-orange-600 p-4" />
      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={6} color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={2} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={3} color="bg-pink-600" />
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={1} color="bg-red-600" />
        </div>

        {/* Graph Section */}
        <div className='mt-12'>
          <h4 className='text-center text-2xl font-bold mb-4'>Leave Statistics</h4>
          <div className='w-full h-64'>
            <ResponsiveContainer>
              <BarChart data={leaveData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
