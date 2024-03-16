

import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="border- rounded-full w-16 h-16 border-t-8 border-red-500 animate-spin"></div>
    </div>
  );
};

export default Loading;
