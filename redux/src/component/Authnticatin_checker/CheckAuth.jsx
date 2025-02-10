import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({isAuth,user,children}) => {

const location=useLocation();

if(!isAuth && !(location.pathname.includes('/login') || location.pathname.includes('/signup'))){

     return <Navigate to='/auth/login'/>
}

if(isAuth && (location.pathname.includes('/login') || location.pathname.includes('/signup'))){

     if(user?.role==="Admin"){

         return <Navigate to='/admin/admin_dashboard'/>
     }else{
         return <Navigate to='/shop/home'/>

     }
}
     if(isAuth && user?.role!=="Admin" && location.pathname.includes('/admin')){
          return <Navigate to='/shop/shopping_dashboard'/>
     }
     if(isAuth && user?.role==="Admin" && location.pathname.includes('/shop')){
        return  <Navigate to='/admin/admin_dashboard'/>
     }
  return (
    <div>
{children}
    </div>
  )
}

export default CheckAuth