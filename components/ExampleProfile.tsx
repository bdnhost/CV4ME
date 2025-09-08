
import React, { useState } from 'react';
import type { UserKnowledgeBase } from '../types';

interface ExampleProfileProps {
    onProfileLoad: (profile: UserKnowledgeBase) => void;
}

const exampleProfileData: UserKnowledgeBase = {
  personalInfo: {
    fullName: "ישראל ישראלי",
    email: "israel.israeli@email.com",
    phone: "050-1234567",
    linkedin: "https://linkedin.com/in/israelisraeli",
    location: "תל אביב, ישראל"
  },
  professionalSummaryBase: "מפתח תוכנה מנוסה עם 5 שנות ניסיון בפיתוח Full-Stack, מתמחה ב-React, Node.js, ו-TypeScript. בעל מוטיבציה גבוהה, יכולת למידה מהירה ורצון לפתור אתגרים מורכבים בסביבת עבודה דינמית. מחפש את התפקיד הבא שלי שיאפשר לי לתרום למוצר חדשני ולהתפתח מקצועית.",
  experience: [
    {
      role: "מפתח Full-Stack",
      company: "חברת הייטק בע\"מ",
      period: "2020 - היום",
      description: [
        "פיתוח ותחזוקת אפליקציית ווב מבוססת React ו-Node.js עם למעלה מ-50,000 משתמשים.",
        "הובלת פרויקט המעבר ל-TypeScript בצד הלקוח, שהוביל להפחתה של 20% בבאגים.",
        "בניית RESTful APIs עבור שירותי החברה תוך שימוש ב-Express.js וחיבור למסד נתונים MongoDB.",
        "עבודה בסביבת Agile, השתתפות בפגישות סקראם יומיות ותכנון ספרינטים."
      ]
    },
    {
      role: "מפתח תוכנה Junior",
      company: "סטארטאפ מבטיח",
      period: "2018 - 2020",
      description: [
        "פיתוח רכיבי UI ב-React בהתאם לעיצובי Figma.",
        "כתיבת בדיקות יחידה ואינטגרציה באמצעות Jest ו-React Testing Library.",
        "טיפול בבאגים ותחזוקה שוטפת של קוד קיים.",
        "חלק מצוות שזכה במקום הראשון בהאקתון חברה."
      ]
    }
  ],
  education: [
    {
      degree: "תואר ראשון (B.Sc.) במדעי המחשב",
      institution: "אוניברסיטת תל אביב",
      period: "2015 - 2018"
    }
  ],
  skills: [
    {
      category: "שפות תכנות",
      items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Python"]
    },
    {
      category: "ספריות ו-Frameworks",
      items: ["React", "Node.js", "Express.js", "Redux", "Next.js", "TailwindCSS"]
    },
    {
      category: "מסדי נתונים",
      items: ["MongoDB", "PostgreSQL", "Firebase", "Redis"]
    },
    {
      category: "כלים ופלטפורמות",
      items: ["Git", "Docker", "Webpack", "AWS (S3, EC2)", "Jira", "CI/CD (Jenkins)"]
    }
  ],
  projects: [
    {
      name: "מערכת ניהול משימות אישית",
      description: "אפליקציית ווב שפותחה כפרויקט אישי לניהול משימות יומיות עם תמיכה בתגים, תאריכי יעד ודשבורד חכם.",
      technologies: ["React", "Firebase Authentication", "Firestore", "TailwindCSS"],
      link: "https://github.com/israel/task-manager"
    }
  ],
  certifications: [
    {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2022"
    }
  ],
  languages: [
    {
        language: "עברית",
        proficiency: "Native"
    },
    {
        language: "אנגלית",
        proficiency: "Fluent"
    }
  ]
};

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);

const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
);


const ExampleProfile: React.FC<ExampleProfileProps> = ({onProfileLoad}) => {
    const [isExampleVisible, setIsExampleVisible] = useState(false);
    
    const downloadExample = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(exampleProfileData, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "knowledge-base-example.json";
        link.click();
    };

    const useExample = () => {
        onProfileLoad(exampleProfileData);
        alert('מאגר הידע לדוגמה נטען. כעת, הדבק תיאור משרה ולחץ על כפתור היצירה.');
    }

    return (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h3 className="font-semibold text-slate-200 mb-2">אין לך קובץ JSON?</h3>
            <p className="text-sm text-slate-400 mb-4">
                אתה יכול להוריד דוגמה, להציג את המבנה שלה, או פשוט להשתמש בה כדי לנסות את האפליקציה.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
                <button 
                    onClick={downloadExample}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 px-4 border border-slate-600 rounded-lg transition-colors text-sm"
                >
                    <DownloadIcon className="w-4 h-4" />
                    הורד דוגמה
                </button>
                 <button 
                    onClick={() => setIsExampleVisible(!isExampleVisible)}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 px-4 border border-slate-600 rounded-lg transition-colors text-sm"
                >
                    <CodeIcon className="w-4 h-4" />
                    {isExampleVisible ? 'הסתר דוגמה' : 'הצג דוגמה'}
                </button>
                <button 
                    onClick={useExample}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                   השתמש בדוגמה
                </button>
            </div>
            {isExampleVisible && (
                <div className="mt-4 bg-slate-900/70 rounded-lg border border-slate-600 p-4 max-h-96 overflow-y-auto">
                    <pre className="text-xs text-slate-300 whitespace-pre-wrap">
                        <code>
                            {JSON.stringify(exampleProfileData, null, 2)}
                        </code>
                    </pre>
                </div>
            )}
        </div>
    );
}

export default ExampleProfile;
