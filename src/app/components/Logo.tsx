import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'symbol' | 'full';
}

export default function Logo({ className = "", variant = 'symbol' }: LogoProps) {
  const logoConfig = {
    symbol: {
      src: '/logo-symbol.png',
      width: 150,
      height: 60,
    },
    full: {
      src: '/logo-full.png',
      width: 200,
      height: 80,
    },
  };

  const config = logoConfig[variant];

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={config.src}
        alt="TsunAImi Logo"
        width={config.width}
        height={config.height}
        loading="eager"
        style={{ 
          objectFit: 'contain',
          width: variant === 'symbol' ? '40px' : '160px',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: variant === 'symbol' ? '40px' : '60px'
        }}
      />
    </div>
  );
} 