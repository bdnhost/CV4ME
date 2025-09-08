
import React from 'react';
import ProfileUploader from './ProfileUploader';
import JobDescriptionInput from './JobDescriptionInput';
import type { UserKnowledgeBase, PdfDataPart } from '../types';

interface ControlPanelProps {
  onProfileLoad: (data: { jsonData?: Partial<UserKnowledgeBase>, pdfData?: PdfDataPart[] }) => void;
  jobDescription: string;
  setJobDescription: (description: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  profileLoaded: boolean;
}

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/>
  </svg>
);


const ControlPanel: React.FC<ControlPanelProps> = ({
  onProfileLoad,
  jobDescription,
  setJobDescription,
  onGenerate,
  isLoading,
  profileLoaded,
}) => {
  const isButtonDisabled = isLoading || !profileLoaded || !jobDescription;

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold mb-2 text-slate-100">שלב 1: העלאת מאגר ידע (JSON, PDF)</h2>
        <p className="text-sm text-slate-400 mb-4">
          העלה קבצי JSON עם מידע מובנה ו/או קבצי PDF של קורות חיים קודמים. המידע ימוזג ויעובד יחד.
        </p>
        <ProfileUploader onProfileLoad={onProfileLoad} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2 text-slate-100">שלב 2: הדבקת תיאור משרה</h2>
        <p className="text-sm text-slate-400 mb-4">
          הדבק כאן את תיאור המשרה המלא שאליה ברצונך להתאים את קורות החיים.
        </p>
        <JobDescriptionInput
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isButtonDisabled}
        className={`w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300
          ${isButtonDisabled
            ? 'bg-slate-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500'
          }
        `}
      >
        <SparklesIcon className="w-5 h-5"/>
        {isLoading ? 'יוצר קורות חיים...' : 'צור קורות חיים מותאמים'}
      </button>
    </div>
  );
};

export default ControlPanel;
