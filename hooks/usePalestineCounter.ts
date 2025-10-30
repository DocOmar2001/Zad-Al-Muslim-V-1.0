
import { useState, useEffect } from 'react';
import type { Duration } from '../types';

const usePalestineCounter = (startDate: Date): Duration => {
  const calculateDuration = (): Duration => {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
      months -= 1;
      // Get days in the previous month
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  const [duration, setDuration] = useState<Duration>(calculateDuration());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDuration(calculateDuration());
    }, 1000 * 60 * 60 * 24); // Update once a day

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return duration;
};

export default usePalestineCounter;
