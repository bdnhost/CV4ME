
import React, { useState, useCallback } from 'react';
import type { UserKnowledgeBase, TailoredResume, PdfDataPart } from './types';
import { generateTailoredResume } from './services/geminiService';
import ControlPanel from './components/ControlPanel';
import ResumePreview from './components/ResumePreview';
import Header from './components/Header';
import Loader from './components/Loader';
import ErrorAlert from './components/ErrorAlert';
import ExampleProfile from './components/ExampleProfile';

// Utility for deep merging objects, useful for combining multiple JSON uploads
const deepMerge = (target: any, source: any): UserKnowledgeBase => {
    const output = { ...target };

    if (target && typeof target === 'object' && source && typeof source === 'object') {
        Object.keys(source).forEach(key => {
            if (source[key] && typeof source[key] === 'object') {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
                    // Combine arrays, assuming no complex object duplication logic needed for this app
                    output[key] = [...target[key], ...source[key]];
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }

    return output as UserKnowledgeBase;
};


const App: React.FC = () => {
  const [knowledgeBase, setKnowledgeBase] = useState<UserKnowledgeBase | null>(null);
  const [pdfFiles, setPdfFiles] = useState<PdfDataPart[]>([]);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [generatedResume, setGeneratedResume] = useState<TailoredResume | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileLoad = useCallback((data: { jsonData?: Partial<UserKnowledgeBase>, pdfData?: PdfDataPart[] }) => {
    if (data.jsonData) {
        setKnowledgeBase(prevKb => prevKb ? deepMerge(prevKb, data.jsonData) : (data.jsonData as UserKnowledgeBase));
    }
    if (data.pdfData) {
        setPdfFiles(prevPdfs => [...prevPdfs, ...data.pdfData]);
    }
    setGeneratedResume(null); // Clear previous result when new profile is loaded
    setError(null);
  }, []);

  const handleGenerateResume = async () => {
    if ((!knowledgeBase && pdfFiles.length === 0) || !jobDescription) {
      setError('יש להעלות לפחות קובץ אחד (JSON או PDF) ולהזין תיאור משרה.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedResume(null);

    try {
      const tailoredResume = await generateTailoredResume(knowledgeBase, pdfFiles, jobDescription);
      setGeneratedResume(tailoredResume);
    // Fix: Corrected invalid `catch` syntax. The `=>` is not allowed in a catch block.
    } catch (err) {
      console.error(err);
      setError('אירעה שגיאה בעת יצירת קורות החיים. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  const hasProfileData = !!knowledgeBase || pdfFiles.length > 0;

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          {/* Control Panel Column */}
          <div className="flex flex-col gap-6">
            <ControlPanel
              onProfileLoad={handleProfileLoad}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onGenerate={handleGenerateResume}
              isLoading={isLoading}
              profileLoaded={hasProfileData}
            />
             {error && <ErrorAlert message={error} />}
             <ExampleProfile onProfileLoad={(kb) => handleProfileLoad({ jsonData: kb })} />
          </div>

          {/* Resume Preview Column */}
          <div className="mt-8 lg:mt-0">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-100">תצוגה מקדימה</h2>
                {generatedResume && !isLoading && <ResumePreview.DownloadButton profile={generatedResume} />}
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 min-h-[70vh]">
              {isLoading && <Loader />}
              {!isLoading && generatedResume && <ResumePreview profile={generatedResume} />}
              {!isLoading && !generatedResume && (
                 <div className="flex items-center justify-center h-full">
                    <p className="text-slate-400">קורות החיים המותאמים יופיעו כאן...</p>
                 </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;