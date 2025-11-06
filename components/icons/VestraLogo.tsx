import React from 'react';

export interface LogoConfig {
  url?: string;
  text?: string;
  type: 'image' | 'video' | 'text';
  navSize?: number;
  loginSize?: number;
  mobileNavSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontFamily?: string;
  textColor?: string;
}

interface VestraLogoProps {
    config: LogoConfig;
    size?: number;
    className?: string;
}

export const VestraLogo = ({ config, className, size }: VestraLogoProps) => {
  const style: React.CSSProperties = size ? { width: 'auto', height: `${size}px`, minWidth: `${size}px` } : {};
  
  let logoContent;
  const shimmerClass = 'animate-logo-shimmer';

  if (config.type === 'video' && config.url) {
    logoContent = (
      <video
        src={config.url}
        autoPlay
        loop
        muted
        playsInline
        style={style}
        className={`object-contain ${shimmerClass} ${className || ''}`}
      />
    );
  } else if (config.type === 'image' && config.url) {
    logoContent = (
      <img
        src={config.url}
        alt="VESTRA ESTATES Logo"
        style={style}
        className={`${shimmerClass} ${className || ''}`}
      />
    );
  } else if (config.type === 'text' && config.text) {
      const textStyle: React.CSSProperties = {
          height: size ? `${size}px` : 'auto',
          fontSize: size ? size / 2 : 22,
          lineHeight: 1,
          fontWeight: config.fontWeight || 'bold',
          fontFamily: config.fontFamily || 'sans-serif',
          color: config.textColor || 'inherit',
      };
      logoContent = (
          <div style={textStyle} className={`font-bold tracking-wider text-center inline-flex items-center justify-center ${shimmerClass} ${className || ''}`}>
              {config.text}
          </div>
      )
  } else {
    return null;
  }

  return logoContent;
};
