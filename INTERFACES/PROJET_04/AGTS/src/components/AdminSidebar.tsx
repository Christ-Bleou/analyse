import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { LayoutDashboardIcon, UsersIcon, BusIcon, RouteIcon, SettingsIcon, LogOutIcon } from 'lucide-react';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { icon: LayoutDashboardIcon, label: 'Tableau de bord', path: '/admin' },
    { icon: UsersIcon, label: 'Chauffeurs', path: '/admin/drivers' },
    { icon: BusIcon, label: 'Bus', path: '/admin/buses' },
    { icon: RouteIcon, label: 'Routes', path: '/admin/routes' },
    { icon: SettingsIcon, label: 'Paramètres', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="bg-agts-error fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col shadow-lg">
      {/* En-tête */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <BusIcon className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AGTS</h2>
            <p className="text-sm text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                ${active
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5}/>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <Separator />

      {/* Déconnexion */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full"
        >
          <LogOutIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
