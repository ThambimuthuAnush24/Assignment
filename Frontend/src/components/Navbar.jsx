import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="flex items-center gap-3" aria-label="Go to home section">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-sky-600 to-slate-900 shadow-lg shadow-cyan-500/20">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-[-0.04em] text-slate-900">TaskFlow</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#home" className="font-medium text-slate-700 transition-colors hover:text-slate-900">Home</a>
            <a href="#tasks" className="font-medium text-slate-700 transition-colors hover:text-slate-900">Tasks</a>
            <a href="#stats" className="font-medium text-slate-700 transition-colors hover:text-slate-900">Analytics</a>
            <a href="#settings" className="font-medium text-slate-700 transition-colors hover:text-slate-900">Settings</a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100" aria-label="Notifications">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <a
              href="#tasks"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
            >
              New Task
            </a>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-slate-600 text-sm font-bold text-white shadow-md">
              A
            </div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100" aria-label="Notifications">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100"
              aria-label="Open menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-slate-200 pb-4 md:hidden">
            <a href="#home" className="block rounded px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100">Home</a>
            <a href="#tasks" className="block rounded px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100">Tasks</a>
            <a href="#stats" className="block rounded px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100">Analytics</a>
            <a href="#settings" className="block rounded px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100">Settings</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
