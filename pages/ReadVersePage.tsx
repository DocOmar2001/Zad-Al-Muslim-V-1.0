import React, { useState, useEffect } from 'react';
import type { Verse } from '../types';

interface ReadVersePageProps {
  surahId: number;
  fromAyahId: number;
  toAyahId: number;
  surahName: string;
  onBack: () => void;
}

const ReadVersePage: React.FC<ReadVersePageProps> = ({ surahId, fromAyahId, toAyahId, surahName, onBack }) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`);
        if (!response.ok) {
          throw new Error('فشل في جلب بيانات السورة. يرجى المحاولة مرة أخرى.');
        }
        const data = await response.json();
        if (data.verses && data.verses.length > 0) {
          const filteredVerses = data.verses.slice(fromAyahId - 1, toAyahId);
          setVerses(filteredVerses);
        } else {
          throw new Error('لم يتم العثور على السورة المحددة.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVerses();
  }, [surahId, fromAyahId, toAyahId]);

  const pageTitle = fromAyahId === toAyahId 
    ? `سورة ${surahName} - الآية ${fromAyahId}`
    : `سورة ${surahName} - الآيات ${fromAyahId} - ${toAyahId}`;

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

      <div className="min-h-[200px] flex items-center justify-center p-4 bg-emerald-50/20 dark:bg-gray-900/20 rounded-lg">
        {isLoading && <p>جاري تحميل الآيات...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {verses.length > 0 && (
          <p className="text-3xl md:text-4xl lg:text-5xl font-amiri text-center" dir="rtl" style={{ lineHeight: 2.2 }}>
            {verses.map(verse => (
              <span key={verse.id}>
                {verse.text_uthmani.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "")} 
                <span className="text-lg text-emerald-600 dark:text-emerald-400 font-sans mx-1">
                  ({verse.verse_key.split(':')[1]})
                </span>
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReadVersePage;