import { useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { Toaster } from 'sonner';

// Écrans publics
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

// Dashboards
import StudentDashboard from './screens/StudentDashboard';
import DriverDashboard from './screens/DriverDashboard';

// Admin
import AdminLayout from './components/AdminLayout'; // ← chemin correct
import AdminDashboard from './screens/AdminDashboard';
import AdminBuses from './screens/AdminBuses';
import AdminMap from './screens/AdminMap';

// Écrans partagés
import RealTimeTracking from './screens/RealTimeTracking';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';

export default function App() {
  const { isAuthenticated, userRole } = useAuthStore();

  // Application du thème admin au chargement (persistance localStorage)
  useEffect(() => {
    const savedTheme = localStorage.getItem('agts-admin-theme');
    if (savedTheme) {
      document.documentElement.classList.remove('theme-default', 'theme-light-blue', 'theme-deep-pink', 'theme-dark-orange');
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  return (
    <div className="min-h-screen bg-agts-background font-sans text-agts-foreground">
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />

        {/* Dashboards protégés */}
        <Route
          path="/student/*"
          element={isAuthenticated && userRole === 'student' ? <StudentDashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/driver/*"
          element={isAuthenticated && userRole === 'driver' ? <DriverDashboard /> : <Navigate to="/login" replace />}
        />

        {/* Admin avec layout sidebar */}
        <Route
          path="/admin/*"
          element={isAuthenticated && userRole === 'admin' ? <AdminLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="buses" element={<AdminBuses />} />
          <Route path="map" element={<AdminMap />} />
          <Route path="settings" element={<div className="p-8 text-2xl">Paramètres Admin</div>} />
        </Route>

        {/* Routes partagées (connecté seulement) */}
        <Route path="/tracking" element={isAuthenticated ? <RealTimeTracking /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfileScreen /> : <Navigate to="/login" />} />
        <Route path="/notifications" element={isAuthenticated ? <NotificationScreen /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <SettingsScreen /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <ChatScreen /> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}