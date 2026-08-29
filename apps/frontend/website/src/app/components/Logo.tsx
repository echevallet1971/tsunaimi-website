import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo-full.png"
        alt="TsunAImi Logo"
        width={100}
        height={40}
        priority
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
        }}
      />
    </div>
  );
}
