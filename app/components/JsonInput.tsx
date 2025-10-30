import React from 'react';

interface JsonInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  error: string;
}

export default function JsonInput({ value, onChange, onGenerate, error }: JsonInputProps) {
  return (
    <div className="flex flex-col h-full">
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        JSON Input:
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full p-3 border border-gray-300 rounded-lg font-mono text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Paste your JSON here..."
      />
      
      {error && (
        <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        onClick={onGenerate}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md"
      >
        🌳 Generate Tree
      </button>
    </div>
  );
}
