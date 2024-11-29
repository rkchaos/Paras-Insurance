import React from 'react';

const Button = ({ label, onClickFunction }) => {
  return (
    <button
      onClick={onClickFunction}
      className='px-4 py-1 font-semibold text-lg rounded-md text-gray-900 bg-white border-white hover:bg-white hover:opacity-95'
    >
      {label}
    </button>
  );
};

export { Button };
