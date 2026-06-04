import React, { useState } from 'react';
import { StudentField, StudyAnalysis } from '../types';
import { analyzeTopic } from '../services/gemini';

type CourseAnalyzerProps = {
  currentField: StudentField;
};

const CourseAnalyzer: React.FC<CourseAnalyzerProps> = ({ currentField }) => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState<StudyAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const onAnalyze = async () => {
    if (!query.trim()) {
      return;
    }
    setLoading(true);
    const result = await analyzeTopic(query.trim(), currentField);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 h-full overflow-auto">
      <h3 className="text-lg font-semibold mb-3">Topic Analyzer</h3>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
          placeholder="Enter a topic to analyze"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm disabled:opacity-60"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {!analysis ? (
        <p className="text-sm text-slate-500">Run analysis to see roadmap, concepts, and key pitfalls.</p>
      ) : (
        <div className="space-y-4 text-sm text-slate-700">
          <p>{analysis.summary}</p>
          <div>
            <h4 className="font-semibold mb-1">Roadmap</h4>
            <ul className="list-disc list-inside space-y-1">
              {analysis.roadmap?.slice(0, 5).map((step, idx) => (
                <li key={`${step.phase}-${idx}`}>
                  <span className="font-medium">{step.phase}:</span> {step.details}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseAnalyzer;
