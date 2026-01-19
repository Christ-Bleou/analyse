import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, Search, Edit, Trash2, BusFront, Route } from 'lucide-react';

export default function AdminBuses() {
  // Mock data – à remplacer par un vrai backend plus tard
  const buses = [
    { id: 'BUS-01', plaque: 'AG-123-TS', chauffeur: 'Jean Dupont', statut: 'en route', trajetActuel: 'Marcory → IIT' },
    { id: 'BUS-02', plaque: 'AG-456-TS', chauffeur: 'Pierre Kouadio', statut: 'à l\'arrêt', trajetActuel: 'Non démarré' },
    { id: 'BUS-03', plaque: 'AG-789-TS', chauffeur: 'Marie Nguessan', statut: 'en maintenance', trajetActuel: '-' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBuses = buses.filter(bus =>
    bus.plaque.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.chauffeur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Gestion des Bus & Trajets</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" /> Ajouter un bus
        </Button>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par plaque ou chauffeur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <Card className="shadow-xl border-none">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium">ID Bus</th>
                <th className="text-left p-4 font-medium">Plaque</th>
                <th className="text-left p-4 font-medium">Chauffeur</th>
                <th className="text-left p-4 font-medium">Statut</th>
                <th className="text-left p-4 font-medium">Trajet actuel</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map((bus) => (
                <tr key={bus.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <BusFront className="w-6 h-6 text-blue-600" />
                    {bus.id}
                  </td>
                  <td className="p-4 font-mono">{bus.plaque}</td>
                  <td className="p-4">{bus.chauffeur}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      bus.statut === 'en route' ? 'bg-green-100 text-green-800' :
                      bus.statut === 'à l\'arrêt' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {bus.statut}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-2">
                    <Route className="w-5 h-5 text-gray-500" />
                    {bus.trajetActuel}
                  </td>
                  <td className="p-4 flex gap-3">
                    <Button size="icon" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}