import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  whiteOnly?: boolean;
}

export default function Logo({ className = '', size = 'md', whiteOnly = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg tracking-tighter',
    md: 'text-2xl tracking-tighter',
    lg: 'text-3xl tracking-tighter',
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2 group ${className}`}>
      {/* Original SPORTIX Aerodynamic Wing Crest */}
      <svg
        className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 26C14 26 23 18 36 6C26 12 18 16 4 19V26Z"
          fill={whiteOnly ? '#FFFFFF' : 'currentColor'}
        />
        <path
          d="M7 32C17 32 26 25 38 14C28 20 20 23 7 26V32Z"
          fill={whiteOnly ? '#E2FD52' : '#E02424'}
        />
      </svg>
      <span
        className={`font-black uppercase italic ${textSizes[size]} ${
          whiteOnly ? 'text-white' : 'text-zinc-950 dark:text-white'
        }`}
      >
        SPORTIX
      </span>
    </Link>
  );
}
