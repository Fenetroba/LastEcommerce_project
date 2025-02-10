import React from 'react'
import {Outlet} from 'react-router-dom'
import './auth/Css/AuthLayer.css'
import logo from "../assets/Logo.png"
const AuthLayer = () => {
  return (
    <div className='Allconten'>
      
      <div  className='main_auth_contener'>
        Welcome To Ecommers Shopping
        <span className='goldeDecor'>
          <img src={logo} alt="Logo" />
        </span>
      </div>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default AuthLayer