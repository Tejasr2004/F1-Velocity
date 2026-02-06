
export interface Driver {
  position: number;
  name: string;
  team: string;
  points: number;
  wins: number;
  imageUrl?: string;
}

export interface LapRecord {
  circuit: string;
  driver: string;
  year: number;
  time: string; // MM:SS.mmm
  seconds: number;
}

export interface CircuitData {
  name: string;
  location: string;
  length: string;
  trackMapUrl?: string;
  records: LapRecord[];
  history: { year: number; time: number }[];
}

export interface GeminiSource {
  title?: string;
  uri?: string;
}

export interface F1DataState {
  standings: Driver[];
  circuits: CircuitData[];
  sources: GeminiSource[];
  isLoading: boolean;
  error: string | null;
}
