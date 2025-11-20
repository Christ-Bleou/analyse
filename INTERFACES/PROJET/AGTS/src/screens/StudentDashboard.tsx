// src/screens/StudentDashboardScreen.tsx

import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import BottomNav from '../components/BottomNav';
import MapView from '../components/MapView';
import { CalendarIcon, CreditCardIcon, ClockIcon, MapPinIcon } from 'lucide-react';

function StudentHome() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-1 text-white px-6 pt-12 pb-8">
        <h1 className="text-3xl font-bold mb-2">
          Bonjour, {user?.firstName} 👋
        </h1>
        <p className="text-white/90 font-light">
          Votre bus arrive dans 5 minutes
        </p>
      </div>

      <div className="px-6 -mt-4">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Arrivée estimée</p>
                <p className="text-2xl font-bold text-foreground">5 min</p>
              </div>
              <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center">
                <ClockIcon className="w-8 h-8 text-tertiary" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Position en temps réel</h2>
          <div className="relative rounded-lg overflow-hidden" style={{ height: '300px' }}>
            <MapView />
            <Button
              className="absolute bottom-4 right-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            >
              <MapPinIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Voir en temps réel
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <CreditCardIcon className="w-5 h-5 mr-2 text-primary" strokeWidth={1.5} />
                Mon abonnement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Jours restants</p>
                  <p className="text-2xl font-bold text-foreground">23 jours</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Prochain paiement</p>
                  <p className="text-lg font-bold text-foreground">15 Jan 2025</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Renouveler
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-primary" strokeWidth={1.5} />
                Mes trajets récents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Aujourd'hui", time: '07:30', route: 'IIT - Cocody' },
                  { date: 'Hier', time: '07:35', route: 'IIT - Cocody' },
                  { date: '20 Déc', time: '07:28', route: 'IIT - Cocody' },
                ].map((trip, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-normal text-foreground">{trip.date}</p>
                      <p className="text-sm text-muted-foreground">{trip.route}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{trip.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StudentHome />} />
      </Routes>
      <BottomNav role="student" />
    </>
  );
}
