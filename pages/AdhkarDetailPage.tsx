
import React from 'react';
import { ADHKAR_CATEGORIES } from '../data/adhkar';
import DhikrCounter from '../components/DhikrCounter';

interface AdhkarDetailPageProps {
  categoryKey: string;
  onBack: () => void;
}

const AdhkarDetailPage: React.FC<AdhkarDetailPageProps> = ({ categoryKey, onBack }) => {
  const category = ADHKAR_CATEGORIES.find(c => c.key === categoryKey);

  if (!category) {
    return (
        <div className="w-full max-w-4xl p-6 md:p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg border-2 border-white/50 text-center">
            <h2 className="text-2xl font-bold text-red-500">الفئة غير موجودة</h2>
            <button
                onClick={onBack}
                className="mt-4 px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
            >
                العودة
            </button>
        </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-4 md:p-2 text-gray-900 dark:text-gray-50">
      <div className="sticky top-20 z-20 flex justify-between items-center mb-6 p-4 bg-emerald-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md border-b-2 border-emerald-500/30">
        <h2 className="text-2xl md:text-3xl font-amiri font-bold text-emerald-700 dark:text-emerald-400">
          {category.title}
        </h2>
        <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
        >
            العودة للأذكار
        </button>
      </div>

      <div className="space-y-6">
        {category.adhkar.map(dhikr => (
          <div key={dhikr.id} className="p-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg border-2 border-white/50">
            <p className="text-xl md:text-2xl font-amiri leading-loose text-right mb-4">
              {dhikr.text}
            </p>
            {dhikr.virtue && (
              <p className="text-sm italic text-emerald-800 dark:text-emerald-200 my-4 p-3 bg-emerald-100/30 dark:bg-emerald-900/30 rounded-md border-r-4 border-emerald-500 text-right">
                <span className="font-bold">الفضل:</span> {dhikr.virtue}
              </p>
            )}
            <p className="text-xs text-gray-600 dark:text-gray-400 text-right mb-4">
              <span className="font-bold">المصدر:</span> {dhikr.source}
            </p>
            <div className="flex justify-center items-center mt-4">
              <DhikrCounter totalCount={dhikr.count} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdhkarDetailPage;
