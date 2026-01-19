import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTrackingStore } from '../stores/trackingStore';
import { useHistoryStore } from '@/stores/historyStore';
import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import BottomNav from '../components/BottomNav';
import MapView from '../components/MapView';
import { CreditCardIcon, ClockIcon, MapPinIcon, MapPin, Bus, Clock } from 'lucide-react';
import { useEffect } from 'react';

function StudentHome() {
  const { user } = useAuthStore();
  const { trips } = useHistoryStore();

  const { toast } = useToast();
  const {
    busData,
    stops,
    studentLocation,
    setStudentLocation,
    isSimulating,
  } = useTrackingStore();

  const currentStopName = stops.find(
    (s) => s.location.lat === studentLocation?.lat && s.location.lng === studentLocation?.lng
  )?.name || stops[0].name;

  useEffect(() => {
    if (busData?.eta && (busData.eta === "Arrivé à l'arrêt" || busData.eta === '1 min')) {
      toast({
        title: "🚌 Bus proche !",
        description: "Votre bus arrive à votre arrêt.",
      });
    }
  }, [busData?.eta, toast]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-agts-gradient-blue text-black px-6 pt-12 pb-8">
        <h1 className="text-3xl font-bold mb-2">
          Bonjour, {user?.firstName} 👋
        </h1>
        <p className="text-black/90 font-light">
          {isSimulating
            ? `Arrivée estimée : ${busData?.eta || 'Calcul...'}`
            : 'En attente du départ du chauffeur'}
        </p>
      </div>

      <div className="px-6 -mt-4">
        {/* Sélecteur d'arrêt */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Mon arrêt aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={currentStopName}
              onValueChange={(value) => {
                const stop = stops.find((s) => s.name === value);
                if (stop) setStudentLocation(stop.location);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisissez votre arrêt" />
              </SelectTrigger>
              <SelectContent>
                {stops.map((stop) => (
                  <SelectItem key={stop.name} value={stop.name}>
                    {stop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* ETA */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Arrivée estimée à votre arrêt</p>
                <p className="text-2xl font-bold text-foreground">
                  {busData?.eta || 'En attente'}
                </p>
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <ClockIcon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carte */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Position en temps réel</h2>
          <div className="relative rounded-lg overflow-hidden" style={{ height: '300px' }}>
            <MapView />
            <Button className="absolute bottom-4 right-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
              <MapPinIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Voir en temps réel
            </Button>
          </div>
        </div>

        {/* Abonnement et trajets récents (inchangés) */}
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
                  <p className="text-lg font-bold text-foreground">19 Feb 2026</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Renouveler
              </Button>
            </CardContent>
          </Card>

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

