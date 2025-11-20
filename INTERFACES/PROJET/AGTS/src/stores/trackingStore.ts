import { create } from 'zustand';

interface Location {
  lat: number;
  lng: number;
}

interface BusData {
  id: string;
  location: Location;
  speed: number;
  eta: string;
  routeName: string;
}

interface TrackingState {
  busLocation: Location | null;
  studentLocation: Location | null;
  busData: BusData | null;
  updateBusLocation: (location: Location) => void;
  updateStudentLocation: (location: Location) => void;
  setBusData: (data: BusData) => void;
}

export const useTrackingStore = create<TrackingState>((set) => ({
  // 📍 Position du BUS : Ibis Marcory (Point de départ)
  busLocation: { lat: 5.306388, lng: -3.977500 }, 

  // 📍 Position de l'ÉTUDIANT : Camp Commando Koumassi (Destination/Attente)
  studentLocation: { lat: 5.294444, lng: -3.961111 }, 

  busData: {
    id: 'BUS-AGTS-01',
    location: { lat: 5.306388, lng: -3.977500 },
    speed: 40, // km/h
    eta: '12 min',
    routeName: 'Ibis Marcory ➜ Koumassi',
  },
  updateBusLocation: (location) => set({ busLocation: location }),
  updateStudentLocation: (location) => set({ studentLocation: location }),
  setBusData: (data) => set({ busData: data }),
}));
