
export enum Mood {
  Happy = 'Khush ',
  Sad = 'Mood Off',
  Emotional = 'Emotional',
  Serious = 'Kisi se baat nhi karni bas',
  Empty = 'Khali Pan'
}

export enum AppStep {
  Welcome = 'WELCOME',
  MoodSelection = 'MOOD_SELECTION',
  Questions = 'QUESTIONS',
  CustomInput = 'CUSTOM_INPUT',
  Loading = 'LOADING',
  Result = 'RESULT'
}

export interface QuoteResponse {
  arabic: string;
  urdu: string;
  english: string;
  explanation: string; 
  message: string; 
  tips: string[]; // Practical advice
}

export interface Question {
  id: string;
  text: string;
  options: string[];
}

export interface UserSession {
  mood: Mood | null;
  answers: Record<string, string>;
  customNote: string; // User's optional input
}
