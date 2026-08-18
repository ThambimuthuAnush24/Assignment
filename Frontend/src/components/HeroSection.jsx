import React from 'react';

function HeroSection() {
  return (
    <div id="home" className="pt-8 pb-12">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-800">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-sm font-medium text-cyan-200">Welcome back!</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Stay Organized,
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Get Things Done
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
              Manage your tasks efficiently with TaskFlow. Stay focused, track progress, and achieve your goals with ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 shadow-lg">
                Get Started
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
