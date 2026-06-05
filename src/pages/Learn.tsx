import React from 'react';
import { useAppContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { GraduationCap, Cpu, Layers, GitMerge, LineChart, Hash, Zap, Code, HardDrive, Filter, CopyPlus, Target } from 'lucide-react';

export default function Learn() {
  const { t } = useAppContext();
  const navigate = useNavigate();

  const icons = [
    <Cpu className="w-5 h-5 text-emerald-600" />,
    <LineChart className="w-5 h-5 text-cyan-600" />,
    <Zap className="w-5 h-5 text-sky-600" />,
    <GitMerge className="w-5 h-5 text-amber-600" />,
    <Layers className="w-5 h-5 text-rose-600" />,
    <Hash className="w-5 h-5 text-fuchsia-600" />,
    <Code className="w-5 h-5 text-emerald-600" />,
    <HardDrive className="w-5 h-5 text-teal-600" />,
    <Filter className="w-5 h-5 text-cyan-600" />,
    <Target className="w-5 h-5 text-amber-600" />,
    <CopyPlus className="w-5 h-5 text-orange-600" />,
    <GraduationCap className="w-5 h-5 text-rose-600" />
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-12 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center bg-teal-100 text-teal-800 p-3 rounded-full mb-6 shadow-sm">
           <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">{t.learn.title}</h1>
        <p className="mt-4 text-lg text-slate-500 font-medium">12-Stage Academic Series on High-Performance Concurrent Computing</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.learn.modules.map((mod: any, idx: number) => {
          const badgeColorMap: Record<string, string> = {
            'emerald': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'cyan': 'bg-cyan-100 text-cyan-700 border-cyan-200',
            'sky': 'bg-sky-100 text-sky-700 border-sky-200',
            'amber': 'bg-amber-100 text-amber-700 border-amber-200',
            'rose': 'bg-rose-100 text-rose-700 border-rose-200',
            'fuchsia': 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
            'teal': 'bg-teal-100 text-teal-700 border-teal-200',
            'orange': 'bg-orange-100 text-orange-700 border-orange-200'
          };
          
          return (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              onClick={() => navigate('/workspace')}
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl border ${badgeColorMap[mod.color]} bg-white shadow-sm`}>
                  {icons[idx]}
                </div>
                <div className="flex-1">
                   <h2 className="text-lg font-bold text-slate-900 leading-tight">{mod.title}</h2>
                </div>
              </div>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 flex-1">
                {mod.desc}
              </p>
              
              <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Topic {idx + 1}</span>
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${badgeColorMap[mod.color]} group-hover:scale-105 transition-transform`}>
                   {t.learn.startModule}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
