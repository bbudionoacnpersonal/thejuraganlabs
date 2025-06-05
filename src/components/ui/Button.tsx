import React from 'react';
// Import HTMLMotionProps for correct typing with motion components
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

// --- CORRECTED ButtonProps ---
// Directly extend HTMLMotionProps<'button'>.
// This ensures that all props, including event handlers like onAnimationStart,
// conform to what motion.button expects.
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  // `children` is part of HTMLMotionProps
  // `className` is part of HTMLMotionProps
  // `disabled` is part of HTMLMotionProps
  // `onAnimationStart` (Framer Motion's version) is part of HTMLMotionProps
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className, // User-provided className to be merged
  disabled,
  // Motion specific props like whileHover/whileTap are explicitly handled
  // or can be passed via restProps if not explicitly handled.
  whileHover,
  whileTap,
  // All other props, including onAnimationStart (if provided by the user of this Button),
  // will be in restProps. Since ButtonProps extends HTMLMotionProps<'button'>,
  // onAnimationStart in restProps will have the Framer Motion compatible type.
  ...restProps 
}, ref) => {
const baseClasses = 'font-medium rounded-md transition-all duration-200 flex flex-row items-center justify-center focus:outline-none focus:ring-1 focus:ring-offset-1 text-white';

  const variantClasses = {
    primary: 'bg-primary-400 hover:bg-primary-500 focus:ring-primary-400',
    secondary: 'bg-secondary-600 hover:bg-secondary-600 focus:ring-secondary-600',
    accent: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
    ghost: 'bg-transparent hover:bg-gray-700/50 text-white focus:ring-gray-500',
    danger: 'bg-error-500 hover:bg-error-600 focus:ring-error-500',
  };
  
  const sizeClasses = {
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-2 py-1',
    lg: 'text-lg px-4 py-2',
  };
  
  const actualDisabled = disabled || isLoading;
  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClassName = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${actualDisabled ? disabledClasses : ''}
    ${widthClass}
    ${className || ''} 
  `.replace(/\s+/g, ' ').trim();

  const defaultWhileHover = { scale: actualDisabled ? 1 : 1.02 };
  const defaultWhileTap = { scale: actualDisabled ? 1 : 0.98 };

  return (
    // Line 74 (approximately): The props spread here should now be fully compatible.
    <motion.button
      ref={ref}
      whileHover={whileHover ?? defaultWhileHover}
      whileTap={whileTap ?? defaultWhileTap}
      className={combinedClassName}
      disabled={actualDisabled}
      {...restProps} // This spread includes onAnimationStart if provided, now correctly typed.
    >
      {isLoading && (
        // Corrected SVG attribute syntax (removed backslashes)
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
      {/* Using motion.span for children to handle potential MotionValue children */}
      <motion.span>{children}</motion.span> 
      {!isLoading && rightIcon && <span className="ml-2  inline-flex">{rightIcon}</span>}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
