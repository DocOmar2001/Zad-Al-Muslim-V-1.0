
import { useState, useEffect } from 'react';

// Note: These dates are approximate and based on astronomical calculations.
// The actual start of Ramadan is determined by the sighting of the moon.
// Using UTC dates to avoid timezone issues.
const RAMADAN_GREGORIAN_START_DATES: { [key: number]: Date } = {
  2025: new Date('2025-02-28T00:00:00Z'),
  2026: new Date('2026-02-17T00:00:00Z'),
  2027: new Date('2027-02-07T00:00:00Z'),
  2028: new Date('2028-01-27T00:00:00Z'),
};

interface CalendarData {
  gregorianDate: string;
  hijriDate: string;
  ramadanCountdown: number | null;
  error: string | null;
}

const useCalendar = (): CalendarData => {
  const [calendarData, setCalendarData] = useState<CalendarData>({
    gregorianDate: '',
    hijriDate: '',
    ramadanCountdown: null,
    error: null,
  });

  useEffect(() => {
    const calculateDates = () => {
      try {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Normalize to start of day

        // --- Gregorian Date ---
        const gregorianFormatter = new Intl.DateTimeFormat('ar-EG', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const gregorianDate = gregorianFormatter.format(today);

        // --- Hijri Date ---
        const hijriFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const hijriDate = hijriFormatter.format(today);

        // --- Ramadan Countdown ---
        let nextRamadanDate: Date | null = null;
        const currentYear = today.getFullYear();
        
        // Find the next upcoming Ramadan start date
        const sortedYears = Object.keys(RAMADAN_GREGORIAN_START_DATES).map(Number).sort();
        for (const year of sortedYears) {
            const ramadanDate = RAMADAN_GREGORIAN_START_DATES[year];
            if (ramadanDate >= today) {
                nextRamadanDate = ramadanDate;
                break;
            }
        }

        let ramadanCountdown: number | null = null;
        let error: string | null = null;

        if (nextRamadanDate) {
          const diffTime = nextRamadanDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          ramadanCountdown = diffDays;
        } else {
          error = 'لا توجد بيانات لرمضان في السنوات القادمة.';
        }

        setCalendarData({ gregorianDate, hijriDate, ramadanCountdown, error });

      } catch (e: any) {
        setCalendarData({
          gregorianDate: 'خطأ',
          hijriDate: 'خطأ',
          ramadanCountdown: null,
          error: 'لا يمكن حساب التاريخ. قد لا يكون متصفحك مدعومًا.',
        });
      }
    };

    calculateDates();
    
    // Optional: Recalculate once a day if the app is kept open
    const intervalId = setInterval(calculateDates, 1000 * 60 * 60 * 24);
    return () => clearInterval(intervalId);

  }, []);

  return calendarData;
};

export default useCalendar;
