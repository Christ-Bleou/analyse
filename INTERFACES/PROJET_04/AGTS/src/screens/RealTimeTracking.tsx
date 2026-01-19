// src/screens/RealTimeTracking.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrackingStore } from '../stores/trackingStore';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import MapView from '../components/MapView';
import { ArrowLeftIcon, NavigationIcon, ClockIcon, GaugeIcon } from 'lucide-react';

export default function RealTimeTracking() {
  const navigate = useNavigate();
  const { busData } = useTrackingStore();
  const [centered, setCentered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-screen">
        <MapView fullscreen />
        
        <Button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-red-500 text-foreground hover:bg-red-600 shadow-lg"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
          Retour
        </Button>

        <Button
          onClick={() => setCentered(!centered)}
          className="absolute top-4 right-4 bg-red-500 text-primary-background hover:bg-red-600/90 shadow-lg"
        >
          <NavigationIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
          Centrer sur soi même
        </Button>

        <Card className="absolute bottom-4 left-4 right-4 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Route</p>
                <p className="text-xl font-bold text-foreground">{busData?.routeName}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <NavigationIcon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ClockIcon className="w-5 h-5 text-tertiary" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-muted-foreground">ETA</p>
                <p className="text-lg font-bold text-foreground">{busData?.eta}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <GaugeIcon className="w-5 h-5 text-tertiary" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-muted-foreground">Vitesse</p>
                <p className="text-lg font-bold text-foreground">{busData?.speed} km/h</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <NavigationIcon className="w-5 h-5 text-tertiary" strokeWidth={1.5} />
                </div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="text-lg font-bold text-foreground">{busData?.distance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
