import React from 'react'

import Sidebar from '../components/EmployeeDashboard/Sidebar'

const EmployeeDashboard = () => {
  return (
    <div className='flex'> 
    <Sidebar/>
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
      <Navbar/>
      <Outlet/>
    </div>
  </div >
  )
}


export default EmployeeDashboard