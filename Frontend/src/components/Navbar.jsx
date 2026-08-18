import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-slate-900 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="font-bold text-xl text-slate-900">TaskFlow</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">Home</a>
            <a href="#tasks" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">Tasks</a>
            <a href="#stats" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">Analytics</a>
            <a href="#settings" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">Settings</a>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-slate-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-md transition-shadow">
              A
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200">
            <a href="#home" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded transition-colors">Home</a>
            <a href="#tasks" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded transition-colors">Tasks</a>
            <a href="#stats" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded transition-colors">Analytics</a>
            <a href="#settings" className="block px-4 py-2 text-slate-700 hover:bg-slate-100 rounded transition-colors">Settings</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
