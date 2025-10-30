
import React, { useState } from 'react';
import { NAWAWI_HADITHS } from '../data/nawawi';
import { CopyIcon, CheckIcon } from '../components/Icons';
import type { NawawiHadith } from '../types';

interface NawawiPageProps {
  onBack: () => void;
}

const NawawiPage: React.FC<NawawiPageProps> = ({ onBack }) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (hadith: NawawiHadith) => {
    const fullText = `${hadith.title}\n\n${hadith.sanad}\n\n${hadith.matn}\n\n${hadith.source}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedId(hadith.id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="w-full max-w-4xl p-4 md:p-2 text-gray-900 dark:text-gray-50">
      <div className="sticky top-20 z-20 flex justify-between items-center mb-6 p-4 bg-emerald-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md border-b-2 border-emerald-500/30">
        <h2 className="text-2xl md:text-3xl font-amiri font-bold text-emerald-700 dark:text-emerald-400">
          الأربعون النووية
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
        >
          العودة
        </button>
      </div>

      <div className="space-y-6">
        {NAWAWI_HADITHS.map(hadith => (
          <div key={hadith.id} className="p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg border-2 border-white/50">
             <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-4">{hadith.title}</h3>
             <div className="font-amiri text-xl md:text-2xl leading-loose text-right space-y-5">
                <p className="leading-relaxed">{hadith.sanad}</p>
                <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed">{hadith.matn}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-emerald-500/20 leading-relaxed">
                    {hadith.source}
                </p>
             </div>
             <div className="mt-6 flex justify-end">
                <button
                    onClick={() => handleCopy(hadith)}
                    className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-700 dark:hover:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800"
                    aria-label={`نسخ ${hadith.title}`}
                >
                    {copiedId === hadith.id ? (
                        <>
                            <CheckIcon className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">تم النسخ!</span>
                        </>
                    ) : (
                        <>
                            <CopyIcon className="w-4 h-4" />
                            <span>نسخ</span>
                        </>
                    )}
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NawawiPage;
