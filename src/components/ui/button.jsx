
import React from 'react';
import clsx from 'clsx';

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
