// src/screens/ProfileScreen.tsx
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ArrowLeftIcon, UserIcon, MailIcon, PhoneIcon, LogOutIcon, EditIcon } from 'lucide-react';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = () => {
    if (!user) return 'U';
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-1 text-black px-6 pt-12 pb-24">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-4 text-black hover:bg-red-600 shadow-lg"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
          Retour
        </Button>
        <h1 className="text-3xl font-bold">Mon Profil</h1>
      </div>

      <div className="px-6 -mt-16">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-muted-foreground capitalize">{user?.role}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <UserIcon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="text-sm text-muted-foreground">Nom complet</p>
                  <p className="text-foreground font-normal">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <MailIcon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-normal">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <PhoneIcon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="text-foreground font-normal">+225 XX XX XX XX XX</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <EditIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
            Modifier le profil
          </Button>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full text-destructive border-destructive hover:bg-destructive/10"
          >
            <LogOutIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
}
