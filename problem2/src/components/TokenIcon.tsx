import { useState } from 'react';
import { getTokenIconUrl } from '../api/tokenService';

interface TokenIconProps {
  currency: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function TokenIcon({ currency }: TokenIconProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg border-2 border-white/10`}>
      {!imageError ? (
        <img
          src={getTokenIconUrl(currency)}
          alt={currency}
          className={`w-full h-full rounded-full object-cover`}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-white font-black text-sm sm:text-base lg:text-lg">
          {currency.charAt(0)}
        </span>
      )}
    </div>
  );
}

