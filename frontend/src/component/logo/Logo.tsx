import React from 'react';
import './Logo.css';

interface LogoProps {
  variant?: 'default' | 'white' | 'dark';
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', size = 'medium' }) => {
  const getLogoColors = () => {
    switch (variant) {
      case 'white':
        return { primary: '#ffffff', secondary: '#f8f9fa' };
      case 'dark':
        return { primary: '#2F4F4F', secondary: '#DC143C' };
      default:
        return { primary: '#DC143C', secondary: '#2F4F4F' };
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'logo-small';
      case 'large': return 'logo-large';
      default: return 'logo-medium';
    }
  };

  const colors = getLogoColors();

  return (
    <div className={`logo-container ${getSizeClass()}`}>
      <svg
        viewBox="0 0 150 50"
        className="logo-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brand text */}
        <g className="logo-text">
          {/* "Easy" */}
          <text
            x="10"
            y="25"
            className="logo-easy"
            fill={colors.primary}
            fontSize="22"
            fontWeight="700"
            fontFamily="'Helvetica', 'Arial', sans-serif"
          >
            Easy
          </text>
          
          {/* "Shop" */}
          <text
            x="70"
            y="25"
            className="logo-shop"
            fill={colors.secondary}
            fontSize="22"
            fontWeight="700"
            fontFamily="'Helvetica', 'Arial', sans-serif"
          >
            Shop
          </text>
          
          {/* Tagline */}
          <text
            x="10"
            y="40"
            className="logo-tagline"
            fill={colors.secondary}
            fontSize="8"
            fontWeight="400"
            fontFamily="'Helvetica', 'Arial', sans-serif"
            opacity="0.8"
          >
            Premium Home Décor
          </text>
        </g>

        {/* Decorative underline */}
        <line
          x1="10"
          y1="30"
          x2="130"
          y2="30"
          stroke={colors.primary}
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default Logo;
