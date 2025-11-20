// src/screens/DriverDashboard.tsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import BottomNav from '../components/BottomNav';
import MapView from '../components/MapView';
import { UsersIcon, MapPinIcon, PlayIcon, SquareIcon } from 'lucide-react';

function DriverHome() {
  const user = useAuthStore((state) => state.user);
  const [tripActive, setTripActive] = useState(false);

  const students = [
    { id: '1', name: 'Kouassi Samuel', status: 'present', time: '07:30' },
    { id: '2', name: 'Marie Joseph', status: 'present', time: '07:32' },
    { id: '3', name: 'Koffi Ornella', status: 'absent', time: '-' },
    { id: '4', name: 'Traoré Kader', status: 'present', time: '07:35' },
  ];

  return (
    <div className="min-h-screen bg-agts-background pb-24">
      {/* En-tête Chauffeur */}
      <div className="bg-agts-gradient-blue text-white px-6 pt-12 pb-8">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenue, {user?.firstName || "Chauffeur"} 🚍
        </h1>
        <p className="text-white/90 font-light">
          Route IIT - Cocody
        </p>
      </div>

      <div className="px-6 -mt-4">
        {/* Carte et Statut */}
        <div className="mb-6">
          <div className="relative rounded-lg overflow-hidden shadow-md border border-agts-border" style={{ height: '300px' }}>
            <MapView />
            <div className="absolute top-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg z-[400]">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Statut</p>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${tripActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                <p className="font-bold text-agts-foreground">
                  {tripActive ? 'En cours' : 'En attente'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => setTripActive(true)}
            disabled={tripActive}
            className={`text-white font-bold ${
                tripActive ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'bg-agts-success hover:bg-green-600'
            }`}
          >
            <PlayIcon className="w-5 h-5 mr-2" strokeWidth={2} />
            Démarrer
          </Button>
          
          <Button
            onClick={() => setTripActive(false)}
            disabled={!tripActive}
            className={`text-white font-bold ${
                !tripActive ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            <SquareIcon className="w-5 h-5 mr-2" strokeWidth={2} />
            Terminer
          </Button>
        </div>

        {/* Liste des étudiants */}
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

        {/* Liste des arrêts */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-agts-foreground flex items-center text-lg">
              <MapPinIcon className="w-5 h-5 mr-2 text-agts-primary" strokeWidth={1.5} />
              Arrêts du jour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Cocody Centre', time: '07:30', completed: true },
                { name: 'Riviera Palmeraie', time: '07:45', completed: true },
                { name: 'Deux Plateaux', time: '08:00', completed: false },
                { name: 'IIT Campus', time: '08:15', completed: false },
              ].map((stop, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        stop.completed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className={`font-medium ${stop.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                          {stop.name}
                      </p>
                      <p className="text-xs text-gray-400">{stop.time}</p>
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
