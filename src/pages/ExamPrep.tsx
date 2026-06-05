import React, { useState } from 'react';
import { useAppContext } from '../context';
import { Target, CheckCircle2, RefreshCw, Cpu, BrainCircuit, Eye, EyeOff, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExamPrep() {
  const { t, language } = useAppContext();
  const [topic, setTopic] = useState("Amdahl's Law & Performance");
  const [difficulty, setDifficulty] = useState("Undergraduate");
  const [loading, setLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<{q: string, a: string}[]>([]);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const topics = [
    "Amdahl's Law & Performance",
    "MPI & Distributed Memory",
    "Pthreads & Synchronization",
    "CUDA & GPU Programming",
    "Pipelining & Load Balancing",
    "Deadlock Avoidance Strategies"
  ];

  const difficulties = ["Undergraduate", "Graduate / Master's", "PhD / Conceptual Limits"];

  const generateQuestions = async () => {
    setLoading(true);
    setRevealedAnswers({});
    try {
      const res = await fetch('/api/generate-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, language })
      });
      const data = await res.json();
      if (data.questions) {
        setGeneratedQuestions(data.questions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 w-full">
      <div className="mb-12 text-center border-b border-slate-200 pb-10">
        <div className="bg-rose-100 p-3 rounded-2xl shadow-sm inline-block mb-6">
          <Target className="text-rose-600 w-10 h-10" strokeWidth={2} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">{t.exams.title}</h1>
        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">{t.exams.note}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Infinite Generator */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-100 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                 <h2 className="text-xl font-bold text-slate-900">{t.exams.dynamicTitle}</h2>
                 <p className="text-sm text-slate-500 font-medium mt-1">{t.exams.dynamicDesc}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
               <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.exams.topicSelect}</label>
                  <select 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3 font-medium transition-colors cursor-pointer"
                  >
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
               </div>
               <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.exams.difficultySelect}</label>
                  <select 
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block p-3 font-medium transition-colors cursor-pointer"
                  >
                    {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
               </div>
            </div>

            <button 
              onClick={generateQuestions}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Cpu className="w-5 h-5 bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text" />}
              {loading ? t.exams.generating : t.exams.generateBtn}
            </button>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
               {generatedQuestions.map((item, idx) => (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ delay: idx * 0.1 }}
                   key={idx + item.q} 
                   className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 relative group overflow-hidden"
                 >
                   <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400"></div>
                   <div className="flex items-start gap-4 mb-4">
                     <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                       Q{idx + 1}
                     </span>
                     <h3 className="font-bold text-slate-800 text-lg leading-snug pt-1">
                       {item.q}
                     </h3>
                   </div>
                   
                   {!revealedAnswers[idx] ? (
                     <button
                       onClick={() => toggleAnswer(idx)}
                       className="ml-12 flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
                     >
                       <Eye className="w-4 h-4"/> {t.exams.showAnswer}
                     </button>
                   ) : (
                     <motion.div 
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       className="ml-12 bg-slate-50 border border-slate-200 rounded-xl p-5 relative"
                     >
                       <button
                         onClick={() => toggleAnswer(idx)}
                         className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                       >
                         <EyeOff className="w-4 h-4"/>
                       </button>
                       <p className="text-slate-700 font-medium leading-relaxed pr-8">{item.a}</p>
                     </motion.div>
                   )}
                 </motion.div>
               ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Static Core Bank */}
        <div className="w-full lg:w-[40%] flex flex-col gap-6">
           <div className="flex items-center gap-2 mb-2 px-2">
              <BookOpen className="w-5 h-5 text-slate-400" />
              <h2 className="text-xl font-bold text-slate-900">Classic Exam Core</h2>
           </div>
           
          {[
            { q: t.exams.q1, a: t.exams.a1 },
            { q: t.exams.q2, a: t.exams.a2 },
            { q: t.exams.q3, a: t.exams.a3 },
            { q: t.exams.q4, a: t.exams.a4 }
          ].map((item, idx) => (
            <div 
              key={"static"+idx} 
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow group"
            >
              <h3 className="font-bold text-[15px] text-slate-900 flex gap-3 items-start mb-4">
                <CheckCircle2 className="w-5 h-5 text-slate-300 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-0.5" />
                {item.q}
              </h3>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-slate-600 text-sm font-medium leading-relaxed ml-8">
                {item.a}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
