
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { Verse } from '../types';

// Polyfill for SpeechRecognition
// FIX: Cast window to `any` to access non-standard SpeechRecognition APIs.
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
// FIX: Use `any` for the recognition instance type to avoid a name conflict with the `SpeechRecognition` variable.
let recognition: any | null = SpeechRecognition ? new SpeechRecognition() : null;

interface ReciteVersePageProps {
  surahId: number;
  fromAyahId: number;
  toAyahId: number;
  surahName: string;
  onBack: () => void;
}

const ReciteVersePage: React.FC<ReciteVersePageProps> = ({ surahId, fromAyahId, toAyahId, surahName, onBack }) => {
  const [recitationMode, setRecitationMode] = useState<'voice' | 'writing' | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [writtenText, setWrittenText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const correctVerseText = useRef<string | null>(null);

  useEffect(() => {
    if (!recognition) {
        setError("متصفحك لا يدعم خاصية التعرف على الصوت. يرجى تجربة متصفح آخر مثل Chrome.");
        return;
    }
    recognition.continuous = true;
    recognition.lang = 'ar-SA';
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
            finalTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript);
    };
    
    recognition.onerror = (event: any) => {
        setError(`حدث خطأ أثناء التسجيل: ${event.error}`);
        setIsListening(false);
    };

    recognition.onend = () => {
        setIsListening(false);
    };
    
    return () => {
        if(recognition){
            recognition.stop();
        }
    };
  }, []);

  const handleListen = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setFeedback('');
      setError(null);
      recognition.start();
      setIsListening(true);
    }
  };

  const handleEvaluation = async () => {
    setIsLoading(true);
    setError(null);
    setFeedback('');

    const studentAttempt = recitationMode === 'voice' ? transcript : writtenText;

    if (!studentAttempt.trim()) {
      setError("الرجاء تقديم التسميع أولاً.");
      setIsLoading(false);
      return;
    }

    try {
        // 1. Fetch the correct verses text
        if (!correctVerseText.current) {
            const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`);
            if (!response.ok) throw new Error('فشل في جلب النص الصحيح للآيات.');
            const data = await response.json();
            if (!data.verses || data.verses.length === 0) throw new Error('لم يتم العثور على نص السورة.');
            
            const relevantVerses = data.verses.slice(fromAyahId - 1, toAyahId);
            correctVerseText.current = relevantVerses.map((v: Verse) => v.text_uthmani).join(' ');
        }
        
        // 2. Call Gemini API for evaluation
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `أنت معلم قرآن خبير ولطيف. مهمتك هي مقارنة تسميع الطالب (النص المكتوب) مع النص الصحيح للآيات القرآنية. قدم تقييمًا بناءً ومشجعًا باللغة العربية.
إذا كان التسميع صحيحًا تمامًا، فامدح الطالب بعبارات مثل "ما شاء الله، تسميع متقن!".
إذا كانت هناك أخطاء بسيطة (مثل حرف أو حركة)، فأشر إليها بلطف وقدم النصيحة.
إذا كانت هناك أخطاء كبيرة (مثل نسيان كلمة)، فوضحها وصححها بأسلوب مشجع.
ابدأ تقييمك دائمًا بعبارة تشجيعية.

النص الصحيح للآيات: "${correctVerseText.current}"
تسميع الطالب: "${studentAttempt}"

التقييم:`;

        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        setFeedback(result.text);

    } catch (err: any) {
        setError(err.message || "حدث خطأ غير متوقع أثناء التقييم.");
    } finally {
        setIsLoading(false);
    }
  };
  
  const resetState = () => {
    setRecitationMode(null);
    setTranscript('');
    setWrittenText('');
    setFeedback('');
    setError(null);
    setIsListening(false);
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const pageTitle = fromAyahId === toAyahId 
    ? `تسميع سورة ${surahName} - الآية ${fromAyahId}`
    : `تسميع سورة ${surahName} - الآيات ${fromAyahId} - ${toAyahId}`;


  return (
    <div className="w-full max-w-4xl p-6 md:p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg border-2 border-white/50 text-gray-900 dark:text-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-3xl font-amiri font-bold text-emerald-700 dark:text-emerald-400">
          {pageTitle}
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
        >
          العودة
        </button>
      </div>

      <div className="text-center space-y-6">
        {!recitationMode ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setRecitationMode('voice')}
              className="px-6 py-3 text-lg font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors"
            >
              التسميع بالتلاوة <span className="text-xs opacity-75">(غير دقيق)</span>
            </button>
            <button
              onClick={() => setRecitationMode('writing')}
              className="px-6 py-3 text-lg font-bold text-white bg-sky-600 rounded-full hover:bg-sky-700 transition-colors"
            >
              التسميع بالكتابة
            </button>
          </div>
        ) : (
          <button
            onClick={resetState}
            className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
          >
            تغيير طريقة التسميع
          </button>
        )}
        
        {recitationMode === 'voice' && (
           <div className="space-y-6">
                <button
                    onClick={handleListen}
                    className={`px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-300 transform hover:scale-105 ${isListening ? 'bg-red-600 hover:bg-red-700 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                >
                    {isListening ? 'أوقف التسجيل' : 'اضغط هنا للتسميع'}
                </button>

                {transcript && (
                    <div className="p-4 bg-gray-100/50 dark:bg-gray-900/50 rounded-lg min-h-[100px]">
                        <p className="font-amiri text-xl" dir="rtl">{transcript}</p>
                    </div>
                )}
           </div>
        )}

        {recitationMode === 'writing' && (
            <div className="space-y-4">
                 <label htmlFor="recitation-text" className="block text-lg font-bold mb-2">اكتب نص الآيات هنا:</label>
                 <textarea
                    id="recitation-text"
                    value={writtenText}
                    onChange={(e) => setWrittenText(e.target.value)}
                    rows={4}
                    className="w-full p-3 font-amiri text-xl bg-white/50 dark:bg-gray-700/50 border border-emerald-500/50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-50"
                    placeholder="ابدأ الكتابة..."
                    dir="rtl"
                />
            </div>
        )}

        {recitationMode && ((transcript && !isListening) || writtenText) && (
            <button
                onClick={handleEvaluation}
                disabled={isLoading}
                className="px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
                {isLoading ? 'جاري التقييم...' : 'التقييم'}
            </button>
        )}
        
        {error && <p className="text-red-500 mt-4">{error}</p>}
        
        {feedback && (
             <div className="mt-6 p-4 text-right bg-emerald-50/30 dark:bg-gray-700/30 rounded-lg shadow-inner border-t-4 border-emerald-500">
                <h3 className="font-bold text-xl mb-2 text-emerald-700 dark:text-emerald-300">تقييم التلاوة:</h3>
                <p className="whitespace-pre-wrap">{feedback}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ReciteVersePage;
