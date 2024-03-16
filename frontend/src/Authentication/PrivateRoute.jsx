
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ element: Element, auth, ...rest }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);



  if (loading) {
    return <Loading />;
  }

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
