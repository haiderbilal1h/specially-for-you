
import { GoogleGenAI, Type } from "@google/genai";
import { Mood, QuoteResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPersonalizedQuote = async (
  mood: Mood,
  answers: Record<string, string>,
  customNote: string
): Promise<QuoteResponse> => {
  const model = "gemini-2.5-flash";
  
  const answersStr = Object.entries(answers)
    .map(([q, a]) => `Question: "${q}", User Answer: "${a}"`)
    .join("; ");

  // Updated Prompt for Basic English, Warmth, and Tips
 const prompt = `
You are “Soul Healer,” an AI voice that speaks with deep warmth and emotional honesty.
Your message should feel like a close friend talking with love, care, and genuine softness.

User mood: "${mood}"
User answers: ${answersStr}
${customNote ? `Note: "${customNote}".` : ""}

STYLE:
- Use simple, easy English that feels natural.
- Be emotional, gentle, and comforting.
- Add soft, heart-touching emojis (💛🌙✨💗) but not too many.
- Speak like you truly care about the user.
- Keep it short but full of warmth.
- Acknowledge her tiredness, loneliness, emptiness, or pain softly.
- Remind her she is loved, enough, and cared for.
- Mention: “your parents and your close friends are here for you.”
- No dramatic sadness, but gentle emotional support.
- No questions unless absolutely needed.

TONE:
- Soft.
- Human.
- Calm.
- Caring like someone who genuinely loves her and wants her to feel safe.

RESPONSE FORMAT (JSON only):

1. "quran":
   - "arabic": One comforting ayat.
   - "urdu": Very simple Urdu translation.
   - "english": Short English meaning.
   - "source": Surah.

2. "hadith":
   - "arabic": One gentle hadith.
   - "urdu": Simple Urdu meaning.
   - "english": Short English meaning.
   - "source": Book.

3. "poetry":
   - "arabic": Soft one-line wisdom.
   - "urdu": Simple meaning.
   - "english": Soft meaning.
   - "source": "Wisdom".

4. "explanation":
   - A short, calm explanation of the ayat.
   - Easy English, emotional grounding.

5. "message":
   - A warm, emotional, comforting message.
   - Simple English.
   - Soft emojis allowed (2–4 max).
   - Tell her she is enough, valued, and cared for.
   - Remind her: “Your parents and your close friends care about you deeply.”
   - Acknowledge her struggles without exaggeration.

6. "tips":
   - 3 grounding steps.
   - Breathing, slow pause, drink water, relax shoulders.

RULES:
- Output JSON only.
- Keep everything short, soft, and emotionally comforting.
`;



  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            arabic: { type: Type.STRING, description: "Arabic quote" },
            urdu: { type: Type.STRING, description: "Urdu translation" },
            english: { type: Type.STRING, description: "Simple English translation" },
            explanation: { type: Type.STRING, description: "Simple meaning of the quote" },
            message: { type: Type.STRING, description: "Warm message with emojis" },
            tips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 simple practical tips" 
            }
          },
          required: ["arabic", "urdu", "english", "explanation", "message", "tips"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as QuoteResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback
    return {
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      urdu: "بے شک مشکل کے ساتھ آسانی ہے۔",
      english: "With every hard time, ease will come.",
      explanation: "Pain does not last forever. Good times are coming.",
      message: "Hey my friend! ❤️ Don't worry. Just like the night changes to day, this sadness will go away too. You are very strong! 🌿✨",
      tips: [
        "Take a deep breath in... and out.",
        "Drink a glass of cool water.",
        "Close your eyes and smile for 10 seconds."
      ]
    };
  }
};
