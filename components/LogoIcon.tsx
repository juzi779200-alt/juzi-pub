import React from 'react';

const LogoIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* 盒子主体 */}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      {/* 盒子盖子 */}
      <rect x="3" y="3" width="18" height="6" rx="2" />
      {/* 盒子上的装饰 */}
      <circle cx="8" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="16" cy="12" r="1" />
      {/* 盒子上的幸运星 */}
      <path d="M12 8l1.5 3 3.5 0.5-2.5 2 0.5 3.5-3-1.5-3 1.5 0.5-3.5-2.5-2 3.5-0.5z" />
    </svg>
  );
};

export default LogoIcon;