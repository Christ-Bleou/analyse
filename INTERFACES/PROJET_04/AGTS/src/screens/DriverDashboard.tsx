import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTrackingStore, Stop } from '../stores/trackingStore';
import { useHistoryStore } from '@/stores/historyStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import BottomNav from '../components/BottomNav';
import MapView from '../components/MapView';
import { MapPinIcon, PlayIcon, PauseIcon, SquareIcon, Share2Icon, NavigationIcon, Clock } from 'lucide-react';

function DriverHome() {
  const { user } = useAuthStore();
  const { trips, addTrip } = useHistoryStore();
  const {
    startSimulation,
    pauseSimulation,
    stopSimulation,
    startRealLocation,
    shareLocationLink,
    isSimulating,
    busData,
    stops,
    currentStopIndex,
  } = useTrackingStore();

  const handleShare = () => {
    const link = shareLocationLink();
    if (navigator.userAgent.match(/Android|iPhone/i)) {
      window.open(link, '_blank');
    } else {
      navigator.clipboard.writeText(link);
      alert('Lien Google Maps copié dans le presse-papiers ! 📍');
    }
  };

  const stopTimes = ['07:30', '07:45', '08:00', '08:15'];

  return (
    <div className="min-h-screen bg-agts-background pb-24">
      <div className="bg-agts-gradient-blue text-black px-6 pt-12 pb-8">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenue, {user?.firstName || "Chauffeur"} 🚍
        </h1>
        <p className="text-black/90 font-light">
          {busData?.routeName || 'Cocody → IIT Grand-Bassam'}
        </p>
      </div>

      <div className="px-6 -mt-4">
        <div className="mb-6">
          <div className="relative rounded-lg overflow-hidden shadow-md border border-agts-border" style={{ height: '300px' }}>
            <MapView />
            <div className="absolute top-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg z-[400]">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Statut</p>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isSimulating || busData?.isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <p className="font-bold text-agts-foreground">
                  {isSimulating || busData?.isRunning ? 'En cours' : 'En attente'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button onClick={startSimulation} disabled={isSimulating} className="bg-green-500 hover:bg-green-600 text-white">
            <PlayIcon className="w-5 h-5 mr-2" /> Simulation
          </Button>
          
          <Button onClick={startRealLocation} disabled={isSimulating} className="bg-red-600 hover:bg-red-700 text-white">
            <NavigationIcon className="w-5 h-5 mr-2" /> Mode GPS Réel
          </Button>

          <Button onClick={pauseSimulation} variant="secondary" disabled={!isSimulating} className="col-span-1">
            <PauseIcon className="w-5 h-5 mr-2" /> Pause
          </Button>
          
          <Button onClick={stopSimulation} variant="destructive" className="col-span-1">
            <SquareIcon className="w-5 h-5 mr-2" /> Arrêter
          </Button>
          
          <Button onClick={handleShare} variant="outline" className="col-span-2 border-agts-primary text-agts-primary hover:bg-blue-50">
            <Share2Icon className="w-5 h-5 mr-2" /> Partager ma position
          </Button>
        </div>

        {/* MES DERNIERS TRAJETS */}
        <Card className="mb-24 shadow-xl border-none">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <Clock className="w-6 h-6 text-orange-600" />
              Mes trajets récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trips.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Aucun trajet terminé aujourd’hui.
              </p>
            ) : (
              <div className="space-y-4">
                {trips.map(((trip) => (
                  <div
                    key={trip.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border"
                  >
                    <div>
                      <p className="font-bold text-gray-900">{trip.route}</p>
                      <p className="text-sm text-gray-600">{trip.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-bold">{trip.duration}</p>
                      <p className="text-sm text-gray-500">{trip.distance}</p>
                    </div>
                  </div>
                )))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-agts-foreground flex items-center text-lg">
              <MapPinIcon className="w-5 h-5 mr-2 text-agts-error" strokeWidth={1.5} />
              Points d'arrêts étudiant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stops && stops.map((stop: Stop, index: number) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index < currentStopIndex
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          index < currentStopIndex ? 'text-gray-800' : 'text-gray-500'
                        }`}
                      >
                        {stop.name}
                      </p>
                      <p className="text-xs text-gray-400">{stopTimes[index] || '-'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DriverDashboard() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DriverHome />} />
      </Routes>
      <BottomNav role="driver" />
    </>
  );
}


