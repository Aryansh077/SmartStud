import React from 'react';
import { StudentField } from '../types';

type LiveTutorProps = {
  field: StudentField;
  onClose: () => void;
};

const LiveTutor: React.FC<LiveTutorProps> = ({ field, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">Live Tutor</h3>
          <button className="text-slate-500 hover:text-slate-800" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <p className="text-sm text-slate-700 mb-4">
          Personalized tutor for {field}. Start with the analyzer and planner modules for guided support.
        </p>
        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">
          Close
        </button>
      </div>
    </div>
  );
};

export default LiveTutor;
