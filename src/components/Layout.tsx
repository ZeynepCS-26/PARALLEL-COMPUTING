import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppContext } from '../context';
import { Network, Sparkles, BookOpen, Layers, Target, LibraryBig, PenTool, CheckCircle, CodeSquare, Activity, LogIn, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Layout() {
  const { language, setLanguage, t, user, signIn, logOut } = useAppContext();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => 
    cn(
      "flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all rounded-lg select-none",
      isActive 
        ? "text-emerald-700 bg-emerald-500/10 shadow-sm" 
        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
    );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center gap-2.5 text-slate-900">
             <div className="bg-emerald-500 p-1.5 rounded-lg shadow-sm">
                <Network className="h-5 w-5 text-white" strokeWidth={2} />
             </div>
             <span className="font-extrabold text-lg tracking-tight">
               {language === 'en' ? "Parallel Nodes" : "Paralel İşlem"}
             </span>
            </div>

            <nav className="hidden md:flex space-x-1 items-center">
              <NavLink to="/" className={navLinkStyle}>
                <Activity className="h-4 w-4" /> {t.nav.home}
              </NavLink>
              <NavLink to="/learn" className={navLinkStyle}>
                <Layers className="h-4 w-4" /> {t.nav.learn}
              </NavLink>
              <NavLink to="/workspace" className={navLinkStyle}>
                <CodeSquare className="h-4 w-4" /> {t.nav.workspace}
              </NavLink>
              <NavLink to="/exam" className={navLinkStyle}>
                <Target className="h-4 w-4" /> {t.nav.examPrep}
              </NavLink>
              <NavLink to="/profile" className={navLinkStyle}>
                <Sparkles className="h-4 w-4" /> {t.nav.profile}
              </NavLink>
            </nav>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 hover:text-slate-900 px-3 py-1.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                title="Change Language"
              >
                {language === 'en' ? 'TR' : 'EN'}
              </button>

              {user ? (
                 <button
                   onClick={logOut}
                   className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 px-3 py-1.5 rounded-full hover:bg-rose-100 transition-colors"
                 >
                   <LogOut className="h-3 w-3" /> {language === 'en' ? 'Sign Out' : 'Çıkış'}
                 </button>
              ) : (
                 <button
                   onClick={signIn}
                   className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors"
                 >
                   <LogIn className="h-3 w-3" /> {language === 'en' ? 'Sign In' : 'Giriş Yap'}
                 </button>
              )}
            </div>

          </div>
        </div>
      </header>

      <main className="flex-1 w-full h-full flex flex-col items-center bg-grid-pattern relative">
        <Outlet />
      </main>
      
    </div>
  );
}
