import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuth, user, children }) => {
  const location = useLocation();

  // If not authenticated and trying to access a protected route
  if (!isAuth && !(location.pathname.includes('/login') || location.pathname.includes('/signup'))) {
    return <Navigate to='/auth/login' />;
  }

  // If authenticated but trying to access login or signup
  if (isAuth && (location.pathname.includes('/login') || location.pathname.includes('/signup'))) {
    return user?.role === "Admin" ? (
      <Navigate to='/admin/admin_dashboard' />
    ) : (
      <Navigate to='/shop/home' />
    );
  }

  // If authenticated and accessing admin routes without admin role
  if (isAuth && user?.role !== "Admin" && location.pathname.includes('admin')) {
    return <Navigate to='/shop/shopping_dashboard' />;
  }

  // If authenticated with admin role and accessing shop routes
  if (isAuth && user?.role === "Admin" && location.pathname.includes('shop')) {
    return <Navigate to='/admin/admin_dashboard' />;
  }

  // If none of the above conditions are met, render children
  return <div>{children}</div>;
};

export default CheckAuth;