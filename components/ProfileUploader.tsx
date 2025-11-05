
import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import type { UserKnowledgeBase, PdfDataPart } from '../types';
import { validateUserKnowledgeBase, validateFileSize, MAX_JSON_SIZE, MAX_PDF_SIZE, sanitizeText } from '../schemas/validation';

interface ProfileUploaderProps {
  onProfileLoad: (data: { jsonData?: Partial<UserKnowledgeBase>, pdfData?: PdfDataPart[] }) => void;
}

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

// Simple deep merge for combining JSON files from a single upload batch
const deepMergeBatch = (objects: Partial<UserKnowledgeBase>[]): Partial<UserKnowledgeBase> => {
    return objects.reduce((acc, obj) => {
        Object.keys(obj).forEach(key => {
            const typedKey = key as keyof UserKnowledgeBase;
            const accValue = acc[typedKey];
            const objValue = obj[typedKey];

            if (Array.isArray(accValue) && Array.isArray(objValue)) {
                (acc as any)[typedKey] = [...new Set([...accValue, ...objValue])]; // Merge and keep unique
            } else if (accValue && typeof accValue === 'object' && objValue && typeof objValue === 'object' && !Array.isArray(accValue)) {
                (acc as any)[typedKey] = deepMergeBatch([accValue as any, objValue as any]);
            } else {
                (acc as any)[typedKey] = objValue;
            }
        });
        return acc;
    }, {} as Partial<UserKnowledgeBase>);
};


const ProfileUploader: React.FC<ProfileUploaderProps> = ({ onProfileLoad }) => {
  const [loadedFiles, setLoadedFiles] = useState<{name: string, type: 'JSON' | 'PDF'}[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setError(null);

    const fileArray = Array.from(files) as File[];
    const jsonFiles = fileArray.filter(file => file.type === 'application/json');
    const pdfFiles = fileArray.filter(file => file.type === 'application/pdf');

    if (jsonFiles.length + pdfFiles.length !== files.length) {
        setError('יש לבחור קבצים מסוג JSON או PDF בלבד.');
        return;
    }

    const jsonReadPromises = jsonFiles.map(file => {
        return new Promise<Partial<UserKnowledgeBase>>((resolve, reject) => {
            // Validate file size
            if (!validateFileSize(file, MAX_JSON_SIZE)) {
                reject(new Error(`קובץ ${file.name} גדול מדי (מקסימום 1MB)`));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target?.result as string;
                    const data = JSON.parse(text);

                    // Validate JSON structure
                    const validation = validateUserKnowledgeBase(data);
                    if (!validation.success) {
                        const errorMessages = validation.error.issues
                            .map(err => `${err.path.join('.')}: ${err.message}`)
                            .join(', ');
                        reject(new Error(`קובץ ${file.name} לא עומד במבנה הנדרש: ${errorMessages}`));
                        return;
                    }

                    resolve(validation.data);
                } catch (err) {
                    reject(new Error(`קובץ JSON לא תקין: ${file.name}`));
                }
            };
            reader.onerror = () => reject(new Error(`שגיאה בקריאת הקובץ: ${file.name}`));
            reader.readAsText(file);
        });
    });

    const pdfReadPromises = pdfFiles.map(file => {
        return new Promise<PdfDataPart>((resolve, reject) => {
            // Validate file size
            if (!validateFileSize(file, MAX_PDF_SIZE)) {
                reject(new Error(`קובץ PDF ${file.name} גדול מדי (מקסימום 5MB)`));
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const dataUrl = e.target?.result as string;
                    const base64Data = dataUrl.substring(dataUrl.indexOf(',') + 1);
                    if (!base64Data) throw new Error("Could not extract base64 data.");
                    resolve({ fileName: file.name, mimeType: 'application/pdf', data: base64Data });
                } catch (err) {
                    reject(new Error(`עיבוד PDF נכשל: ${file.name}`));
                }
            };
            reader.onerror = () => reject(new Error(`שגיאה בקריאת הקובץ: ${file.name}`));
            reader.readAsDataURL(file);
        });
    });

    try {
        const parsedJsonObjects = await Promise.all(jsonReadPromises);
        const parsedPdfObjects = await Promise.all(pdfReadPromises);

        const mergedKnowledgeBase = parsedJsonObjects.length > 0 ? deepMergeBatch(parsedJsonObjects) : undefined;
        
        if (mergedKnowledgeBase || parsedPdfObjects.length > 0) {
            onProfileLoad({ jsonData: mergedKnowledgeBase, pdfData: parsedPdfObjects });
            const newJsonFiles = jsonFiles.map(f => ({ name: f.name, type: 'JSON' as const}));
            const newPdfFiles = pdfFiles.map(f => ({ name: f.name, type: 'PDF' as const}));
            setLoadedFiles(prev => [...prev, ...newJsonFiles, ...newPdfFiles]
                .filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)); // unique by name
            toast.success(`${jsonFiles.length + pdfFiles.length} קבצים נטענו בהצלחה`);
        } else {
             throw new Error("לא נמצא מידע תקין בקבצים שהועלו.");
        }
    } catch (err: any) {
        setError(err.message || 'אחד או יותר מהקבצים אינו תקין.');
        toast.error(err.message || 'אחד או יותר מהקבצים אינו תקין.');
    } finally {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        accept=".json,.pdf"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        multiple
      />
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2 px-4 border border-slate-600 rounded-lg transition-colors"
      >
        <UploadIcon className="w-5 h-5"/>
        בחר קבצים
      </button>

      {loadedFiles.length > 0 && (
        <div className="mt-3 text-sm text-green-400">
            <p className="font-semibold mb-2">קבצים שנטענו בהצלחה:</p>
            <ul className="list-disc list-inside space-y-1">
                {loadedFiles.map(file => (
                     <li key={file.name} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4 flex-shrink-0"/>
                        <span>{file.name} <span className="text-slate-500 text-xs">({file.type})</span></span>
                    </li>
                ))}
            </ul>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default ProfileUploader;
