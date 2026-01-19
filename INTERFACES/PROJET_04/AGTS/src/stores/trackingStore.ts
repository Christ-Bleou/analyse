import { create } from 'zustand';
import { calculateDistance } from '../lib/utils';

// --- TYPES ---

export interface Location {
  lat: number;
  lng: number;
}

export interface Stop {
  name: string;
  location: Location;
}

export interface BusData {
  id: string;
  location: Location;
  speed: number;
  eta: string;          // Temps estimé vers IIT
  distance: string;     // Distance restante vers IIT (Automatisé)
  routeName: string;
  nextStop: string;
  isRunning?: boolean;
}

interface TrackingState {
  busLocation: Location | null;
  studentLocation: Location | null;
  busData: BusData | null;
  
  // Données statiques
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

// --- CONSTANTES ---

// Coordonnées EXACTES demandées pour IIT Grand-Bassam
const IIT_LOCATION = { lat: 5.2060, lng: -3.7350 };

// Arrêts demandés par l''utilisateur
const ROUTE_STOPS: Stop[] = [
  { name: 'Ibis', location: { lat: 5.3602, lng: -3.9674 } },
  { name: 'Champ Comando', location: { lat: 5.3700, lng: -3.9590 } },
  { name: 'Boulevard Félix Houphouet Boigny', location: { lat: 5.3730, lng: -3.9930 } },
  { name: 'IIT Campus (Terminus)', location: IIT_LOCATION },
];

let intervalId: any = null;

// --- STORE ---

export const useTrackingStore = create<TrackingState>((set, get) => ({
  busLocation: ROUTE_STOPS[0].location,
  studentLocation: null,
  stops: ROUTE_STOPS,
  currentStopIndex: 0,
  isSimulating: false,
  
  busData: {
    id: 'BUS-AGTS-01',
    location: ROUTE_STOPS[0].location,
    speed: 0,
    eta: 'En attente',
    distance: '0 km',
    routeName: 'Abidjan → IIT Grand-Bassam',
    nextStop: ROUTE_STOPS[1].name,
    isRunning: false,
  },

  setStudentLocation: (loc) => set({ studentLocation: loc }),
  updateBusLocation: (loc) => set({ busLocation: loc }),

  startSimulation: () => {
    if (get().isSimulating) return;
    
    set({ isSimulating: true });
    
    intervalId = setInterval(() => {
      const { currentStopIndex, stops, busData } = get();

      // Logique simple de boucle : on passe à l''arrêt suivant
      const nextIndex = (currentStopIndex + 1) % stops.length;
      const nextLocation = stops[nextIndex].location;
      
      // Simulation vitesse (entre 50 et 80 km/h)
      const currentSpeed = 50 + Math.random() * 30; 

      // --- CALCUL AUTOMATISÉ VERS IIT ---
      // 1. Calcul de la distance entre la position actuelle du bus et IIT
      const distToIIT = calculateDistance(
        nextLocation.lat, 
        nextLocation.lng, 
        IIT_LOCATION.lat, 
        IIT_LOCATION.lng
      );
      
      // 2. Calcul du temps (t = d/v) * 60 min
      const minutesToIIT = Math.round((distToIIT / currentSpeed) * 60);
      
      // 3. Formatage des textes
      const etaText = distToIIT < 0.2 ? "Arrivé à IIT" : `${minutesToIIT} min`;
      const distanceText = `${distToIIT.toFixed(1)} km`;

      // Mise à jour du store
      set({
        busLocation: nextLocation,
        currentStopIndex: nextIndex,
        busData: {
          ...busData!,
          location: nextLocation,
          speed: Math.round(currentSpeed),
          eta: etaText,           // Automatisé
          distance: distanceText, // Automatisé
          nextStop: stops[nextIndex].name,
          isRunning: true
        }
      });

    }, 3000); // Mise à jour toutes les 3 secondes
  },

  pauseSimulation: () => {
    if (intervalId) clearInterval(intervalId);
    set({ isSimulating: false });
    const { busData } = get();
    if(busData) set({ busData: { ...busData, isRunning: false, speed: 0 }});
  },

  stopSimulation: () => {
    if (intervalId) clearInterval(intervalId);
    set({
      isSimulating: false,
      currentStopIndex: 0,
      busLocation: ROUTE_STOPS[0].location,
      busData: {
        id: 'BUS-AGTS-01',
        location: ROUTE_STOPS[0].location,
        speed: 0,
        eta: 'Terminé',
        distance: '0 km',
        routeName: 'Abidjan → IIT Grand-Bassam',
        nextStop: ROUTE_STOPS[1].name,
        isRunning: false
      }
    });
  },

  startRealLocation: () => {
    console.log("Mode GPS réel activé");
    // (Logique GPS réel à insérer ici si besoin)
  },

  shareLocationLink: () => {
    const loc = get().busLocation;
    return loc ? `https://www.google.com/maps?q=${loc.lat},${loc.lng}` : '';
  }
}));