import React from 'react';

function HeroSection() {
  const quickStats = [
    { label: 'Focus', value: '14 tasks' },
    { label: 'Today', value: '3 wins' },
    { label: 'Momentum', value: '92%' },
  ];

  return (
    <div id="home" className="pt-8 pb-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.28)]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-12 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"></div>
          <div className="absolute -bottom-16 left-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.2),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.18),transparent_35%)]"></div>
        </div>

        <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:py-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 backdrop-blur-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]"></div>
                <span className="text-sm font-semibold text-cyan-100">Welcome back!</span>
              </div>

              <h1 className="mb-5 text-4xl font-black leading-[1.05] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
                Stay Organized,
                <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 bg-clip-text text-transparent">
                  Get Things Done
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                Manage your tasks efficiently with TaskFlow. Stay focused, surface your next priority, and move your work forward with clarity.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#tasks"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-6 py-3.5 text-base font-bold text-slate-950 shadow-[0_18px_40px_rgba(34,211,238,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400"
                >
                  Get Started
                </a>
                <a
                  href="#stats"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  View Insights
                </a>
              </div>
            </div>

            <div className="grid w-full max-w-md gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-[0_12px_30px_rgba(15,23,42,0.2)]"
                >
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-300">{item.label}</p>
                  <p className="mt-3 text-xl font-black text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
