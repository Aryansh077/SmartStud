import React, { useState } from 'react';
import { StudentField, StudyPlanDay } from '../types';
import { createStudyPlan } from '../services/gemini';

type StudyPlannerProps = {
  field: StudentField;
};

const StudyPlanner: React.FC<StudyPlannerProps> = ({ field }) => {
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(3);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<StudyPlanDay[]>([]);

  const generate = async () => {
    setLoading(true);
    const result = await createStudyPlan(field, days, hours);
    setPlan(result || []);
    setLoading(false);
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 h-full overflow-auto">
      <h3 className="text-lg font-semibold mb-3">Study Planner</h3>
      <div className="flex flex-wrap gap-2 items-end mb-4">
        <label className="text-sm">
          Days
          <input
            type="number"
            min={1}
            className="block border border-slate-300 rounded-lg px-3 py-2 mt-1 w-28"
            value={days}
            onChange={(e) => setDays(Number(e.target.value) || 1)}
          />
        </label>
        <label className="text-sm">
          Hours/day
          <input
            type="number"
            min={1}
            className="block border border-slate-300 rounded-lg px-3 py-2 mt-1 w-28"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value) || 1)}
          />
        </label>
        <button
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm disabled:opacity-60"
          onClick={generate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Plan'}
        </button>
      </div>

      <ul className="space-y-3 text-sm">
        {plan.slice(0, 7).map((day, idx) => (
          <li key={`${day.day}-${idx}`} className="border border-slate-200 rounded-lg p-3">
            <p className="font-semibold">Day {day.day}: {day.focus}</p>
            <ul className="list-disc list-inside text-slate-700">
              {(day.tasks || []).slice(0, 3).map((task, i) => (
                <li key={`${task}-${i}`}>{task}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StudyPlanner;
