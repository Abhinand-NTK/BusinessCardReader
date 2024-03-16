import React from 'react';


const Modal = ({ isOpen, onClose, onConfirm,action }) => {

  if (!isOpen) return null;



  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white w-1/2 p-8 rounded shadow-lg">
          <div className="absolute top-0 right-0">
            <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <p className="mb-4">Are you sure you want to {action} this item?</p>
          <div className="flex justify-end">
            <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={onConfirm}>Confirm</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
