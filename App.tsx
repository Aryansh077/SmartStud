
import React, { useState } from 'react';
import { StudentField } from './types';
import NewsFeed from './components/NewsFeed';
import CourseAnalyzer from './components/CourseAnalyzer';
import LiveTutor from './components/LiveTutor';
import ChatBot from './components/ChatBot';
import StudyPlanner from './components/StudyPlanner';
import RevisionBoard from './components/RevisionBoard';

const App: React.FC = () => {
  const [selectedField, setSelectedField] = useState<StudentField | null>(null);
  const [showLiveTutor, setShowLiveTutor] = useState(false);

  // Group fields
  const academicFields = [
    StudentField.ENGINEERING,
    StudentField.MEDICINE,
    StudentField.ARTS,
    StudentField.BUSINESS,
    StudentField.LAW,
    StudentField.SCIENCE
  ];

  const competitiveFields = [
    StudentField.UPSC,
    StudentField.SSC,
    StudentField.GATE,
    StudentField.CAT,
    StudentField.JEE,
    StudentField.NEET,
    StudentField.BANKING
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setSelectedField(null)}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-indigo-500/30 transition-all duration-300">
               <i className="fa-solid fa-graduation-cap text-lg"></i>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              Ssmartstud
            </h1>
          </div>
          
          {selectedField && (
            <div className="flex items-center space-x-3">
               <button 
                  onClick={() => setSelectedField(null)}
                  className="hidden md:flex items-center px-3 py-1 text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors"
               >
                 <i className="fa-solid fa-arrow-left mr-1"></i> Back to Home
               </button>
               <span className="hidden md:inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100">
                 <i className={`fa-solid ${getFieldIcon(selectedField)} mr-2`}></i>
                 {selectedField}
               </span>
               <button 
                  onClick={() => setShowLiveTutor(true)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 active:scale-95"
               >
                 <i className="fa-solid fa-headset animate-pulse"></i>
                 <span>Live Tutor</span>
               </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {!selectedField ? (
          // Landing / Field Selection
          <div className="animate-fade-in-up space-y-16">
            
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto pt-8">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6 border border-indigo-100">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-ping"></span>
                AI-Powered Learning Ecosystem
              </div>
              <h2 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Your Academic & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Competitive Edge</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Select your path to access real-time exam notifications, AI-generated study roadmaps, 
                visual learning tools, and a personal 24/7 tutor.
              </p>
            </div>

            {/* University Streams */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                 <div className="h-px bg-slate-200 flex-1"></div>
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">University Streams</h3>
                 <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {academicFields.map((field) => (
                  <FieldCard key={field} field={field} onClick={() => setSelectedField(field)} />
                ))}
              </div>
            </div>

            {/* Competitive Exams */}
            <div>
              <div className="flex items-center space-x-4 mb-6">
                 <div className="h-px bg-slate-200 flex-1"></div>
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Competitive Exams</h3>
                 <div className="h-px bg-slate-200 flex-1"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {competitiveFields.map((field) => (
                  <FieldCard key={field} field={field} onClick={() => setSelectedField(field)} isExam />
                ))}
              </div>
            </div>

          </div>
        ) : (
          // Dashboard
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Info Hub & Quick Tools (5 Columns) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="h-[600px]">
                  <NewsFeed field={selectedField} />
                </div>
                <RevisionBoard field={selectedField} />
              </div>

              {/* Right Column: Planner & Analysis (7 Columns) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                 {/* Planner Section */}
                 <div className="h-[450px]">
                   <StudyPlanner field={selectedField} />
                 </div>
                 
                 {/* Topic Analysis - Now Expanded */}
                 <div className="h-[650px]">
                    <CourseAnalyzer currentField={selectedField} />
                 </div>
              </div>
            </div>
            
            {/* Global ChatBot */}
            <ChatBot field={selectedField} />
          </div>
        )}
      </main>

      {showLiveTutor && selectedField && (
        <LiveTutor field={selectedField} onClose={() => setShowLiveTutor(false)} />
      )}
    </div>
  );
};

const FieldCard: React.FC<{ field: StudentField; onClick: () => void; isExam?: boolean }> = ({ field, onClick, isExam }) => (
  <button
    onClick={onClick}
    className={`group relative p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden flex flex-col h-full
      ${isExam 
        ? 'bg-slate-50 border-slate-200 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/10' 
        : 'bg-white border-slate-200 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10'
      }`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors
        ${isExam ? 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'}
      `}>
        <i className={`fa-solid ${getFieldIcon(field)}`}></i>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-2">
        <i className="fa-solid fa-arrow-right text-slate-400"></i>
      </div>
    </div>
    <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight">{field}</h3>
    <p className="text-xs text-slate-500 font-medium mt-auto">
      {isExam ? 'Syllabus • Dates • Strategy' : 'Research • Projects • Career'}
    </p>
  </button>
);

function getFieldIcon(field: StudentField): string {
  switch (field) {
    // Academic
    case StudentField.ENGINEERING: return 'fa-gears';
    case StudentField.MEDICINE: return 'fa-user-doctor';
    case StudentField.ARTS: return 'fa-palette';
    case StudentField.BUSINESS: return 'fa-chart-line';
    case StudentField.LAW: return 'fa-scale-balanced';
    case StudentField.SCIENCE: return 'fa-flask';
    
    // Competitive
    case StudentField.UPSC: return 'fa-landmark-dome';
    case StudentField.SSC: return 'fa-file-signature';
    case StudentField.GATE: return 'fa-microchip';
    case StudentField.CAT: return 'fa-briefcase';
    case StudentField.JEE: return 'fa-calculator';
    case StudentField.NEET: return 'fa-stethoscope';
    case StudentField.BANKING: return 'fa-building-columns';
    
    default: return 'fa-book';
  }
}

export default App;
