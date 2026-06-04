
export enum StudentField {
  // Academic
  ENGINEERING = 'Engineering',
  MEDICINE = 'Medicine',
  ARTS = 'Arts & Humanities',
  BUSINESS = 'Business & Finance',
  LAW = 'Law',
  SCIENCE = 'Pure Sciences',
  
  // Competitive Exams
  UPSC = 'UPSC CSE (Civil Services)',
  SSC = 'SSC CGL (Staff Selection)',
  GATE = 'GATE (Engineering)',
  CAT = 'CAT (Management)',
  JEE = 'JEE (Engineering Entrance)',
  NEET = 'NEET (Medical Entrance)',
  BANKING = 'Banking & PO'
}

export interface NewsItem {
  title: string;
  uri: string;
  source?: string;
}

export interface TrustedResource {
  title: string;
  provider: string;
  type: 'Official' | 'University' | 'Research' | 'Verified Portal';
  link: string;
  description: string;
}

export interface Certification {
  title: string;
  provider: string;
  cost: 'Free' | 'Paid';
  link: string;
  value: string; 
}

export interface CourseRecommendation {
  title: string;
  provider: string;
  platform: string;
  rating: string;
  link: string;
  description: string;
}

export interface BookRecommendation {
  title: string;
  author: string;
  isFree: boolean;
  link: string;
  description: string;
}

export interface StudyAnalysis {
  summary: string;
  roadmap: Array<{ phase: string; details: string }>;
  subTopics: Array<{ title: string; weightage: 'High' | 'Medium' | 'Low'; description: string }>;
  conceptualBreakdown: Array<{ concept: string; explanation: string; analogy?: string }>;
  misconceptions: string[];
  questionTypes: string[];
  resources: Array<{ name: string; type: string }>;
  pros: string[];
  cons: string[];
}

export interface StudyPlanDay {
  day: number | string;
  focus: string;
  tasks: string[];
  tips: string;
}

export interface RevisionNote {
  title: string;
  keyPoints: string[];
  formulasOrDates?: string[];
  mnemonics?: string[];
  mistakesToAvoid?: string[];
}
