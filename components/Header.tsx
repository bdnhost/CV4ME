
import React from 'react';
import toast from 'react-hot-toast';
import { useDarkMode } from '../hooks/useDarkMode';

const FileTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const Header: React.FC = () => {
  const [isDark, setIsDark] = useDarkMode();

  const handleClearData = () => {
    if (confirm('האם אתה בטוח שברצונך למחוק את כל הנתונים השמורים?')) {
      localStorage.removeItem('cv4me-knowledge-base');
      localStorage.removeItem('cv4me-job-description');
      localStorage.removeItem('cv4me-generated-resume');
      toast.success('כל הנתונים נמחקו בהצלחה');
      window.location.reload();
    }
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FileTextIcon className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-100">עוזר קורות חיים AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors"
            title={isDark ? 'מצב בהיר' : 'מצב כהה'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
          <button
            onClick={handleClearData}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-700 hover:bg-red-600 text-slate-200 rounded-lg transition-colors"
            title="נקה נתונים שמורים"
          >
            <TrashIcon className="w-4 h-4" />
            <span className="hidden sm:inline">נקה נתונים</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
