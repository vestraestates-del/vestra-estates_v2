import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 bg-gray-800 border-gray-600 rounded text-cyan-500 focus:ring-cyan-500"
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;