import { create } from 'zustand';
import { calculateDistance } from '../lib/utils';

export interface Location {
  lat: number;
  lng: number;
}

export interface Stop {
  name: string;
  location: Location;
}

interface BusData {
  id: string;
  location: Location;
  speed: number;
  eta: string;
  routeName: string;
  nextStop: string;
  isRunning?: boolean;
}

interface TrackingState {
  busLocation: Location | null;
  studentLocation: Location | null;
  busData: BusData | null;
  
  // Properties required by DriverDashboard
  stops: Stop[];
  currentStopIndex: number;
  isSimulating: boolean;
  
  // Actions
  startSimulation: () => void;
  pauseSimulation: () => void;
  stopSimulation: () => void;
  startRealLocation: () => void;
  shareLocationLink: () => string;
  setStudentLocation: (loc: Location) => void;
  updateBusLocation: (loc: Location) => void;
}

const ROUTE_STOPS: Stop[] = [
  { name: 'Cocody Centre', location: { lat: 5.3602, lng: -3.9674 } },
  { name: 'Riviera Palmeraie', location: { lat: 5.3700, lng: -3.9590 } },
  { name: 'Deux Plateaux', location: { lat: 5.3730, lng: -3.9930 } },
  { name: 'IIT Campus (Terminus)', location: { lat: 5.2060, lng: -3.7350 } },
];

let intervalId: any = null;
let watchId: number | null = null;

export const useTrackingStore = create<TrackingState>((set, get) => ({
  busLocation: ROUTE_STOPS[0].location,
  studentLocation: ROUTE_STOPS[2].location, // Default: Deux Plateaux
  stops: ROUTE_STOPS,
  currentStopIndex: 0,
  isSimulating: false,

  busData: {
    id: 'BUS-AGTS-01',
    location: ROUTE_STOPS[0].location,
    speed: 0,
    eta: 'En attente',
    routeName: 'Cocody → IIT Grand-Bassam',
    nextStop: ROUTE_STOPS[1].name,
    isRunning: false,
  },

  setStudentLocation: (loc) => set({ studentLocation: loc }),
  updateBusLocation: (loc) => set({ busLocation: loc }),

  startSimulation: () => {
    if (get().isSimulating) return;
    set({ isSimulating: true });
    
    // Ensure real location tracking is off
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }

    intervalId = setInterval(() => {
      const { currentStopIndex, stops, studentLocation, busData } = get();

      if (currentStopIndex >= stops.length - 1) {
        get().stopSimulation();
        return;
      }

      const nextIndex = currentStopIndex + 1;
      const nextStop = stops[nextIndex];

      const distKm = calculateDistance(
        nextStop.location.lat,
        nextStop.location.lng,
        studentLocation!.lat,
        studentLocation!.lng
      );

      const speedKmh = nextIndex > 2 ? 80 : 50;
      const minutes = distKm < 0.5 ? 1 : Math.ceil((distKm / speedKmh) * 60);
      const etaText = distKm < 0.5 ? "Arrivé à l'arrêt" : `${minutes} min`;

      set({
        busLocation: nextStop.location,
        currentStopIndex: nextIndex,
        busData: {
          ...busData!,
          location: nextStop.location,
          speed: speedKmh,
          eta: etaText,
          nextStop: nextIndex < stops.length - 1 ? stops[nextIndex + 1].name : 'Terminus',
          isRunning: true,
        },
      });
    }, 4000); // Updates every 4 seconds for demo
  },

  pauseSimulation: () => {
    if (intervalId) clearInterval(intervalId);
    set({ isSimulating: false });
    const { busData } = get();
    if (busData) {
        set({ busData: { ...busData, isRunning: false, speed: 0 } });
    }
  },

  stopSimulation: () => {
    if (intervalId) clearInterval(intervalId);
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }

    set({
      isSimulating: false,
      currentStopIndex: 0,
      busLocation: ROUTE_STOPS[0].location,
      busData: {
        id: 'BUS-AGTS-01',
        location: ROUTE_STOPS[0].location,
        speed: 0,
        eta: 'En attente',
        routeName: 'Cocody → IIT Grand-Bassam',
        nextStop: ROUTE_STOPS[1].name,
        isRunning: false,
      },
    });
  },
  
  startRealLocation: () => {
      // Stop simulation first
      get().stopSimulation();
      
      if ('geolocation' in navigator) {
          watchId = navigator.geolocation.watchPosition((position) => {
              const { latitude, longitude } = position.coords;
              const newLoc = { lat: latitude, lng: longitude };
              
              set({ busLocation: newLoc });
              
              const { busData } = get();
              if (busData) {
                  set({ busData: { 
                      ...busData, 
                      location: newLoc, 
                      isRunning: true, 
                      speed: position.coords.speed ? Math.round(position.coords.speed * 3.6) : 0 // m/s to km/h
                  }});
              }
          }, (error) => {
              console.error("Error getting location", error);
              // Fallback or alert user
          }, {
              enableHighAccuracy: true
          });
      }
  },

  shareLocationLink: () => {
    const loc = get().busLocation;
    return loc ? `https://www.google.com/maps?q=${loc.lat},${loc.lng}` : '';
  },
}));