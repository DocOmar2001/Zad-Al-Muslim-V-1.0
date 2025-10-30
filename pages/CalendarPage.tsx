
import React from 'react';
import useCalendar from '../hooks/useCalendar';
import { CalendarIcon } from '../components/Icons';

interface CalendarPageProps {
  onBack: () => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ onBack }) => {
  const { gregorianDate, hijriDate, ramadanCountdown, error } = useCalendar();

  const renderContent = () => {
    if (error) {
      return <p className="text-red-500 text-center">{error}</p>;
    }
    if (!gregorianDate) {
      return <p className="text-center">جاري تحميل التقويم...</p>;
    }
    return (
      <div className="space-y-6">
        {/* Gregorian Date Card */}
        <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow-md border-l-4 border-emerald-500">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">التقويم الميلادي</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{gregorianDate}</p>
        </div>

        {/* Hijri Date Card */}
        <div className="p-6 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow-md border-l-4 border-sky-500">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">التقويم الهجري</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-50">{hijriDate}</p>
        </div>
        
        {/* Ramadan Countdown Card */}
        {ramadanCountdown !== null && (
            <div className="p-8 text-center bg-gradient-to-br from-emerald-500 to-green-600 dark:from-emerald-600 dark:to-green-700 text-white rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2 opacity-90">المتبقي على شهر رمضان المبارك</h3>
                {ramadanCountdown === 0 ? (
                    <p className="text-5xl font-bold tracking-tight">رمضان مبارك!</p>
                ) : (
                    <p className="text-5xl font-bold tracking-tight">
                        {ramadanCountdown} <span className="text-3xl opacity-80">يوماً</span>
                    </p>
                )}
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl p-6 md:p-8 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-lg shadow-lg border-2 border-white/50 text-gray-900 dark:text-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
          <h2 className="text-2xl md:text-3xl font-amiri font-bold text-emerald-700 dark:text-emerald-400">
            التقويم
          </h2>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-bold text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors"
        >
          العودة للرئيسية
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default CalendarPage;
