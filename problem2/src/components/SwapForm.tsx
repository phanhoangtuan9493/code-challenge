import TokenSelector from './TokenSelectorDialog';
import { useSwapForm } from '../hooks/useSwapForm';

export default function SwapForm() {
  const {
    tokens,
    isLoadingTokens,
    fetchError,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    fromTokenBalance,
    toTokenBalance,
    isLoading,
    error,
    successMessage,
    exchangeRate,
    setFromToken,
    setToToken,
    handleFromAmountChange,
    handlePercentageClick,
    handleSwapTokens,
    handleSubmit,
  } = useSwapForm();

  // Show loading state
  if (isLoadingTokens) {
    return (
      <div className="glass rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 glow-effect">
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 gap-3 sm:gap-4">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-4 border-purple-900/30 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <p className="text-slate-300 mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg font-medium">Loading tokens...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (fetchError) {
    return (
      <div className="glass rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center gap-3 sm:gap-4 flex flex-col">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-300 text-sm sm:text-base lg:text-lg font-semibold break-words">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white rounded-lg sm:rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-red-500/50 active:scale-95 text-sm sm:text-base"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="glass rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl glow-effect gap-3 sm:gap-4 flex flex-col p-3 sm:p-5 md:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="gap-4 sm:gap-5 lg:gap-6 flex flex-col">
          {/* From Section */}
          <div className="flex justify-between items-center">
            <div className="text-slate-400">
              {fromToken && (
                <span className="text-xs sm:text-sm">
                  Balance: <span className="text-purple-300 font-bold">{fromTokenBalance} {fromToken}</span>
                </span>
              )}
            </div>
          </div>
          <div className="bg-slate-900/60 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-slate-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">You pay</span>
              {fromToken && (
                <div className="block sm:hidden">
                  <TokenSelector
                    tokens={tokens}
                    selectedToken={fromToken}
                    onSelectToken={setFromToken}
                    filterByBalance={true}
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black outline-none placeholder-slate-700 min-w-0"
              />
              {fromToken && (
                <div className="hidden sm:block">
                  <TokenSelector
                    tokens={tokens}
                    selectedToken={fromToken}
                    onSelectToken={setFromToken}
                    filterByBalance={true}
                  />
                </div>
              )}
            </div>

            {/* Percentage Buttons */}
            <div className="flex gap-1.5 sm:gap-2">
              {[15, 25, 50, 75, 100].map((percentage) => (
                <button
                  key={percentage}
                  type="button"
                  onClick={() => handlePercentageClick(percentage)}
                  className="flex-1 px-1.5 sm:px-2 py-1.5 sm:py-2 bg-purple-900/30 hover:bg-purple-700/50 active:bg-purple-600/50 text-purple-200 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-200 border border-purple-500/30 hover:border-purple-500/60 hover:scale-105 active:scale-95"
                >
                  {percentage}%
                </button>
              ))}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-1.5 sm:-my-2 lg:-my-3 relative z-10">
            <button
              type="button"
              onClick={handleSwapTokens}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 p-2 sm:p-2.5 lg:p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-180 shadow-lg shadow-purple-500/50 active:scale-95 border-2 sm:border-3 lg:border-4 border-slate-900"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>


          <div className="flex justify-between items-center">
            <div className="text-slate-400">
              {toToken && (
                <span className="text-xs sm:text-sm">
                  Balance: <span className="text-pink-300 font-bold">{toTokenBalance} {toToken}</span>
                </span>
              )}
            </div>
          </div>

          {/* To Section */}
          <div className="bg-slate-900/60 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 mb-2 sm:mb-3">
            <div className="flex justify-between items-center mb-2 sm:mb-3 flex-wrap gap-1.5 sm:gap-2">
              <span className="text-slate-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">You receive</span>
              {toToken && (
                <div className="block sm:hidden">
                  <TokenSelector
                    tokens={tokens}
                    selectedToken={toToken}
                    onSelectToken={setToToken}
                  />
                </div>
              )}
              {toAmount && parseFloat(toAmount) > 0 && (
                <span className="text-slate-400 text-[10px] sm:text-xs bg-slate-800/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-slate-700/50 w-full sm:w-auto text-center sm:text-left mt-1 sm:mt-0">
                  Min: <span className="text-pink-300 font-bold">{(parseFloat(toAmount) * 0.995).toFixed(6)}</span>
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="flex-1 bg-transparent text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black outline-none placeholder-slate-700 min-w-0"
              />
              {toToken && (
                <div className="hidden sm:block">
                  <TokenSelector
                    tokens={tokens}
                    selectedToken={toToken}
                    onSelectToken={setToToken}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Exchange Rate */}
          {fromToken && toToken && exchangeRate > 0 && (
            <div className="text-center bg-slate-800/40 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-purple-500/20">
              <div className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Exchange Rate</div>
              <div className="text-white text-sm sm:text-base font-bold break-all">
                1 {fromToken} = <span className="text-purple-400">{exchangeRate.toFixed(8)}</span> {toToken}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg sm:rounded-xl text-red-300 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 slide-up shadow-lg shadow-red-500/20">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="flex-1 font-medium break-words">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-lg sm:rounded-xl text-green-300 text-xs sm:text-sm flex items-center gap-2 sm:gap-3 slide-up shadow-lg shadow-green-500/20">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="flex-1 font-medium break-words">{successMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !fromAmount || parseFloat(fromAmount) <= 0}
            className={`
              w-full py-3 sm:py-3.5 lg:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all duration-300 btn-primary relative overflow-hidden
              ${isLoading || !fromAmount || parseFloat(fromAmount) <= 0
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 active:scale-[0.97] border-2 border-purple-400/50'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="hidden sm:inline">Processing Swap...</span>
                <span className="sm:hidden">Processing...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Swap Now
              </span>
            )}
          </button>
        </form>
      </div>
  );
}

