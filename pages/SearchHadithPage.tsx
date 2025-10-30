
import React, { useState } from 'react';

interface SearchHadithPageProps {
  onBack: () => void;
}

const SearchHadithPage: React.FC<SearchHadithPageProps> = ({ onBack }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchUrl = `https://dorar.net/hadith/search?q=${encodeURIComponent(query)}`;
      window.open(searchUrl, '_blank');
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 md:p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg border-2 border-white/50 text-gray-900 dark:text-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-amiri font-bold text-emerald-700 dark:text-emerald-400">
          ابحث عن حديث
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
        >
          العودة
        </button>
      </div>

      <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
        أدخل كلمة أو جزءًا من الحديث للبحث عنه في موسوعة "الدرر السنية".
      </p>

      <form onSubmit={handleSearch} className="space-y-6">
        <div>
          <label htmlFor="hadith-search" className="sr-only">نص البحث</label>
          <input
            id="hadith-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 text-lg bg-white/50 dark:bg-gray-700/50 border border-emerald-500/50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-50 text-right"
            placeholder="مثال: إنما الأعمال بالنيات..."
            dir="rtl"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-4 text-lg font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-transform transform hover:scale-105 duration-300"
          >
            ابحث عن هذا الحديث
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHadithPage;
