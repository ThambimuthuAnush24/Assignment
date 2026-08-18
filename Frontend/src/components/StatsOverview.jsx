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
  const inProgressTasks = tasks.filter(task => !isTaskCompleted(task)).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: '📋',
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: '⚡',
      color: 'from-yellow-600 to-orange-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: '✅',
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: '📈',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div id="stats" className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Your Progress</h2>
        <p className="text-slate-600 text-lg">Track your productivity and stay motivated</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass-panel rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
          >
            {/* Icon Background */}
            <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>

            {/* Stats Content */}
            <div className="mb-4">
              <p className="text-sm text-slate-600 font-semibold uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent text-4xl font-black`}>
                {stat.value}
              </div>
            </div>

            {/* Progress Bar */}
            {stat.label === 'Completion Rate' && (
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${stat.color} h-full rounded-full transition-all duration-1000`}
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
