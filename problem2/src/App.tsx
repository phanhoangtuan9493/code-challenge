import SwapForm from './components/SwapForm';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-96 sm:h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 fade-in gap-2 sm:gap-3 flex flex-col w-full max-w-md relative z-10 px-2">
        <h1 className="text-2xl sm:text-5xl md:text-5xl lg:text-5xl font-black leading-tight">
          <span className="gradient-text">Currency Swap</span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm md:text-base lg:text-lg font-medium px-2">
          Trade tokens instantly with <span className="text-purple-400 font-bold">zero hassle</span>
        </p>
      </div>

      {/* Swap Form */}
      <div className="fade-in w-full max-w-5xl relative z-10">
        <SwapForm />
      </div>
    </div>
  );
}

export default App;
