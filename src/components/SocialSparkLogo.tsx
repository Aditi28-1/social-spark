import React from 'react';

interface SocialSparkLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  className?: string;
}

export const SocialSparkLogo: React.FC<SocialSparkLogoProps> = ({
  variant = 'light',
  size = 'md',
  iconOnly = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const gradId = React.useId();

  return (
    <span className={`inline-flex items-center gap-2.5 select-none whitespace-nowrap shrink-0 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} shrink-0`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7B2FF7" />
            <stop offset="100%" stopColor="#FF7A30" />
          </linearGradient>
        </defs>
        <rect
          width="40"
          height="40"
          rx="11"
          fill={variant === 'dark' ? '#20203E' : '#15152B'}
        />
        <path
          d="M20 7.5C20.9 14.9 25.1 19.1 32.5 20C25.1 20.9 20.9 25.1 20 32.5C19.1 25.1 14.9 20.9 7.5 20C14.9 19.1 19.1 14.9 20 7.5Z"
          fill={`url(#${gradId})`}
        />
        <circle cx="29.5" cy="10.5" r="2.2" fill="#FF7A30" />
      </svg>

      {!iconOnly && (
        <span
          className={`font-display font-bold tracking-tight leading-none ${textSizes[size]} ${
            variant === 'dark' ? 'text-white' : 'text-[#15152B]'
          }`}
        >
          Social<span className="spark-gradient-text">Spark</span>
        </span>
      )}
    </span>
  );
};
