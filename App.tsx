
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import QuranPage from './pages/QuranPage';
import ReadVersePage from './pages/ReadVersePage';
import ReciteVersePage from './pages/ReciteVersePage';
import AdhkarPage from './pages/AdhkarPage';
import AdhkarDetailPage from './pages/AdhkarDetailPage';
import CalendarPage from './pages/CalendarPage';
import HadithPage from './pages/HadithPage';
import NawawiPage from './pages/NawawiPage';
import SearchHadithPage from './pages/SearchHadithPage';
import type { Quote } from './types';
import { QUOTES, RECITERS } from './constants';

const EMOJIS = ['📖', '📿', '🌙'];
const NUM_EMOJIS = 30;

type Page = 'home' | 'quran' | 'read' | 'recite' | 'adhkar' | 'adhkarDetail' | 'calendar' | 'hadith' | 'nawawi' | 'searchHadith';

interface QuranSelection {
  surahId: number;
  fromAyahId: number;
  toAyahId: number;
  action: string;
  reciter: string;
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedVerse, setSelectedVerse] = useState<{ surahId: number; surahName: string; fromAyahId: number; toAyahId: number; } | null>(null);
  const [selectedAdhkarCategory, setSelectedAdhkarCategory] = useState<string | null>(null);
  const [quranSelection, setQuranSelection] = useState<QuranSelection>({
    surahId: 1,
    fromAyahId: 1,
    toAyahId: 1,
    action: 'read',
    reciter: RECITERS[0],
  });

  const floatingEmojis = useMemo(() => {
    return Array.from({ length: NUM_EMOJIS }).map((_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      style: {
        position: 'absolute' as const,
        left: `${Math.random() * 100}vw`,
        top: `calc(100vh + ${Math.random() * 50}vh)`,
        fontSize: `${Math.random() * 1.5 + 0.75}rem`,
        opacity: Math.random() * 0.4 + 0.1,
        animationName: i % 2 === 0 ? 'drift' : 'drift-reverse',
        animationDuration: `${Math.random() * 50 + 30}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationDelay: `${Math.random() * -80}s`,
      },
    }));
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
    }
    const randomQuoteIndex = Math.floor(Math.random() * QUOTES.length);
    setCurrentQuote(QUOTES[randomQuoteIndex]);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleNavigateToRead = (surahId: number, surahName: string, fromAyahId: number, toAyahId: number) => {
    setSelectedVerse({ surahId, surahName, fromAyahId, toAyahId });
    navigateTo('read');
  };
  
  const handleNavigateToRecite = (surahId: number, surahName: string, fromAyahId: number, toAyahId: number) => {
    setSelectedVerse({ surahId, surahName, fromAyahId, toAyahId });
    navigateTo('recite');
  };
  
  const handleNavigateToAdhkarDetail = (categoryKey: string) => {
    setSelectedAdhkarCategory(categoryKey);
    navigateTo('adhkarDetail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'quran':
        return (
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
            <QuranPage
              selection={quranSelection}
              onSelectionChange={setQuranSelection}
              onBack={() => navigateTo('home')}
              onNavigateToRead={handleNavigateToRead}
              onNavigateToRecite={handleNavigateToRecite}
            />
          </main>
        );
      case 'read':
        if (selectedVerse) {
          return (
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
              <ReadVersePage
                surahId={selectedVerse.surahId}
                fromAyahId={selectedVerse.fromAyahId}
                toAyahId={selectedVerse.toAyahId}
                surahName={selectedVerse.surahName}
                onBack={() => navigateTo('quran')}
              />
            </main>
          );
        }
        navigateTo('quran');
        return null;
       case 'recite':
        if (selectedVerse) {
          return (
             <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
               <ReciteVersePage
                 surahId={selectedVerse.surahId}
                 fromAyahId={selectedVerse.fromAyahId}
                 toAyahId={selectedVerse.toAyahId}
                 surahName={selectedVerse.surahName}
                 onBack={() => navigateTo('quran')}
               />
             </main>
          );
        }
         navigateTo('quran');
         return null;
      case 'adhkar':
        return (
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AdhkarPage
              onNavigateToDetail={handleNavigateToAdhkarDetail}
              onBack={() => navigateTo('home')}
            />
          </main>
        );
      case 'adhkarDetail':
        if (selectedAdhkarCategory) {
          return (
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <AdhkarDetailPage
                categoryKey={selectedAdhkarCategory}
                onBack={() => navigateTo('adhkar')}
              />
            </main>
          );
        }
        navigateTo('adhkar');
        return null;
      case 'calendar':
        return (
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
            <CalendarPage onBack={() => navigateTo('home')} />
          </main>
        );
      case 'hadith':
        return (
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
            <HadithPage
              onBack={() => navigateTo('home')}
              onNavigateToNawawi={() => navigateTo('nawawi')}
              onNavigateToSearch={() => navigateTo('searchHadith')}
            />
          </main>
        );
      case 'nawawi':
        return (
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <NawawiPage onBack={() => navigateTo('hadith')} />
          </main>
        );
      case 'searchHadith':
        return (
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
            <SearchHadithPage onBack={() => navigateTo('hadith')} />
          </main>
        );
      case 'home':
      default:
        return (
          <>
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
              {currentQuote && <Hero quote={currentQuote} onQuranClick={() => navigateTo('quran')} onAdhkarClick={() => navigateTo('adhkar')} onCalendarClick={() => navigateTo('calendar')} onHadithClick={() => navigateTo('hadith')} />}
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-emerald-50 dark:bg-gray-900 overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 -z-0" aria-hidden="true">
        {floatingEmojis.map(item => (
          <span key={item.id} style={item.style}>
            {item.emoji}
          </span>
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen text-gray-800 dark:text-gray-200">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
