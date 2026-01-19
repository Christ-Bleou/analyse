// src/screens/AdminDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import StatsCard from '../components/StatsCard';
import { Users, Bus, Map as MapIcon, TrendingUp, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function AdminDashboard() {
  const pieData = [
    { name: 'Actifs', value: 45 },
    { name: 'Inactifs', value: 5 },
  ];

  const barData = [
    { name: 'Lun', students: 45 },
    { name: 'Mar', students: 48 },
    { name: 'Mer', students: 42 },
    { name: 'Jeu', students: 47 },
    { name: 'Ven', students: 50 },
  ];

  const COLORS = ['hsl(0, 84%, 60%)', 'hsl(217 100% 34%'];

  return (
    <div className="bg-agts-background space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-agts-error">Tableau de bord</h1>
          <p className="text-gray-500">Vue d'ensemble de la flotte et des trajets.</p>
        </div>
        <Button className="bg-agts-error hover:bg-agts-foreground/90">
          <TrendingUp className="w-4 h-4 mr-2" />
          Télécharger le rapport
        </Button>
      </div>

      {/* Cartes de Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Chauffeurs actifs"
          value="12"
          icon={<Users className="w-6 h-6" />}
          trend="+2 ce mois"
        />
        <StatsCard
          title="Bus en service"
          value="8"
          icon={<Bus className="w-6 h-6" />}
          trend="100% opérationnels"
        />
        <StatsCard
          title="Routes actives"
          value="6"
          icon={<MapIcon className="w-6 h-6" />}
          trend="Cocody, Plateau, Yopougon"
        />
        <StatsCard
          title="Étudiants/jour"
          value="245"
          icon={<TrendingUp className="w-6 h-6" />}
          trend="+15% vs mois dernier"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Statut de la flotte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    // Correction TypeScript ici : typage explicite ou 'any'
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fréquentation Hebdomadaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #eee' }}
                  />
                  <Legend />
                  <Bar dataKey="students" name="Étudiants" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table des chauffeurs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestion des chauffeurs récents</CardTitle>
          <Button size="sm" className="bg-agts-secondary text-agts-foreground hover:bg-yellow-400">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Nom</th>
                  <th className="px-4 py-3">Bus</th>
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Kouadio Yao', bus: 'BUS-001', route: 'Cocody', status: 'Actif' },
                  { name: 'Bamba Sekou', bus: 'BUS-002', route: 'Plateau', status: 'Actif' },
                  { name: 'Traoré Issa', bus: 'BUS-003', route: 'Yopougon', status: 'Pause' },
                ].map((driver, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-gray-200 transition-colors">
                    <td className="px-4 py-3 font-medium">{driver.name}</td>
                    <td className="px-4 py-3">{driver.bus}</td>
                    <td className="px-4 py-3">{driver.route}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        driver.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-500 hover:underline font-medium">
                        Éditer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}