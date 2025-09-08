
import React from 'react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder="הדבק כאן את תיאור המשרה..."
      rows={10}
      className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-slate-500"
    />
  );
};

export default JobDescriptionInput;
