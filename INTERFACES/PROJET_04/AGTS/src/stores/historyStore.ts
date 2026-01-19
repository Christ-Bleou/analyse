import { create } from 'zustand';

interface Trip {
  id: number;
  route: string;
  date: string;
  duration: string;
  distance: string;
}

interface HistoryStore {
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  trips: [
    {
      id: 1,
      route: 'Cocody → IIT Grand-Bassam',
      date: '18 Jan 2026',
      duration: '48 min',
      distance: '32 km',
    },
    {
      id: 2,
      route: 'Marcory → Koumassi',
      date: '17 Jan 2026',
      duration: '35 min',
      distance: '18 km',
    },
    {
      id: 3,
      route: 'Abobo → Adjamé',
      date: '16 Jan 2026',
      duration: '55 min',
      distance: '25 km',
    },
  ],
  addTrip: (trip) =>
    set((state) => ({
      trips: [{ id: Date.now(), ...trip }, ...state.trips.slice(0, 9)], // garde seulement les 10 derniers
    })),
}));
