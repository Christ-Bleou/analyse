// src/screens/LoginScreen.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'; // On utilise Tabs au lieu de Select
import { useToast } from '../hooks/use-toast';
import { EyeIcon, EyeOffIcon, BusIcon } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // On gère le rôle ici (student par défaut)
  const [role, setRole] = useState<'student' | 'driver' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password, role); // On passe le rôle sélectionné
      
      toast({
        title: 'Connexion réussie',
        description: `Bienvenue sur AGTS (${role === 'student' ? 'Étudiant' : role === 'driver' ? 'Chauffeur' : 'Admin'})`,
      });
      
      // Redirection intelligente selon le rôle
      if (role === 'student') navigate('/student');
      else if (role === 'driver') navigate('/driver');
      else navigate('/admin');

    } catch (error) {
      toast({
        title: 'Erreur de connexion',
        description: 'Email ou mot de passe incorrect',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agts-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Logo et Titre */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-agts-error rounded-full mb-4 shadow-lg">
            <BusIcon className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-agts-error mb-2">AGTS</h1>
          <p className="text-gray-500">Connectez-vous à votre compte</p>
        </div>

        <Card className="border-agts-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-agts-error">Se connecter</CardTitle>
            <CardDescription>
              Entrez vos identifiants pour accéder à votre espace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* SÉLECTION DU RÔLE (Onglets au lieu de Select) */}
              <div className="space-y-2">
                <Label>Vous êtes :</Label>
                <Tabs 
                    value={role} 
                    onValueChange={(v) => setRole(v as any)} 
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                        <TabsTrigger value="student" className="data-[state=active]:bg-white data-[state=active]:text-agts-error data-[state=active]:shadow-sm">
                            Étudiant
                        </TabsTrigger>
                        <TabsTrigger value="driver" className="data-[state=active]:bg-white data-[state=active]:text-agts-error data-[state=active]:shadow-sm">
                            Chauffeur
                        </TabsTrigger>
                        <TabsTrigger value="admin" className="data-[state=active]:bg-white data-[state=active]:text-agts-error data-[state=active]:shadow-sm">
                            Admin
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={role === 'student' ? "etudiant@iit.ci" : role === 'driver' ? "chauffeur@agts.ci" : "admin@agts.ci"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-agts-error transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" strokeWidth={1.5} />
                    ) : (
                      <EyeIcon className="w-5 h-5" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-agts-error hover:bg-red-700 text-white font-bold py-2 shadow-md hover:shadow-lg transition-all"
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>

              <div className="text-center text-sm text-gray-500">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-agts-secondary hover:underline font-semibold">
                  Créer un compte
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}