
import React from 'react';

interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actionIcon?: React.ReactNode;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, children, className = '', actionIcon }) => {
  return (
    <div className={`bg-black/50 border border-white/10 rounded-xl p-4 backdrop-blur-xl shadow-lg ${className}`}>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-300 tracking-wider">{title}</h3>
        {actionIcon && <div className="text-gray-500">{actionIcon}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default WidgetCard;