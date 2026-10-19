import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  whiteOnly?: boolean;
  showText?: boolean;
}

export default function Logo({
  className = '',
  size = 'md',
  whiteOnly = false,
  showText = true,
}: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
  };

  const textColor = whiteOnly ? 'text-white' : 'text-zinc-950';

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Dynamic Futuristic Sneaker / Speed Emblem */}
      <div
        className={`${
          whiteOnly ? 'bg-white text-zinc-950' : 'bg-zinc-950 text-white'
        } rounded-xl p-1.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs`}
      >
        <svg
          className={iconSizes[size]}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Aerodynamic Sneaker Sole & Upper */}
          <path
            d="M4 22C7 22 9.5 21 12 19.5L18.5 15.2C21 13.8 24 13.2 26.5 14.2L28.8 15.3C29.4 15.6 29.6 16.2 29.4 16.8C28.9 18.2 27.5 19.7 25 20.6C21.2 21.9 15.8 22.8 10 22.8C6.8 22.8 4.8 22.4 4 22Z"
            fill="currentColor"
          />
          <path
            d="M9 18.5L12.8 9.5C13.2 8.5 14.2 8 15.3 8H19.5C20.3 8 21 8.5 21.3 9.2L23.8 14.2C21.2 13.2 18.2 13.8 15.8 15.2L9 18.5Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <circle cx="26" cy="8.5" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-black uppercase tracking-tighter leading-none ${textSizes[size]} ${textColor}`}>
            HYPE<span className={whiteOnly ? 'text-zinc-400' : 'text-zinc-500'}>KICKS</span>
          </span>
          {size === 'lg' && (
            <span className={`text-[10px] tracking-widest uppercase font-semibold mt-1 ${whiteOnly ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Step Into the Future
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
