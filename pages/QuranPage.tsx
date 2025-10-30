
import React, { useMemo } from 'react';
import { SURAHS, RECITERS } from '../constants';

interface QuranSelection {
  surahId: number;
  fromAyahId: number;
  toAyahId: number;
  action: string;
  reciter: string;
}

interface QuranPageProps {
  selection: QuranSelection;
  onSelectionChange: (selection: QuranSelection) => void;
  onBack: () => void;
  onNavigateToRead: (surahId: number, surahName: string, fromAyahId: number, toAyahId: number) => void;
  onNavigateToRecite: (surahId: number, surahName: string, fromAyahId: number, toAyahId: number) => void;
}

const QuranPage: React.FC<QuranPageProps> = ({ selection, onSelectionChange, onBack, onNavigateToRead, onNavigateToRecite }) => {

  const selectedSurah = useMemo(() => {
    return SURAHS.find(s => s.id === selection.surahId);
  }, [selection.surahId]);

  const handleSurahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const surahId = parseInt(e.target.value, 10);
    onSelectionChange({
      ...selection,
      surahId: surahId,
      fromAyahId: 1, // Reset ayah to 1 when surah changes
      toAyahId: 1,
    });
  };

  const handleFromAyahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fromAyah = parseInt(e.target.value, 10);
    onSelectionChange({
      ...selection,
      fromAyahId: fromAyah,
      toAyahId: Math.max(fromAyah, selection.toAyahId), // Ensure toAyah is not less than fromAyah
    });
  };

  const handleToAyahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectionChange({ ...selection, toAyahId: parseInt(e.target.value, 10) });
  };
  
  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectionChange({ ...selection, action: e.target.value });
  };

  const handleReciterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectionChange({ ...selection, reciter: e.target.value });
  };
  
  const fromAyahOptions = useMemo(() => {
    if (!selectedSurah) return [];
    return Array.from({ length: selectedSurah.total_verses }, (_, i) => i + 1);
  }, [selectedSurah]);

  const toAyahOptions = useMemo(() => {
    if (!selectedSurah) return [];
    return Array.from({ length: selectedSurah.total_verses - selection.fromAyahId + 1 }, (_, i) => i + selection.fromAyahId);
  }, [selectedSurah, selection.fromAyahId]);
  
  const handleStart = () => {
    if (!selectedSurah) return;
    const { surahId, fromAyahId, toAyahId } = selection;

    switch (selection.action) {
      case 'read':
        onNavigateToRead(surahId, selectedSurah.name, fromAyahId, toAyahId);
        break;
      case 'listen':
        const ayahRange = fromAyahId === toAyahId ? `آية ${fromAyahId}` : `الآيات ${fromAyahId}-${toAyahId}`;
        const query = encodeURIComponent(`تلاوة سورة ${selectedSurah.name} ${ayahRange} القارئ ${selection.reciter}`);
        window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
        break;
      case 'memorize':
        onNavigateToRecite(surahId, selectedSurah.name, fromAyahId, toAyahId);
        break;
      default:
        break;
    }
  };


  return (
    <div className="w-full max-w-2xl p-6 md:p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg border-2 border-white/50 text-gray-900 dark:text-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-amiri font-bold text-emerald-700 dark:text-emerald-400">
          القرآن الكريم
        </h2>
        <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
        >
            العودة للرئيسية
        </button>
      </div>

      <div className="space-y-6">
        {/* Surah Selector */}
        <div>
            <label htmlFor="surah-select" className="block text-lg font-bold mb-2">اختر السورة:</label>
            <select
                id="surah-select"
                value={selection.surahId}
                onChange={handleSurahChange}
                className="w-full p-3 bg-white/50 dark:bg-gray-700/50 border border-emerald-500/50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-50"
            >
                {SURAHS.map(surah => (
                    <option key={surah.id} value={surah.id}>{surah.id} - {surah.name}</option>
                ))}
            </select>
        </div>

        {/* Ayah Range Selector */}
        <div>
          <label className="block text-lg font-bold mb-2">اختر الآيات:</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="from-ayah-select" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">من:</label>
              <select
                  id="from-ayah-select"
                  value={selection.fromAyahId}
                  onChange={handleFromAyahChange}
                  className="w-full p-3 bg-white/50 dark:bg-gray-700/50 border border-emerald-500/50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-50"
              >
                  {fromAyahOptions.map(ayah => (
                      <option key={ayah} value={ayah}>{ayah}</option>
                  ))}
              </select>
            </div>
            <div>
              <label htmlFor="to-ayah-select" className="block text-sm mb-1 text-gray-600 dark:text-gray-400">إلى:</label>
              <select
                  id="to-ayah-select"
                  value={selection.toAyahId}
                  onChange={handleToAyahChange}
                  className="w-full p-3 bg-white/50 dark:bg-gray-700/50 border border-emerald-500/50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-50"
              >
                  {toAyahOptions.map(ayah => (
                      <option key={ayah} value={ayah}>{ayah}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>


        {/* Action Selector */}
        <div>
            <label htmlFor="action-select" className="block text-lg font-bold mb-2">اختر الإجراء:</label>
            <select
                id="action-select"
                value={selection.action}
                onChange={handleActionChange}
                className="w-full p-3 bg-white/50 dark:bg-gray-700/50 border border-emerald-500/50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-50"
            >
                <option value="read">قراءة</option>
                <option value="listen">استماع</option>
                <option value="memorize">تسميع</option>
            </select>
        </div>

        {/* Reciter Selector (Conditional) */}
        {selection.action === 'listen' && (
            <div>
                <label htmlFor="reciter-select" className="block text-lg font-bold mb-2">اختر القارئ:</label>
                <select
                    id="reciter-select"
                    value={selection.reciter}
                    onChange={handleReciterChange}
                    className="w-full p-3 bg-white/50 dark:bg-gray-700/50 border border-emerald-500/50 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-gray-50"
                >
                    {RECITERS.map(reciter => (
                        <option key={reciter} value={reciter}>{reciter}</option>
                    ))}
                </select>
            </div>
        )}
      </div>
      
      <div className="mt-10 text-center">
        <button
            onClick={handleStart}
            className="w-full md:w-auto px-10 py-4 text-lg font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-transform transform hover:scale-105 duration-300"
        >
            بسم الله نبدأ
        </button>
      </div>

    </div>
  );
};

export default QuranPage;
