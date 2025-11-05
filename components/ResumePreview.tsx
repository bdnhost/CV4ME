import React, { useRef, useState } from 'react';
import type { TailoredResume } from '../types';

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);

interface ResumePreviewProps {
  profile: TailoredResume;
}

const ResumePreviewContent: React.FC<ResumePreviewProps> = ({ profile }) => {
    const { personalInfo, summary, experience, education, skills } = profile;
    return (
        <>
            {/* Header */}
            <header className="text-center mb-8 border-b pb-6">
                <h1 className="text-4xl font-bold text-gray-900">{personalInfo.fullName}</h1>
                <div className="flex justify-center items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-600 flex-wrap">
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-blue-600"><MailIcon className="w-4 h-4" />{personalInfo.email}</a>
                <span className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" />{personalInfo.phone}</span>
                {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600"><LinkedinIcon className="w-4 h-4" />LinkedIn</a>}
                <span className="flex items-center gap-2"><MapPinIcon className="w-4 h-4" />{personalInfo.location}</span>
                </div>
            </header>

            <main>
                {/* Summary */}
                <section className="mb-8">
                <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4 text-gray-800">סיכום מקצועי</h2>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
                </section>

                {/* Experience */}
                <section className="mb-8">
                <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4 text-gray-800">ניסיון תעסוקתי</h2>
                {experience.map((exp, index) => (
                    <div key={index} className="mb-6 break-inside-avoid">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                    <div className="flex justify-between items-baseline text-md text-gray-600 mb-2">
                        <span>{exp.company}</span>
                        <span className="font-mono text-sm">{exp.period}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                    </div>
                ))}
                </section>

                {/* Skills */}
                <section className="mb-8">
                <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4 text-gray-800">כישורים</h2>
                <div className="space-y-4">
                    {skills.map((skill, index) => (
                    <div key={index} className="break-inside-avoid">
                        <h3 className="font-semibold text-gray-800">{skill.category}:</h3>
                        <p className="text-gray-700">{skill.items.join(', ')}</p>
                    </div>
                    ))}
                </div>
                </section>

                {/* Education */}
                <section>
                <h2 className="text-xl font-bold border-b-2 border-blue-500 pb-2 mb-4 text-gray-800">השכלה</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mb-4 break-inside-avoid">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <div className="flex justify-between items-baseline text-md text-gray-600">
                        <span>{edu.institution}</span>
                        <span className="font-mono text-sm">{edu.period}</span>
                    </div>
                    </div>
                ))}
                </section>
            </main>
        </>
    )
}

const DownloadButton: React.FC<ResumePreviewProps> = ({ profile }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [librariesAvailable, setLibrariesAvailable] = useState<boolean | null>(null);

    // Check if required libraries are loaded on component mount
    React.useEffect(() => {
        const checkLibraries = () => {
            const jsPDFConstructor = (window as any).jspdf?.jsPDF;
            const html2canvas = (window as any).html2canvas;
            setLibrariesAvailable(!!(jsPDFConstructor && html2canvas));
        };

        // Check immediately
        checkLibraries();

        // Check again after a delay in case scripts are still loading
        const timer = setTimeout(checkLibraries, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleDownloadPdf = () => {
        setIsDownloading(true);

        // Safely access libraries from the window object
        const jsPDFConstructor = (window as any).jspdf?.jsPDF;
        const html2canvas = (window as any).html2canvas;
        const resumeElement = document.getElementById('resume-for-pdf');

        if (!resumeElement || !html2canvas || !jsPDFConstructor) {
            console.error("PDF generation prerequisites not met.", {
                resumeElement: !!resumeElement,
                html2canvas: !!html2canvas,
                jsPDFConstructor: !!jsPDFConstructor
            });
            alert("לא ניתן לייצא PDF כרגע. נסה לרענן את הדף או בדוק את החיבור לאינטרנט.");
            setIsDownloading(false);
            return;
        }

        html2canvas(resumeElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then((canvas: any) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDFConstructor('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            let imgWidth = pdfWidth - 20; // with margin
            let imgHeight = imgWidth / ratio;

            if (imgHeight > pdfHeight - 20) {
                imgHeight = pdfHeight - 20;
                imgWidth = imgHeight * ratio;
            }
            
            const xOffset = (pdfWidth - imgWidth) / 2;
            const yOffset = 10;

            pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
            pdf.save(`${profile.personalInfo.fullName.replace(/\s/g, '_')}_CV.pdf`);
        }).catch((err: any) => {
            console.error("Error during PDF generation:", err);
            alert("אירעה שגיאה במהלך יצירת ה-PDF.");
        }).finally(() => {
            setIsDownloading(false);
        });
    };

    return (
        <div>
            <button
                onClick={handleDownloadPdf}
                disabled={isDownloading || librariesAvailable === false}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                title={librariesAvailable === false ? 'ספריות PDF לא זמינות. נסה לרענן את הדף.' : ''}
            >
                <DownloadIcon className="w-5 h-5"/>
                {isDownloading ? 'מכין PDF...' : 'הורד כ-PDF'}
            </button>
            {librariesAvailable === false && (
                <p className="mt-2 text-sm text-red-400">
                    ⚠️ ספריות PDF לא נטענו. בדוק את החיבור לאינטרנט ורענן את הדף.
                </p>
            )}
        </div>
    );
};


const ResumePreview: React.FC<ResumePreviewProps> & { DownloadButton: React.FC<ResumePreviewProps> } = ({ profile }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  
  return (
    <div id="resume-for-pdf" ref={resumeRef} className="bg-white text-gray-800 p-8 rounded-md shadow-lg animate-fade-in">
        <ResumePreviewContent profile={profile} />
    </div>
  );
};

ResumePreview.DownloadButton = DownloadButton;

export default ResumePreview;