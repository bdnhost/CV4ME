
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-300">ה-AI עובד על קורות החיים שלך...</p>
       <p className="text-sm text-slate-400">זה עשוי לקחת מספר רגעים.</p>
    </div>
  );
};

export default Loader;
