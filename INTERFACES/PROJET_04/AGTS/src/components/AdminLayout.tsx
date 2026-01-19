import { Outlet, Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { LayoutDashboard, Bus, Map, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function AdminLayout() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex w-64 flex-col bg-red-700 text-white p-6">
        <h1 className="text-3xl font-bold mb-10">AGTS Admin</h1>
        <nav className="flex-1 space-y-3">
          <Link to="/admin" className="flex items-center gap-4 p-3 hover:bg-red-600 rounded-lg text-lg">
            <LayoutDashboard size={24} /> Dashboard
          </Link>
          <Link to="/admin/buses" className="flex items-center gap-4 p-3 hover:bg-red-600 rounded-lg text-lg">
            <Bus size={24} /> Bus
          </Link>
          <Link to="/admin/map" className="flex items-center gap-4 p-3 hover:bg-red-600 rounded-lg text-lg">
            <Map size={24} /> Carte
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-4 p-3 hover:bg-red-600 rounded-lg text-lg">
            <Settings size={24} /> Paramètres
          </Link>
        </nav>
        <button onClick={logout} className="flex items-center gap-4 p-3 hover:bg-red-600 rounded-lg text-lg mt-auto">
          <LogOut size={24} /> Déconnexion
        </button>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto pb-20 md:pb-0">
          <Outlet />
        </div>
        <div className="md:hidden">
          <BottomNav role="admin" />
        </div>
      </div>
    </div>
  );
}