import React from 'react';
import { StudentField } from '../types';

type RevisionBoardProps = {
  field: StudentField;
};

const RevisionBoard: React.FC<RevisionBoardProps> = ({ field }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-3">Revision Board</h3>
      <p className="text-sm text-slate-600 mb-3">
        Quick memory cues for {field}.
      </p>
      <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
        <li>Revise core concepts before solving mixed problems.</li>
        <li>Track mistakes and repeat weak topics every 3 days.</li>
        <li>Use active recall over passive rereading.</li>
      </ul>
    </section>
  );
};

export default RevisionBoard;
