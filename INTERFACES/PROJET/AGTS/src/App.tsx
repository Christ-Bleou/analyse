import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Composants UI globaux
import { Toaster } from './components/ui/toaster';

// Écrans Publics
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

// Dashboards & Layouts
import StudentDashboard from './screens/StudentDashboard';
import DriverDashboard from './screens/DriverDashboard';
import AdminLayout from './components/AdminLayout'; // La Sidebar fixe
import AdminDashboard from './screens/AdminDashboard'; // Le contenu du dashboard

// Écrans Partagés / Secondaires
import RealTimeTracking from './screens/RealTimeTracking';
import ProfileScreen from './screens/ProfileScreen';
import NotificationScreen from './screens/NotificationScreen';
import SettingsScreen from './screens/SettingsScreen'; 

export default function App() {
  // On récupère l'état de connexion via le Store
  const { isAuthenticated, userRole } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-agts-background font-sans text-agts-foreground">
        <Routes>
          {/* ============================================================
              1️⃣ ROUTES PUBLIQUES (Accessibles à tous)
          ============================================================= */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegistrationScreen />} />
          
          {/* ============================================================
              2️⃣ ROUTE ÉTUDIANT (Protégée)
          ============================================================= */}
          <Route
            path="/student/*"
            element={
              isAuthenticated && userRole === 'student' ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ============================================================
              3️⃣ ROUTE CHAUFFEUR (Protégée)
          ============================================================= */}
          <Route
            path="/driver/*"
            element={
              isAuthenticated && userRole === 'driver' ? (
                <DriverDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ============================================================
              4️⃣ ROUTE ADMIN (Protégée + Sidebar Layout)
          ============================================================= */}
          <Route
            path="/admin"
            element={
              isAuthenticated && userRole === 'admin' ? (
                <AdminLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            {/* Ici, on utilise "index" pour dire : quand on est sur /admin tout court,
                on affiche AdminDashboard DANS le AdminLayout 
            */}
            <Route index element={<AdminDashboard />} />
            
            {/* Autres sous-pages admin */}
            <Route path="users" element={<div className="p-8 text-2xl">Gestion des Utilisateurs 👥</div>} />
            <Route path="buses" element={<div className="p-8 text-2xl">Gestion des Bus 🚌</div>} />
            <Route path="map" element={<div className="p-8 text-2xl">Carte Globale 🗺️</div>} />
            <Route path="settings" element={<div className="p-8 text-2xl">Paramètres Admin ⚙️</div>} />
          </Route>
          
          {/* ============================================================
              5️⃣ ROUTES PARTAGÉES (Nécessitent juste d'être connecté)
          ============================================================= */}
          <Route 
            path="/tracking" 
            element={isAuthenticated ? <RealTimeTracking /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <ProfileScreen /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/notifications" 
            element={isAuthenticated ? <NotificationScreen /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={isAuthenticated ? <SettingsScreen /> : <Navigate to="/login" />} 
          />

          {/* Route Fallback (Si page inconnue -> Login) */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
        
        {/* Notifications Toast (toujours visible) */}
        <Toaster />
      </div>
    </Router>
  );
}