import fs from 'fs';
import path from 'path';

console.log("🔧 Démarrage de la réparation AGTS (via Node.js - ES Modules)...");

// 1. LE CODE COMPLET ET CORRIGÉ DU TRACKING STORE (Route Bassam)
const trackingStoreContent = `import { create } from 'zustand';
import { calculateDistance } from '../lib/utils';

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
  nextStop: string;
}

interface TrackingState {
  busLocation: Location | null;
  studentLocation: Location | null;
  busData: BusData | null;
  routePath: Location[];
  currentRouteIndex: number;
  isSimulating: boolean;
  
  startSimulation: () => void;
  stopSimulation: () => void;
  updateBusLocation: (loc: Location) => void;
}

// ITINÉRAIRE: MARCORY -> KOUMASSI -> GRAND-BASSAM
const REAL_ROUTE: Location[] = [
    { lat: 5.306388, lng: -3.977500 }, // Ibis Marcory
    { lat: 5.304500, lng: -3.976000 },
    { lat: 5.301000, lng: -3.973000 },
    { lat: 5.298000, lng: -3.968000 },
    { lat: 5.294444, lng: -3.961111 }, // Champ Commando
    { lat: 5.280000, lng: -3.940000 },
    { lat: 5.260000, lng: -3.900000 }, // Autoroute
    { lat: 5.240000, lng: -3.850000 },
    { lat: 5.205600, lng: -3.735000 }, // IIT Bassam
];

let intervalId: any = null;

export const useTrackingStore = create<TrackingState>((set, get) => ({
  busLocation: REAL_ROUTE[0],
  studentLocation: { lat: 5.294444, lng: -3.961111 },
  routePath: REAL_ROUTE,
  currentRouteIndex: 0,
  isSimulating: false,

  busData: {
    id: 'BUS-AGTS-01',
    location: REAL_ROUTE[0],
    speed: 0,
    eta: 'En attente',
    routeName: 'Marcory ➜ Grand-Bassam',
    nextStop: 'Champ Commando',
  },

  updateBusLocation: (loc) => set({ busLocation: loc }),

  startSimulation: () => {
    if (get().isSimulating) return;
    set({ isSimulating: true });

    intervalId = setInterval(() => {
      const { currentRouteIndex, routePath, studentLocation, busData } = get();
      
      if (currentRouteIndex >= routePath.length - 1) {
        set({ busData: { ...busData!, eta: "TERMINÉ", speed: 0, nextStop: "Terminus" }, isSimulating: false });
        clearInterval(intervalId);
        return;
      }

      const nextIndex = currentRouteIndex + 1;
      const newLocation = routePath[nextIndex];
      const distKm = calculateDistance(newLocation.lat, newLocation.lng, studentLocation!.lat, studentLocation!.lng);
      
      const simulatedSpeed = nextIndex > 5 ? 80 : 40; 
      let etaText = "";
      
      if (distKm < 0.2) {
          etaText = "Arrivée imminente";
      } else if (distKm > 50) {
          etaText = "Passé";
      } else {
          // Calcul dynamique
          etaText = \`\${Math.ceil((distKm / simulatedSpeed) * 60)} min\`;
      }

      set({
        busLocation: newLocation,
        currentRouteIndex: nextIndex,
        busData: {
          ...busData!,
          location: newLocation,
          speed: simulatedSpeed, 
          eta: etaText,
          nextStop: nextIndex < 5 ? "Champ Commando" : "IIT Bassam"
        }
      });
    }, 2000);
  },

  stopSimulation: () => {
    if (intervalId) clearInterval(intervalId);
    set({ isSimulating: false });
  }
}));
`;

// Écriture du fichier TrackingStore
try {
    const storePath = path.join('src', 'stores', 'trackingStore.ts');
    fs.writeFileSync(storePath, trackingStoreContent, 'utf8');
    console.log("✅ src/stores/trackingStore.ts réécrit avec succès.");
} catch (e) {
    console.error("❌ Erreur lors de l'écriture du store:", e);
}

// 2. RÉPARATION DE MAIN.TSX (Injection CSS Leaflet)
try {
    const mainPath = path.join('src', 'main.tsx');
    if (fs.existsSync(mainPath)) {
        let mainContent = fs.readFileSync(mainPath, 'utf8');
        
        // On vérifie si leaflet.css est déjà présent pour ne pas l'ajouter deux fois
        if (!mainContent.includes("leaflet.css")) {
            mainContent = mainContent.replace(
                "import './index.css'", 
                "import './index.css';\nimport 'leaflet/dist/leaflet.css'"
            );
            fs.writeFileSync(mainPath, mainContent, 'utf8');
            console.log("✅ CSS Leaflet injecté dans main.tsx");
        } else {
            console.log("ℹ️ main.tsx contient déjà le CSS Leaflet.");
        }
    } else {
        console.error("❌ Impossible de trouver src/main.tsx");
    }
} catch (e) {
    console.error("❌ Erreur lors de la modification de main.tsx:", e);
}

// 3. RÉPARATION DE INDEX.CSS (Suppression syntaxe Tailwind v4 incorrecte)
const indexCssContent = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Styles de base */
html, body, #root {
  height: 100%;
  margin: 0;
}

/* Animation Fade In */
@layer utilities {
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0px); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
}

:root {
  --agts-primary: hsl(217, 100%, 34%);
  --agts-secondary: hsl(46, 100%, 50%);
  --agts-accent: hsl(203, 63%, 60%);
  --agts-background: hsl(220, 15%, 98%);
  --agts-foreground: hsl(0, 0%, 12%);
  --agts-border: hsl(210, 15%, 90%);
  --agts-success: hsl(142, 64%, 47%);
  --agts-warning: hsl(25, 95%, 53%);
  --agts-error: hsl(0, 84%, 60%);
  
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}

* {
  border-color: var(--border);
}
body {
  background-color: var(--background);
  color: var(--foreground);
}
`;

try {
    const cssPath = path.join('src', 'index.css');
    fs.writeFileSync(cssPath, indexCssContent, 'utf8');
    console.log("✅ src/index.css réécrit (Nettoyage syntaxe v4 incorrecte).");
} catch (e) {
    console.error("❌ Erreur lors de l'écriture de index.css:", e);
}

console.log("🚀 Réparation terminée ! Tu peux lancer : npm run dev");