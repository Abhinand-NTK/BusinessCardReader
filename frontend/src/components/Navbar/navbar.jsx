
  
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      navigate("/");
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  return (
    <nav className="border-b border-gray-200 shadow-md bg-gray-100 h-auto md:h-20 p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center">
          <button onClick={toggleMenu} className="md:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <img src="https://i.pinimg.com/564x/e6/42/af/e642af096cd822f80e1616edb04363af.jpg" alt="Logo" className="h-10 md:h-14 w-auto" />
          <h1 className="hidden md:block text-lg font-mono cursor-pointer md:text-base lg:text-lg xl:text-xl 2xl:text-2xl px-6 hover:underline">
            Business Card Manager
          </h1>
        </div>
        <div className="md:hidden">
          <h1 className="text-lg font-mono cursor-pointer md:text-base lg:text-lg xl:text-xl 2xl:text-2xl px-6 hover:underline">
            Business Card Manager
          </h1>
        </div>
      </div>
      <div className={`md:flex flex-col md:flex-row items-center justify-center md:justify-end flex-grow mt-4 md:mt-0 ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="md:flex flex-col md:flex-row items-center justify-center list-none md:ml-auto">
          <li className="text-lg font-mono cursor-pointer md:text-base lg:text-lg xl:text-xl 2xl:text-2xl px-6 hover:underline mb-2 md:mb-0">
            <Link to="/dashboard">Home</Link>
          </li>
          <li className="text-lg font-mono cursor-pointer md:text-base lg:text-lg xl:text-xl 2xl:text-2xl px-6 hover:underline mb-2 md:mb-0">
            <Link to="/manage-cards">Business Information</Link>
          </li>
          <li>
            <button onClick={logout} className="text-lg font-mono cursor-pointer md:text-base lg:text-lg xl:text-xl 2xl:text-2xl bg-green-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 md:ml-0">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
