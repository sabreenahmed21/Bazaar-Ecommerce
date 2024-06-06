import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentAdmin } from './redux/AdminSlice';

const ProtectedRoute = ({ element }) => {
  const CurrentAdmin = useSelector(selectCurrentAdmin);
  const token = CurrentAdmin?.token

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;