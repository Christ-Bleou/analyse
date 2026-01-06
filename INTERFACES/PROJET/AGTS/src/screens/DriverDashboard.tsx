import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTrackingStore, Stop } from '../stores/trackingStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import BottomNav from '../components/BottomNav';
import MapView from '../components/MapView';
import { UsersIcon, MapPinIcon, PlayIcon, PauseIcon, SquareIcon, Share2Icon, NavigationIcon } from 'lucide-react';

function DriverHome() {
  const { user } = useAuthStore();
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

  const students = [
    { id: '1', name: 'Kouassi Samuel', status: 'present', time: '07:30' },
    { id: '2', name: 'Marie Joseph', status: 'present', time: '07:32' },
    { id: '3', name: 'Koffi Ornella', status: 'absent', time: '-' },
    { id: '4', name: 'Traoré Kader', status: 'present', time: '07:35' },
  ];

  return (
    <div className="min-h-screen bg-agts-background pb-24">
      <div className="bg-agts-gradient-blue text-white px-6 pt-12 pb-8">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenue, {user?.firstName || "Chauffeur"} 🚍
        </h1>
        <p className="text-white/90 font-light">
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
          <Button onClick={startSimulation} disabled={isSimulating} className="bg-agts-success hover:bg-green-600 text-white">
            <PlayIcon className="w-5 h-5 mr-2" /> Simulation
          </Button>
          
          <Button onClick={startRealLocation} disabled={isSimulating} className="bg-blue-600 hover:bg-blue-700 text-white">
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

        <Card>
          <CardHeader>
            <CardTitle className="text-agts-foreground flex items-center text-lg">
              <UsersIcon className="w-5 h-5 mr-2 text-agts-primary" strokeWidth={1.5} />
              Étudiants inscrits aujourd'hui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between py-3 border-b border-agts-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        student.status === 'present' ? 'bg-agts-success' : 'bg-red-400'
                      }`}
                    />
                    <div>
                      <p className="font-medium text-agts-foreground">{student.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {student.status === 'present' ? 'Présent' : 'Absent'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-mono text-gray-600">{student.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-agts-foreground flex items-center text-lg">
              <MapPinIcon className="w-5 h-5 mr-2 text-agts-primary" strokeWidth={1.5} />
              Arrêts du jour
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