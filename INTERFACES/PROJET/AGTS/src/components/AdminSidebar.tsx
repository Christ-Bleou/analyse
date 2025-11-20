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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <BusIcon className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">AGTS</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-normal">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <Separator />

      <div className="p-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full text-destructive border-destructive hover:bg-destructive/10"
        >
          <LogOutIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
