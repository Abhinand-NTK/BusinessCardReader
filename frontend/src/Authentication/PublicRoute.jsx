
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

const PublicRoute = ({ element: Element, auth, location, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (auth && isAuthenticated) {
    return <Navigate to={location} replace />;
  }

  return <Element {...rest} />;
};

export default PublicRoute;
