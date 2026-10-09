import type { Token } from '../types';
import TokenIcon from './TokenIcon';
import { useTokenSelector } from '../hooks/useTokenSelector';

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: string;
  onSelectToken: (currency: string) => void;
  disabled?: boolean;
  filterByBalance?: boolean;
}

export default function TokenSelector({
  tokens,
  selectedToken,
  onSelectToken,
  disabled = false,
  filterByBalance = false
}: TokenSelectorProps) {
  const {
    isOpen,
    searchTerm,
    selectedTokenData,
    filteredTokens,
    setSearchTerm,
    handleSelectToken,
    handleClose,
    handleOpen,
  } = useTokenSelector({ tokens, selectedToken, onSelectToken, filterByBalance });

  return (
    <>
      <button
        type="button"
        onClick={() => !disabled && handleOpen()}
        disabled={disabled}
        className={`
          flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl min-w-[90px] sm:min-w-[120px] lg:min-w-[140px]
          bg-slate-800/60 hover:bg-slate-700/60 transition-all duration-300
          border border-purple-500/30 hover:border-purple-500/60
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'}
          shadow-lg
        `}
      >
        {selectedTokenData && (
          <>
            <TokenIcon currency={selectedTokenData.currency} />
            <span className="text-white font-bold text-xs sm:text-sm lg:text-base flex-1 text-left truncate">
              {selectedTokenData.currency}
            </span>
          </>
        )}
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300 transition-transform duration-200 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 transition-opacity fade-in"
            onClick={handleClose}
          />
          
          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <div 
              className="glass rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] sm:max-h-[85vh] flex flex-col slide-up glow-effect"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 lg:p-5 border-b border-purple-500/20">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white gradient-text">Select Token</h2>
                <button
                  onClick={handleClose}
                  className="text-slate-400 hover:text-white transition-all p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-slate-700/50 active:scale-90"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search */}
              <div className="p-3 sm:p-4 lg:p-5 border-b border-purple-500/20">
                <div className="relative">
                  <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search token..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-900/60 border border-purple-500/30 rounded-lg sm:rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-all duration-200 text-sm sm:text-base"
                    autoFocus
                  />
                </div>
              </div>
              
              {/* Token List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredTokens.length > 0 ? (
                  filteredTokens.map((token) => (
                    <button
                      key={token.currency}
                      onClick={() => handleSelectToken(token.currency)}
                      className={`
                        w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-5 py-3 sm:py-3.5 lg:py-4 hover:bg-purple-500/10 transition-all duration-200 active:bg-purple-500/20
                        ${token.currency === selectedToken ? 'bg-purple-500/20 border-l-4 border-purple-500' : 'border-l-4 border-transparent'}
                      `}
                    >
                      <TokenIcon currency={token.currency} />
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-white font-bold text-sm sm:text-base truncate">{token.currency}</div>
                        <div className="text-slate-400 text-xs sm:text-sm truncate">${token.price.toFixed(6)}</div>
                      </div>
                      {token.currency === selectedToken && (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-3 sm:px-5 py-8 sm:py-12 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-slate-800/50 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-sm sm:text-base font-medium">No tokens found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

