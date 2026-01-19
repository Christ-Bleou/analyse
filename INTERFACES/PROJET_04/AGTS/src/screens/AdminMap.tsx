import MapView from '../components/MapView';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useTrackingStore } from '../stores/trackingStore';

export default function AdminMap() {
  const { busData, isSimulating } = useTrackingStore();

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Carte Globale – Suivi en Temps Réel</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-none h-full">
            <CardContent className="p-0 h-96 lg:h-full">
              <MapView />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="shadow-xl border-none">
            <CardHeader>
              <CardTitle className="text-xl">Informations Bus AGTS-01</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Statut</span>
                <span className={`font-bold ${isSimulating ? 'text-green-600' : 'text-red-600'}`}>
                  {isSimulating ? 'En route' : 'À l\'arrêt'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Vitesse actuelle</span>
                <span className="font-bold text-2xl">{busData?.speed || 0} km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">ETA IIT</span>
                <span className="font-bold text-2xl text-green-600">{busData?.etaIIT || '-- min'}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-none">
            <CardHeader>
              <CardTitle className="text-xl">Légende</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
                <span>Bus en mouvement</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                <span>Arrêt passé</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                <span>Arrêt futur</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                <span>Terminus IIT</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}