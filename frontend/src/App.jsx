

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationForm from "./Pages/Register/register";
import LoginForm from "./Pages/Login/login";
import Dashboard from "./Pages/Dashboard/dashboard";
import BusinessInformation from "./Pages/BusinessInformation/businessInfo";
import Loading from "./components/Loading/Loading";
import { useLoading } from "./context/LoadingContext";
import { setupInterceptors } from "./axiosConfig";
import PrivateRoute from "./Authentication/PrivateRoute";
import PublicRoute from "./Authentication/PublicRoute";

function App() {
  const loadingContext = useLoading();
  const isAuthenticated = !!localStorage.getItem('token');


 
  useEffect(() => {
    setupInterceptors(loadingContext);
  }, [loadingContext]);

  const { loading } = useLoading();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="sign-up/" element={<PublicRoute auth={isAuthenticated} element={RegistrationForm} location='/dashboard' />} />
          <Route path="/" element={<PublicRoute auth={isAuthenticated} element={LoginForm} location='/dashboard' />} />
          <Route path="/dashboard/" element={<PrivateRoute auth={isAuthenticated} element={Dashboard} />} />
          <Route path="manage-cards/" element={<PrivateRoute auth={isAuthenticated} element={BusinessInformation} />} />
        </Routes>
      </BrowserRouter>
      {loading && <Loading />}
    </>
  );
}

export default App;
