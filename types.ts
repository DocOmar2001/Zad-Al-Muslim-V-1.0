
export interface Quote {
  quote: string;
  source: string;
}

export interface Duration {
  years: number;
  months: number;
  days: number;
}

export interface Surah {
  id: number;
  name: string;
  total_verses: number;
  transliteration: string;
  type: string;
}

export interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
}

export interface Dhikr {
  id: number;
  text: string;
  count: number;
  source: string;
  virtue?: string;
}

export interface AdhkarCategory {
  key: string;
  title: string;
  adhkar: Dhikr[];
}

export interface NawawiHadith {
  id: number;
  title: string;
  sanad: string;
  matn: string;
  source: string;
}
