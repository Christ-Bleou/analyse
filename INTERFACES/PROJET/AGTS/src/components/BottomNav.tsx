import { useNavigate, useLocation } from 'react-router-dom';
import { HomeIcon, MapIcon, BellIcon, UserIcon } from 'lucide-react';

interface BottomNavProps {
  role: 'student' | 'driver';
}

export default function BottomNav({ role }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = `/${role}`;

  const navItems = [
    { icon: HomeIcon, label: 'Accueil', path: basePath },
    { icon: MapIcon, label: 'Carte', path: '/tracking' },
    { icon: BellIcon, label: 'Notifications', path: '/notifications' },
    { icon: UserIcon, label: 'Profil', path: '/profile' },
  ];

  const isActive = (path: string) => {
    if (path === basePath) {
      return location.pathname === basePath || location.pathname === `${basePath}/`;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-20 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 min-w-64px py-2 px-3 rounded-lg transition-colors ${
                active
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-xs font-light">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
