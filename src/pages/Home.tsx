import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context';
import { Cpu, Server, Network } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const { t } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col relative w-full overflow-hidden">
      
      {/* Background Pipeline Animation */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none opacity-[0.03]">
        {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             className={`h-6 sm:h-12 rounded-full absolute ${i % 2 === 0 ? 'bg-cyan-500' : 'bg-emerald-500'}`}
             style={{ top: `${15 + i * 15}%`, left: 0 }}
             animate={{ 
               width: ['0%', '100%', '0%'], 
               left: ['0%', '0%', '100%'] 
             }}
             transition={{ 
               duration: 4 + (i % 3), 
               repeat: Infinity, 
               ease: 'linear',
               delay: i * 0.5 
             }}
           />
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center p-6 w-full mt-10">
        <div className="w-full text-center py-16 px-4 z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold tracking-wider mb-8 uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> Virtual HPC Lab
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500 mb-6 tracking-tight leading-tight">
              {t.home.title}
            </h1>
            
            <p className="text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto font-medium">
              {t.home.subtitle}
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/learn')}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
              >
                {t.home.start}
              </button>
              <button
                onClick={() => navigate('/workspace')}
                className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                {t.home.workspace}
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
            <div className="bg-white/60 backdrop-blur border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Architectural Taxonomy</h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">
                Examine Flynn’s Taxonomy (SISD to MIMD), understand CPU vs. GPU throughput characteristics, and evaluate theoretical boundaries set by Amdahl's Law.
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Server className="w-6 h-6" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Shared Memory Systems</h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">
                Master concurrent execution utilizing Pthreads. Design robust applications preventing deadlocks, organizing critical sections, and leveraging Mutex elements.
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Distributed State & MPI</h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">
                Deploy clustered messaging operations. Utilize point-to-point and highly optimized collective behaviors like MPI_Bcast or MPI_Reduce for transformations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
