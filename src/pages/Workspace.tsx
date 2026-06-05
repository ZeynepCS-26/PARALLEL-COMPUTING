import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context';
import { Send, Play, FileCheck, BrainCircuit, Component, TerminalSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Workspace() {
  const { t, language, user, fetchUser } = useAppContext();
  const [code, setCode] = useState(t.workspace.codePlaceholder);
  
  const initialBotMsg = language === 'tr' 
    ? "Akademik Paralel Hesaplama Asistanınızım. Amdahl Sınırları, MPI dağıtımları veya Pthreads senkronizasyonu hakkında sorularınızı yanıtlayabilirim."
    : "I am your Active Parallel Computing Assistant. You can query me regarding Pthreads (Shared Memory), MPI (Distributed) theory, or GPU CUDA concepts. Let's discuss your algorithm before implementation.";
    
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'model', content: initialBotMsg }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<'tutor' | 'alternatives'>('tutor');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && activeTab === 'tutor') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, activeTab]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input } as ChatMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, language })
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'model', content: data.result }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'model', content: "An error interrupted our connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const runSimulation = async () => {
    setSimulationLogs("Commencing containerized execution...");
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      setSimulationLogs(data.result);
    } catch (e) {
      setSimulationLogs("Execution aborted due to runtime anomaly.");
    }
  };

  const completeTask = async () => {
    if (!simulationLogs) {
      alert(language === 'tr' ? "Lütfen görev kaydı yapmadan simülasyonu çalıştırın." : "You must execute the experiment before saving to profile.");
      return;
    }
    
    if (!user) {
      alert(language === 'tr' ? "Profilinize eklemek için giriş yapmalısınız." : "You must be logged in to save to your profile.");
      return;
    }

    try {
      const taskId = Date.now().toString();
      const taskDoc = doc(db, 'users', user.id, 'tasks', taskId);
      
      await setDoc(taskDoc, {
        title: "Paralel Execution Build",
        description: "Implementation of concurrent logic flow.",
        code,
        simulationResult: simulationLogs,
        completedAt: Date.now()
      });
      
      fetchUser();
      alert(language === 'tr' ? "Başarıyla profilinize eklendi!" : "Archived to your academic profile successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to archive task to profile.");
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1400px] mx-auto bg-white shadow-xl rounded-2xl overflow-hidden my-6 border border-slate-200">
      
      {/* Left: AI Assistant / Guidelines */}
      <div className="w-full md:w-[45%] flex flex-col border-r border-slate-200 bg-slate-50">
        
        <div className="flex border-b border-slate-200 bg-white">
          <button 
            className={`flex-1 py-4 text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'tutor' ? 'border-b-2 border-emerald-500 text-emerald-700 bg-emerald-50/30' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('tutor')}
          >
            <BrainCircuit className="w-4 h-4"/> {t.workspace.tutorTab}
          </button>
          <button 
            className={`flex-1 py-4 text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 ${activeTab === 'alternatives' ? 'border-b-2 border-emerald-500 text-emerald-700 bg-emerald-50/30' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('alternatives')}
          >
            <Component className="w-4 h-4"/> {t.workspace.altTab}
          </button>
        </div>

        {activeTab === 'tutor' ? (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] rounded-2xl p-4 text-sm shadow-sm ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                    {msg.role === 'model' ? (
                      <div className="markdown-body"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                    ) : (
                      <span className="font-medium text-white">{msg.content}</span>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-400 rounded-2xl rounded-bl-none p-4 text-sm animate-pulse shadow-sm h-12 w-24 flex items-center justify-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-200 bg-white">
              <form onSubmit={sendMessage} className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full pl-5 pr-14 py-3.5 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm placeholder-slate-400 bg-slate-50 transition-all font-medium"
                  placeholder={t.workspace.placeholder}
                />
                <button type="submit" disabled={!input.trim()} className="absolute right-2 p-2.5 bg-emerald-500 text-white rounded-lg disabled:opacity-50 hover:bg-emerald-400 transition-colors shadow-sm shadow-emerald-500/30">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-8 bg-white selection:bg-cyan-100">
            <h3 className="font-bold text-2xl text-slate-900 mb-2">{t.workspace.alternatives.title}</h3>
            <p className="mb-8 leading-relaxed text-slate-600 font-medium text-sm">{t.workspace.alternatives.desc}</p>
            
            <div className="space-y-6">
               {[
                 { title: "I. Sequence (Serial)", content: t.workspace.alternatives.serial, color: "text-slate-500", border: "border-slate-300", bg: "bg-slate-50" },
                 { title: "II. Distributed (MPI)", content: t.workspace.alternatives.mpi, color: "text-sky-600", border: "border-sky-300", bg: "bg-sky-50/50" },
                 { title: "III. Shared Memory (Pthreads)", content: t.workspace.alternatives.pthreads, color: "text-rose-600", border: "border-rose-300", bg: "bg-rose-50/50" },
                 { title: "IV. Pipelining", content: t.workspace.alternatives.pipeline, color: "text-amber-600", border: "border-amber-300", bg: "bg-amber-50/50" }
               ].map((item, idx) => (
                  <div key={idx} className={`border-l-4 ${item.border} ${item.bg} p-4 rounded-r-lg`}>
                    <h4 className={`font-bold uppercase mb-2 tracking-widest text-xs ${item.color}`}>{item.title}</h4>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">{item.content}</p>
                  </div>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Code Editor & Runner */}
      <div className="flex-1 flex flex-col bg-[#1e293b] overflow-hidden relative">
        <div className="bg-[#0f172a] px-5 py-3.5 flex justify-between items-center border-b border-[#334155] shadow-sm z-10">
          <span className="font-mono font-bold text-emerald-400 text-sm flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> main.c (HPC Runtime)
          </span>
          <div className="flex gap-3">
             <button onClick={runSimulation} className="flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest px-4 py-2 bg-[#1e293b] text-slate-300 hover:text-white hover:bg-[#334155] rounded-md transition-colors border border-[#334155]">
               <Play className="w-3.5 h-3.5 fill-current"/> Execute
             </button>
             <button onClick={completeTask} className="flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest px-4 py-2 bg-emerald-500 text-emerald-950 hover:bg-emerald-400 rounded-md transition-colors shadow shadow-emerald-500/20">
               <FileCheck className="w-3.5 h-3.5"/> Archive
             </button>
          </div>
        </div>
        
        <div className="flex-1 relative flex flex-col">
            <textarea 
              className="flex-1 w-full bg-transparent text-[#e2e8f0] p-6 font-mono text-[14px] leading-relaxed resize-none focus:outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />
        </div>

        {simulationLogs && (
          <div className="h-64 bg-[#0f172a] border-t border-[#334155] p-5 flex flex-col shadow-[inset_0_10px_20px_rgba(0,0,0,0.2)]">
            <div className="text-slate-500 font-bold uppercase tracking-widest text-[11px] mb-3 flex items-center gap-2">
              <TerminalSquare className="w-4 h-4"/> System Execution Log
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-[13px] leading-relaxed text-emerald-400/90 whitespace-pre-wrap">
              {simulationLogs}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
