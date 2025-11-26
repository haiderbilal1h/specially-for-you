
import React, { useState, useEffect } from 'react';
import { AppStep, Mood, UserSession, QuoteResponse } from './types';
import { WELCOME_QUOTES, THERAPY_QUESTIONS } from './constants';
import { getPersonalizedQuote } from './services/geminiService';
import { FadeIn } from './components/FadeIn';
import { Sparkles, ArrowRight, RotateCcw, Moon, Star, Heart, MessageCircleHeart, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Welcome);
  const [session, setSession] = useState<UserSession>({ mood: null, answers: {}, customNote: '' });
  const [finalQuote, setFinalQuote] = useState<QuoteResponse | null>(null);
  const [welcomeQuote, setWelcomeQuote] = useState(WELCOME_QUOTES[0]);

  useEffect(() => {
    const random = WELCOME_QUOTES[Math.floor(Math.random() * WELCOME_QUOTES.length)];
    setWelcomeQuote(random);
  }, []);

  const handleStart = () => setStep(AppStep.MoodSelection);

  const handleMoodSelect = (mood: Mood) => {
    setSession(prev => ({ ...prev, mood }));
    setStep(AppStep.Questions);
  };

  const handleAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...session.answers, [questionId]: answer };
    setSession(prev => ({ ...prev, answers: newAnswers }));

    if (Object.keys(newAnswers).length === THERAPY_QUESTIONS.length) {
      setStep(AppStep.CustomInput);
    }
  };

  const handleSubmitCustomInput = () => {
    generateResult();
  };

  const generateResult = async () => {
    setStep(AppStep.Loading);
    // Add a minimum artificial delay to let the "breathing" loading animation work its magic
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    if (session.mood) {
      const quote = await getPersonalizedQuote(session.mood, session.answers, session.customNote);
      setFinalQuote(quote);
      setStep(AppStep.Result);
    }
  };

  const resetApp = () => {
    setStep(AppStep.Welcome);
    setSession({ mood: null, answers: {}, customNote: '' });
    setFinalQuote(null);
    const random = WELCOME_QUOTES[Math.floor(Math.random() * WELCOME_QUOTES.length)];
    setWelcomeQuote(random);
  };

  // --- BACKGROUND ELEMENTS ---
  const BackgroundBlobs = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="blob w-96 h-96 bg-rose-200/30 rounded-full top-0 left-0 translate-x-[-30%] translate-y-[-30%]"></div>
      <div className="blob w-96 h-96 bg-indigo-200/30 rounded-full bottom-0 right-0 translate-x-[30%] translate-y-[30%] animation-delay-2000"></div>
      <div className="blob w-64 h-64 bg-purple-200/20 rounded-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] animation-delay-4000"></div>
    </div>
  );

  // --- RENDERERS ---

  const renderWelcome = () => (
    <div className="flex flex-col items-center justify-center min-h-full p-8 text-center relative z-10">
      <FadeIn delay={100} className="space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-6 backdrop-blur-md border border-white/30 shadow-lg">
          <Moon className="w-8 h-8 text-rose-800" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-rose-950 tracking-tight font-serif drop-shadow-sm">
          Specially For You
        </h1>
        <p className="text-lg text-rose-800 font-light tracking-wide uppercase max-w-md mx-auto">
          By Bilal
        </p>
      </FadeIn>

      <FadeIn delay={600} className="w-full max-w-2xl mx-auto mt-12 bg-white/40 p-10 rounded-[2rem] shadow-xl backdrop-blur-md border border-white/60">
        <div className="space-y-6">
          <p className="font-arabic text-4xl text-rose-900 leading-[1.8] drop-shadow-sm" dir="rtl">
            {welcomeQuote.arabic}
          </p>
          <div className="w-12 h-0.5 bg-rose-400/50 mx-auto"></div>
          <p className="font-urdu text-3xl text-rose-900 drop-shadow-sm" dir="rtl">
            {welcomeQuote.urdu}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={1200} className="mt-12">
        <button
          onClick={handleStart}
          className="group relative px-10 py-4 text-xl font-medium text-white transition-all duration-500 ease-out transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-rose-900 to-indigo-900 rounded-full opacity-90 shadow-2xl"></div>
          <div className="absolute inset-0 w-full h-full rounded-full opacity-0 group-hover:opacity-50 bg-rose-600 blur-lg transition-opacity duration-500"></div>
          <span className="relative flex items-center font-sans-modern tracking-wider">
            Acha bataen mujhe kia hua hai👀 <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </FadeIn>
    </div>
  );

  const renderMoods = () => (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center relative z-10">
      <FadeIn className="mb-12 max-w-xl">
        <h2 className="text-4xl md:text-5xl font-serif text-rose-950 mb-4">
          What's in your heart right now
        </h2>
        <p className="text-xl text-rose-800/80 font-sans-modern">
          (Just leave everything, sit down and ask yourself that what is the exact problem?)
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-5xl">
        {Object.values(Mood).map((mood, index) => (
          <FadeIn key={mood} delay={index * 150} className="w-full">
            <button
              onClick={() => handleMoodSelect(mood)}
              className="w-full aspect-[3/2] md:aspect-square flex flex-col items-center justify-center bg-white/40 hover:bg-rose-900/5 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 group border border-white/40 backdrop-blur-sm"
            >
              {/* Removed Emoji, just elegant text */}
              <span className="text-2xl text-rose-900 font-serif font-medium relative z-10 group-hover:scale-110 transition-transform duration-300">
                {mood}
              </span>
              <div className="mt-2 w-8 h-0.5 bg-rose-300/50 group-hover:w-16 transition-all duration-500"></div>
            </button>
          </FadeIn>
        ))}
      </div>
    </div>
  );

  const renderQuestions = () => {
    const currentQuestionIndex = THERAPY_QUESTIONS.findIndex(q => !session.answers[q.id]);
    const question = THERAPY_QUESTIONS[currentQuestionIndex];

    if (!question) return null;

    return (
      <div className="flex flex-col items-center justify-center min-h-full p-6 text-center max-w-3xl mx-auto relative z-10">
        <FadeIn key={question.id} className="w-full">
          <div className="bg-white/60 backdrop-blur-2xl rounded-[3rem] p-10 md:p-16 shadow-2xl border border-white/50">
            <div className="mb-12">
              <span className="text-rose-500 text-sm font-bold tracking-widest uppercase mb-2 block font-sans-modern">
                Step {currentQuestionIndex + 1}
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-rose-950 leading-tight">
                {question.text}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(question.id, option)}
                  className="group relative w-full text-left px-8 py-6 bg-white/50 hover:bg-rose-50 rounded-2xl transition-all duration-300 border border-rose-100 hover:border-rose-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl text-rose-900 group-hover:text-rose-950 font-medium font-sans-modern">
                      {option}
                    </span>
                    <Star className="w-5 h-5 text-rose-300 group-hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    );
  };

 const renderCustomInput = () => {
  // Array of sample messages
const HEART_MESSAGES = [
  "I’m really exhausted and everything feels heavy right now.",
  "It feels like everyone’s problems are on my shoulders.",
  "I just want some space to be alone for a while.",
  "When I’m alone, my mind keeps overthinking everything.",
  "I try to be a good girl, but sometimes I feel like I fail.",
  "I want some real peace and calm in my life.",
  "I wish I had a few true friends I could trust completely.",
  "I feel hurt because some friends betrayed me.",
  "Sometimes I feel like I turn into someone I don’t want to be.",
  "I’m tired of always trying to carry everyone’s burdens.",
  "I feel drained and like nothing is going right.",
  "I hope I can grow stronger despite everything happening.",
  "I want therapy, or someone to really listen to me.",
  "I just want peace and happy memories with real friends.",
  "Even though I’m tired and hurt, I know I’m still strong."
];



  // Function to pick random message
  const handleListenHeart = () => {
    const randomMessage = HEART_MESSAGES[Math.floor(Math.random() * HEART_MESSAGES.length)];
    setSession(prev => ({ ...prev, customNote: randomMessage }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center max-w-2xl mx-auto relative z-10">
      <FadeIn className="w-full">
        <div className="bg-white/60 backdrop-blur-2xl rounded-[3rem] p-10 md:p-12 shadow-2xl border border-white/50">
          <MessageCircleHeart className="w-12 h-12 text-rose-400 mx-auto mb-6" />
          <h3 className="text-3xl font-serif text-rose-950 mb-4">
            Kuch aur kehna chahte ho? <br/> <span className="text-lg opacity-60 font-sans-modern">(Anything else on your heart?)</span>
          </h3>
          <p className="text-rose-800/70 mb-8 font-sans-modern">
            Optional: Write whatever you are feeling right now. It helps to let it out.
          </p>

          <textarea
            value={session.customNote}
            onChange={(e) => setSession({ ...session, customNote: e.target.value })}
            placeholder="I am just..."
            className="w-full bg-white/50 border border-rose-200 rounded-2xl p-6 text-rose-900 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none h-40 font-sans-modern text-lg mb-6"
          />

          {/* New button to instantly listen to heart */}
          <button
            onClick={handleListenHeart}
            className="w-full mb-4 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-500 transition-colors shadow-md"
          >
            Want me to listen your heart?
          </button>

          <button
            onClick={handleSubmitCustomInput}
            className="w-full py-4 bg-rose-900 text-white rounded-full text-xl font-medium hover:bg-rose-800 transition-colors shadow-lg"
          >
            {session.customNote ? 'Submit & Heal' : 'Skip & Continue'}
          </button>
        </div>
      </FadeIn>
    </div>
  );
};

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center min-h-full p-6 relative z-10">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-rose-100 animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute inset-2 rounded-full border-4 border-rose-200 border-t-transparent animate-[spin_2s_linear_infinite]"></div>
        <div className="absolute inset-0 rounded-full bg-rose-100/20 animate-pulse"></div>
        <Heart className="w-10 h-10 text-rose-500 animate-pulse relative z-10" fill="currentColor" />
      </div>
      <h3 className="mt-10 text-2xl md:text-3xl text-rose-900 font-serif">
        Connecting souls...
      </h3>
      <p className="mt-2 text-rose-600 font-sans-modern animate-pulse">
        Writing a special letter for you...
      </p>
    </div>
  );

  const renderResult = () => {
    if (!finalQuote) return null;
    return (
      <div className="flex flex-col items-center justify-start min-h-full p-4 md:p-8 relative z-10 pb-20">
        <FadeIn className="max-w-3xl w-full space-y-6 mt-4">
          
          {/* Main Quote Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white overflow-hidden relative">
            <div className="bg-gradient-to-r from-rose-50/50 to-indigo-50/50 p-8 md:p-10 text-center space-y-8">
              
              {/* Arabic */}
              <div className="relative py-2">
                <p className="font-arabic text-3xl md:text-5xl text-rose-950 leading-[2.2] drop-shadow-sm" dir="rtl">
                  {finalQuote.arabic}
                </p>
              </div>
              
              {/* Urdu */}
              <p className="font-urdu text-2xl md:text-3xl text-rose-800/90 leading-relaxed" dir="rtl">
                {finalQuote.urdu}
              </p>

              {/* English */}
              <p className="text-lg md:text-xl text-slate-600 font-serif italic">
                "{finalQuote.english}"
              </p>
            </div>
          </div>

          {/* Meaning & Message Grid */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Message Card (The Heartwarming Note) */}
            <div className="bg-[#fffbfb] border border-rose-100 p-8 rounded-[2rem] shadow-lg relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-rose-200/30"></div>
               <h4 className="text-rose-900 font-bold uppercase tracking-widest text-sm font-sans-modern flex items-center mb-4">
                  <MessageCircleHeart className="w-5 h-5 mr-2 text-rose-400" /> A Message for You
               </h4>
               <p className="text-lg md:text-xl font-serif text-slate-700 leading-relaxed whitespace-pre-line">
                 {finalQuote.message}
               </p>
               <br />
                <b> <p className="text-lg md:text-xl font-serif text-slate-900 leading-relaxed whitespace-pre-line">
                 I love you So much💗, and we all know you are doing so much, be gentle meri jan, ham sab apke sath hain❤❤❤
               </p></b>
               
            </div>

            {/* Deep Meaning (Simple) */}
            <div className="bg-white/60 p-6 rounded-[2rem] border border-white/50">
              <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs font-sans-modern flex items-center mb-3">
                <Star className="w-4 h-4 mr-2" /> Deep Meaning
              </h4>
              <p className="text-base text-slate-600 font-light leading-relaxed">
                {finalQuote.explanation}
              </p>
            </div>

            {/* Practical Tips */}
            <div className="bg-indigo-50/40 p-6 rounded-[2rem] border border-indigo-50">
               <h4 className="text-indigo-900 font-bold uppercase tracking-widest text-sm font-sans-modern flex items-center mb-4">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-indigo-400" /> Small things to help right now
               </h4>
               <ul className="space-y-3">
                 {finalQuote.tips.map((tip, idx) => (
                   <li key={idx} className="flex items-start text-indigo-900/80 font-medium font-sans-modern">
                     <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"></span>
                     {tip}
                   </li>
                 ))}
               </ul>
            </div>

          </div>

          <div className="flex justify-center pt-8 pb-12">
            <button
              onClick={resetApp}
              className="group flex items-center px-8 py-3 text-base font-medium text-rose-600 bg-white hover:bg-rose-50 rounded-full shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 mr-2 group-hover:-rotate-180 transition-transform duration-500" />
              Start Again
            </button>
          </div>
        </FadeIn>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#fff1f2] font-serif selection:bg-rose-200 selection:text-rose-900 aurora-bg text-slate-800">
      <BackgroundBlobs />
      <div className="container mx-auto min-h-screen flex flex-col">
        {step === AppStep.Welcome && renderWelcome()}
        {step === AppStep.MoodSelection && renderMoods()}
        {step === AppStep.Questions && renderQuestions()}
        {step === AppStep.CustomInput && renderCustomInput()}
        {step === AppStep.Loading && renderLoading()}
        {step === AppStep.Result && renderResult()}
      </div>
    </div>
  );
};

export default App;
