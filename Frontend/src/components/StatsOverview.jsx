import React from 'react';

function StatsOverview({ tasks }) {
  const isTaskCompleted = (task) => {
    if (typeof task.completed === 'boolean') {
      return task.completed;
    }
    return (task.status || '').toLowerCase() === 'completed';
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(isTaskCompleted).length;
  const inProgressTasks = tasks.filter((task) => !isTaskCompleted(task)).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: '01',
      color: 'from-teal-700 to-teal-500',
      bgColor: 'bg-teal-50',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: '02',
      color: 'from-amber-700 to-yellow-500',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: '03',
      color: 'from-emerald-700 to-green-500',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: '04',
      color: 'from-sky-700 to-cyan-500',
      bgColor: 'bg-sky-50',
    },
  ];

  return (
    <div id="stats" className="py-12">
      <div className="mb-8">
        <div className="hero-kicker mb-4">Overview</div>
        <h2 className="mb-2 text-3xl font-black text-slate-900 md:text-4xl">Your Progress</h2>
        <p className="text-lg text-slate-600">Track your productivity and stay motivated.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-panel group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor} text-sm font-black tracking-[0.16em] text-slate-700 transition-transform duration-300 group-hover:scale-110`}>
              {stat.icon}
            </div>

            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{stat.label}</p>
              <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-4xl font-black text-transparent`}>
                {stat.value}
              </div>
            </div>

            {stat.label === 'Completion Rate' && (
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`}
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsOverview;
