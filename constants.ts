import { Mood, Question } from './types';

export const WELCOME_QUOTES = [
  {
    arabic: "وَمَا تَسْقُطُ مِن وَرَقَةٍ إِلَّا يَعْلَمُهَا",
    urdu: "اور کوئی پتا نہیں گرتا مگر وہ اسے جانتا ہے۔",
    english: "Not a leaf falls but that He knows it."
  },
  {
    arabic: "وَلَرُبَّ نَازِلَةٍ يَضِيقُ لَهَا الْفَتَى .. ذَرْعًا وَعِنْدَ اللَّهِ مِنْهَا الْمَخْرَجُ",
    urdu: "کبھی کبھی انسان پر ایسی مصیبت آتی ہے کہ وہ تنگ آ جاتا ہے، مگر اللہ کے پاس اس کا حل موجود ہوتا ہے۔",
    english: "Sometimes a calamity befalls a person, but with Allah lies the way out."
  },
  {
    arabic: "لا یُکَلِّفُ اللہُ نَفۡسًا اِلَّا وُسۡعَہَا",
    urdu: "اللہ کسی جان پر اس کی طاقت سے بڑھ کر بوجھ نہیں ڈالتا۔",
    english: "Allah does not burden a soul beyond that it can bear."
  },
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    urdu: "یقیناً ہر تنگی کے ساتھ آسانی ہے۔",
    english: "Indeed, with hardship comes ease."
  },
  {
    arabic: "وَعَسَى أَنْ تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَكُمْ",
    urdu: "اور ممکن ہے کہ تم کسی چیز سے نفرت کرو اور وہ تمہارے لیے بہتر ہو۔",
    english: "And it may be that you dislike a thing while it is good for you."
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    urdu: "اللہ صبر کرنے والوں کے ساتھ ہے۔",
    english: "Indeed, Allah is with the patient."
  },
  {
    arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ",
    urdu: "رحم کرنے والے پر رحم کرنے والا مہربان ہوتا ہے۔",
    english: "The merciful are shown mercy by The Most Merciful."
  },
  {
    arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
    urdu: "صبر اور نماز سے مدد حاصل کرو۔",
    english: "Seek help through patience and prayer."
  },
  {
    arabic: "الْمُؤْمِنُ القَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ المُؤْمِنِ الضَّعِيفِ",
    urdu: "طاقتور مومن اللہ کے نزدیک کمزور مومن سے بہتر اور زیادہ محبوب ہے۔",
    english: "A strong believer is better and more beloved to Allah than a weak one."
  },
  {
    arabic: "إِنَّ اللهَ لا يَنظُرُ إِلَى صُورِكُمْ وَأَمْوَالِكُمْ وَلَكِنْ إِلَى قُلُوبِكُمْ وَأَعْمَالِكُمْ",
    urdu: "اللہ تمہیں شکل و صورت یا مال کے حساب سے نہیں دیکھتا بلکہ تمہارے دل اور اعمال کے مطابق دیکھتا ہے۔",
    english: "Allah does not look at your appearance or wealth, but at your hearts and deeds."
  },
  {
    arabic: "اللَّهُمَّ اجعلْني مِنَ الشَّاكِرِينَ",
    urdu: "اے اللہ! مجھے شکر گزار لوگوں میں شامل فرما۔",
    english: "O Allah! Make me among those who are grateful."
  },
  {
    arabic: "مَنْ لَا يَرْحَمْ لَا يُرْحَمْ",
    urdu: "جو رحم نہیں کرتا اسے بھی رحم نہیں کیا جائے گا۔",
    english: "Whoever does not show mercy will not be shown mercy."
  }
];

// Questions in English but culturally tuned, or Roman Urdu where appropriate
export const THERAPY_QUESTIONS: Question[] = [
  {
    id: "heart_state",
    text: "Acha jee👀 so right now kia cheez sabse zyada bother karahi hai?", // How does the heart feel?
    options: ["Dil bhari horha hai", "Peaceful hai", "Bechain (Restless)", "Sunn hai aur kuch samajh nhi araha?"]
  },
  {
    id: "mind_space",
    text: "Dimagh mein kya chal raha hai?", // What's running in the mind?
    options: ["Purani yaadein (Memories)", "Mustaqbil ki fikar (Future worries)", "Khamoshi (Silence)", "Shor (Noise)"]
  },
  {
    id: "soul_craving",
    text: "What you want, just for a moment?", // What is the soul searching for?
    options: ["Maafi (Forgiveness)", "Rasta (Guidance)", "Mohabbat (Love)", "Thehrao (Stability)" , "Space Har cheez se"]
  }
];

export const MOOD_ICONS: Record<Mood, string> = {
  [Mood.Happy]: "✨",
  [Mood.Sad]: "🌧️",
  [Mood.Emotional]: "🌊",
  [Mood.Serious]: "🍂",
  [Mood.Empty]: "🌫️"
};