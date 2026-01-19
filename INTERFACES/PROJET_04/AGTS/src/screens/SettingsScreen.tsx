// src/screens/SettingsScreen.tsx
import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import BottomNav from '../components/BottomNav';

export default function SettingsScreen() {
  const { userRole } = useAuthStore();

  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('agts-admin-theme') || 'theme-default');

  const handleThemeChange = (newTheme: string) => {
    document.documentElement.classList.remove('theme-default', 'theme-light-blue', 'theme-deep-pink', 'theme-dark-orange');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('agts-admin-theme', newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

        {/* Section thème (visible seulement pour admin) */}
        {userRole === 'admin' && (
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Thème Admin</label>
            <select
              value={currentTheme}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="w-full p-3 bg-white border border-border rounded-lg shadow-sm"
            >
              <option value="theme-default">Par défaut (Blanc clair)</option>
              <option value="theme-light-blue">Bleu clair</option>
              <option value="theme-deep-pink">Rose profond</option>
              <option value="theme-dark-orange">Orange foncé</option>
            </select>
            <p className="text-xs text-muted-foreground mt-2">Change la couleur principale de l'interface admin.</p>
          </div>
        )}

        {/* Autres paramètres partagés (pour tous les rôles) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Notifications Push</span>
            <input type="checkbox" checked className="toggle toggle-primary" />
          </div>
          <div className="flex justify-between items-center">
            <span>Mode sombre</span>
            <input type="checkbox" className="toggle toggle-primary" />
          </div>
          {/* Ajoute d'autres options si tu veux */}
        </div>
      </div>
      <BottomNav role={userRole || 'student'} />
    </div>
  );
}
