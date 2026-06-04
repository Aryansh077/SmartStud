import React, { useState } from 'react';
import { StudentField } from '../types';

type ChatBotProps = {
  field: StudentField;
};

const ChatBot: React.FC<ChatBotProps> = ({ field }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="w-80 max-w-[90vw] bg-white border border-slate-200 rounded-2xl shadow-xl p-4 mb-2">
          <p className="font-semibold mb-2">Quick Assistant</p>
          <p className="text-sm text-slate-600">
            You are in {field}. Use Topic Analyzer and Study Planner for full AI features.
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 rounded-full bg-slate-900 text-white shadow-lg"
      >
        {open ? 'Close Chat' : 'Open Chat'}
      </button>
    </div>
  );
};

export default ChatBot;
