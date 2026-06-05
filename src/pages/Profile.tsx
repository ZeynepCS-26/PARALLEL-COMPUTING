import React from 'react';
import { useAppContext } from '../context';
import { User, Lock, Globe, Database, Terminal } from 'lucide-react';
import { Task } from '../types';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { OperationType, handleFirestoreError } from '../firestoreErrorHandler';

export default function Profile() {
  const { t, user, setUser, fetchUser } = useAppContext();

  if (!user) return <div className="p-12 text-center font-medium text-slate-500 flex-1 flex items-center justify-center">Establishing secure connection to records...</div>;

  const toggleVisibility = async () => {
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, { isPublic: !user.isPublic });
      setUser({ ...user, isPublic: !user.isPublic });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${user.id}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 w-full">
      
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="bg-emerald-100 p-5 rounded-2xl shadow-sm">
            <User className="w-10 h-10 text-emerald-600" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{user.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">HPC Engineer / Researcher</p>
            </div>
          </div>
        </div>
        
        <div>
          <button 
            onClick={toggleVisibility}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${user.isPublic ? 'bg-sky-100 text-sky-700 hover:bg-sky-200 shadow-sm' : 'bg-slate-800 text-white hover:bg-slate-700 shadow-md'}`}
          >
            {user.isPublic ? <Globe className="w-4 h-4"/> : <Lock className="w-4 h-4"/>}
            STATUS: {user.isPublic ? t.profile.publicProfile : t.profile.privateProfile}
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <Database className="w-6 h-6 text-slate-400" />
        <h2 className="text-2xl font-bold text-slate-900">{t.profile.completed}</h2>
      </div>

      {user.completedTasks.length === 0 ? (
        <div className="bg-slate-100 rounded-3xl border border-dashed border-slate-300 p-20 text-center flex flex-col items-center">
          <Terminal className="h-16 w-16 text-slate-300 mb-6" />
          <h3 className="text-lg font-semibold text-slate-600">{t.profile.noTasks}</h3>
        </div>
      ) : (
        <div className="space-y-8">
          {user.completedTasks.map((task: Task) => (
            <div key={task.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
               <div className="flex justify-between items-start mb-6">
                 <h3 className="text-xl font-bold text-slate-900">{task.title}</h3>
                 <div className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                   {new Date(task.completedAt).toLocaleString()}
                 </div>
               </div>
               
               <div className="mb-6">
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Code className="w-3.5 h-3.5"/> Source Code
                 </h4>
                 <pre className="bg-[#1e293b] text-slate-300 p-5 rounded-xl font-mono text-[13px] overflow-auto max-h-64 shadow-inner border border-slate-800">
                   {task.code}
                 </pre>
               </div>

               <div>
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <Activity className="w-3.5 h-3.5"/> Diagnostic Output
                 </h4>
                 <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-xl font-mono text-[13px] whitespace-pre-wrap text-emerald-800">
                    {task.simulationResult}
                 </div>
               </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
import { Code, Activity } from 'lucide-react'; // injecting needed icons directly
