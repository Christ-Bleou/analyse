// src/screens/SplashScreen.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BusIcon } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-1 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
            <BusIcon className="w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">AGTS</h1>
        <p className="text-xl text-white/90 font-light">
          Transport Scolaire Intelligent
        </p>
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 2, delay: 0.5 }}
        className="mt-16 h-1 bg-secondary rounded-full"
      />
    </div>
  );
}
