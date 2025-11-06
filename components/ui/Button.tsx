import React from 'react';

// FIX: Replaced the faulty polymorphic type definitions with a standard, robust pattern.
// This new definition correctly infers props and resolves the cascading 'children' prop errors
// and the "no construct or call signatures" error.
type ButtonOwnProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

type ButtonProps<C extends React.ElementType> = {
  as?: C;
} & ButtonOwnProps & Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonOwnProps | 'as'>;

const Button = <C extends React.ElementType = 'button'>(
  {
    children,
    variant = 'primary',
    size = 'md',
    className,
    as,
    ...rest
  }: React.PropsWithChildren<ButtonProps<C>>
) => {
  const Component = as || 'button';
  
  const baseClasses = 'font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-300 focus:ring-cyan-500 border border-gray-600',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;

  return (
    <Component className={combinedClasses} {...rest}>
      {children}
    </Component>
  );
};

export default Button;
