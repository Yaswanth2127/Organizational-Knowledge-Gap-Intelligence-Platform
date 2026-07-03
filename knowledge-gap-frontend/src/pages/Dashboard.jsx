// import React from 'react';

// export default function Dashboard() {
//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h1>Employee Portal & Dashboard</h1>
//       <p>Welcome to the Organizational Knowledge Gap Intelligence Platform.</p>

//       <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
//         <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', flex: 1, background: '#f9f9f9' }}>
//           <h3>My Skill Profile</h3>
//           <p>Proficiency Level: Intermediate</p>
//         </div>
//         <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', flex: 1, background: '#f9f9f9' }}>
//           <h3>Recommended Learning</h3>
//           <p>No recommendations yet (Milestone 2 Task)</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Shield, Target, AlertTriangle, TrendingUp, Users, Award } from 'lucide-react';

const Dashboard = () => {
  // Analytical mocks matching schema metrics framework
  const metrics = [
    { title: 'My Core Skills Evaluated', value: '14', change: '+2 updated recently', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Identified Knowledge Gaps', value: '3 Critical', change: '2 Targeted Interventions', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Assigned Roadmaps Status', value: '84%', change: 'On track to completion', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header snippet */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold">Welcome back to Intelligence Hub</h1>
          <p className="text-indigo-200 text-sm mt-1.5 max-w-xl">
            Real-time competency matrix, skill mapping, gap evaluations, and active peer matching streams interface.
          </p>
        </div>
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-6 text-white/5 font-black text-9xl select-none hidden lg:block">GAP</div>
      </div>

      {/* KPI Cards Aggregations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">{card.title}</span>
                <span className="text-2xl font-bold text-gray-900 block">{card.value}</span>
                <span className="text-xs text-gray-500 block">{card.change}</span>
              </div>
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <Icon className={card.color} size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Analytics Layout Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill gaps active mapping queue */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Current Competency Breakdown vs Target</h3>
            <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-1 rounded-md">Realtime</span>
          </div>
          
          <div className="space-y-4">
            {[
              { skill: 'React / NextJS Frameworks', level: 'Intermediate', progress: 65, status: 'Moderate Gap' },
              { skill: 'Spring Boot Microservices', level: 'Beginner', progress: 35, status: 'Critical Gap' },
              { skill: 'PostgreSQL Architecture', level: 'Advanced', progress: 90, status: 'Optimal' },
            ].map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-800">{item.skill}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    item.status === 'Critical Gap' ? 'bg-red-50 text-red-600' :
                    item.status === 'Moderate Gap' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>{item.status}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      item.status === 'Critical Gap' ? 'bg-red-500' :
                      item.status === 'Moderate Gap' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action item lists section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-900 mb-4">Urgent Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition cursor-pointer flex gap-3">
              <Shield className="text-indigo-600 shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="text-sm font-semibold text-gray-800">Complete Self Assessment</h4>
                <p className="text-xs text-gray-500 mt-0.5">Due in 2 days for Q3 Gap Matrix review pipeline.</p>
              </div>
            </div>

            <div className="p-3 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition cursor-pointer flex gap-3">
              <TrendingUp className="text-emerald-600 shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="text-sm font-semibold text-gray-800">Suggested: Kafka Stream Track</h4>
                <p className="text-xs text-gray-500 mt-0.5">Recommended based on your team microservices architecture project.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;