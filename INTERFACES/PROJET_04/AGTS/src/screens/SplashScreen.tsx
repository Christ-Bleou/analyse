import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect vers login après 2s (simule chargement)
    const timer = setTimeout(() => navigate('/login'), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-red-600">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">AGTS</h1>
        <p className="text-2xl">Transport Scolaire Intelligent</p>
        <div className="mt-8 animate-pulse">Chargement...</div>
      </div>
    </div>
  );
}
