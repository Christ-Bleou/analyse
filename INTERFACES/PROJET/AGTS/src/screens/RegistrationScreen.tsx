// src/screens/RegistrationScreen.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { EyeIcon, EyeOffIcon, BusIcon } from 'lucide-react';

export default function RegistrationScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const register = useAuthStore((state) => state.register);
  
  const [activeTab, setActiveTab] = useState<'student' | 'driver'>('student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    studentId: '',
    licenseNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: activeTab,
      });
      
      toast({
        title: 'Compte créé avec succès',
        description: 'Bienvenue sur AGTS',
      });
      
      if (activeTab === 'student') navigate('/student');
      else navigate('/driver');
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la création du compte',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4">
            <BusIcon className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AGTS</h1>
          <p className="text-muted-foreground">Créez votre compte</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Inscription</CardTitle>
            <CardDescription className="text-muted-foreground">
              Choisissez votre type de compte et remplissez le formulaire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="text-foreground">Étudiant</TabsTrigger>
                <TabsTrigger value="driver" className="text-foreground">Chauffeur</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="bg-background text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Kouassi"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@iit.ci"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+225 XX XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-background text-foreground"
                  />
                </div>

                <TabsContent value="student" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-foreground">Numéro étudiant</Label>
                    <Input
                      id="studentId"
                      placeholder="IIT-2024-XXXX"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      required
                      className="bg-background text-foreground"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="driver" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber" className="text-foreground">Numéro de permis</Label>
                    <Input
                      id="licenseNumber"
                      placeholder="CI-XXXX-XXXX"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      required
                      className="bg-background text-foreground"
                    />
                  </div>
                </TabsContent>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      className="bg-background text-foreground pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" strokeWidth={1.5} />
                      ) : (
                        <EyeIcon className="w-5 h-5" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="bg-background text-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Création...' : 'Créer mon compte'}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Déjà un compte ?{' '}
                  <Link to="/login" className="text-primary hover:text-primary/80 font-normal">
                    Se connecter
                  </Link>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
