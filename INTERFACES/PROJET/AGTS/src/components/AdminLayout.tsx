import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { 
  LayoutDashboard, 
  Users, 
  Bus, 
  Map as MapIcon, 
  Settings, 
  LogOut, 
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Vue d\'ensemble', path: '/admin' },
    { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
    { icon: Bus, label: 'Gestion des Bus', path: '/admin/buses' },
    { icon: MapIcon, label: 'Carte en direct', path: '/admin/map' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (Barre latérale) */}
      <aside 
        className={`bg-agts-primary text-white fixed h-full z-20 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-20'
        } hidden md:flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {sidebarOpen && <h1 className="text-2xl font-bold tracking-wider">AGTS</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center p-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-agts-secondary text-agts-primary font-bold shadow-lg' 
                    : 'hover:bg-white/10 text-white/80'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {sidebarOpen && <span className="ml-3 whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg hover:bg-red-500/20 text-red-200 hover:text-red-100 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="ml-3">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Contenu Principal */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} p-8`}>
        <Outlet /> {/* C'est ici que s'afficheront le Dashboard, les Utilisateurs, etc. */}
      </main>
    </div>
  );
}