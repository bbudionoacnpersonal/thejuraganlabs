import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  onChange?: (value: string | string[]) => void;
  fullWidth?: boolean;
  selectClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  isMulti?: boolean;
  value?: string | string[];
  id?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  helperText,
  error,
  onChange,
  fullWidth = true,
  className = '',
  selectClassName = '',
  size = 'md',
  isMulti = false,
  id,
  value,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseSelectClasses = `
    w-full block rounded-md
    bg-dark-400 text-white
    border border-dark-border
    disabled:opacity-50 disabled:cursor-not-allowed
    appearance-none
  `;

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2',
    lg: 'px-7 py-3 text-lg'
  };
  
  const errorClasses = error 
    ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
    : '';
    
  const widthClass = fullWidth ? 'w-full' : '';
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      if (isMulti) {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        onChange(selectedOptions);
      } else {
        onChange(e.target.value);
      }
    }
  };
  
  return (
    <div className={`${widthClass} ${className} relative`}>
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          className={`${baseSelectClasses} ${errorClasses} ${sizeClasses[size]} ${selectClassName}`}
          onChange={handleChange}
          value={value}
          multiple={isMulti}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error 
              ? `${selectId}-error` 
              : helperText 
                ? `${selectId}-helper` 
                : undefined
          }
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-dark-400 text-white py-1"
            >
              {option.label}
            </option>
          ))}
        </select>
        
      </div>
      
      {helperText && !error && (
        <p 
          id={`${selectId}-helper`} 
          className="mt-1 text-sm text-gray-400"
        >
          {helperText}
        </p>
      )}
      
      {error && (
        <p 
          id={`${selectId}-error`} 
          className="mt-1 text-sm text-error-500"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;