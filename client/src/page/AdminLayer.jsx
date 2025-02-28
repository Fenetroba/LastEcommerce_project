import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Admin_view/Header'
import Sider from '../component/Admin_view/Sider'
import Layer from '../component/Admin_view/Layer'

const AdminLayer = () => {
  return (
    <div>
      <Header/>
      <Sider/>
      <Layer/>
      <Outlet/>
    </div>
  )
}

export default AdminLayer