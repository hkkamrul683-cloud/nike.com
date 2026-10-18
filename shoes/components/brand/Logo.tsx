import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  whiteOnly?: boolean;
}

export default function Logo({ className = '', size = 'md', whiteOnly = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      {/* Nike Swoosh SVG */}
      <svg
        className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}
        viewBox="0 0 120 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.967 43.378c-3.97.9-7.624-.05-9.742-2.584C2.9 38.03 2.9 33.51 5.17 28.7c1.9-4.07 5.014-7.99 8.623-11.09C8.05 23.668 5.68 30.97 8.03 35.98c.87 1.87 2.58 3.1 4.7 3.56l86.17-32.71c2.18-.826 3.57-2.37 3.86-4.16.23-1.43-.24-2.9-1.34-4.16-.016-.02-.033-.038-.05-.058C115.39 2.23 120 8.16 120 8.16L14.967 43.378Z"
          fill={whiteOnly ? '#FFFFFF' : '#111111'}
        />
      </svg>
    </Link>
  );
}
