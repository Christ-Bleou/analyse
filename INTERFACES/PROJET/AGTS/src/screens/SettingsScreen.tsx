// src/screens/SettingsScreen.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { ArrowLeftIcon, MoonIcon, GlobeIcon, DatabaseIcon, InfoIcon } from 'lucide-react';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-1 text-white px-6 pt-12 pb-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-4 text-white hover:bg-white/10"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
          Retour
        </Button>
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>

      <div className="px-6 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <MoonIcon className="w-5 h-5 mr-2 text-primary" strokeWidth={1.5} />
              Apparence
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Personnalisez l'apparence de l'application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="text-foreground font-normal">Mode sombre</Label>
                <p className="text-sm text-muted-foreground">
                  Activer le thème sombre
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <GlobeIcon className="w-5 h-5 mr-2 text-primary" strokeWidth={1.5} />
              Langue
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Choisissez votre langue préférée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <DatabaseIcon className="w-5 h-5 mr-2 text-primary" strokeWidth={1.5} />
              Stockage
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Gérez l'espace de stockage de l'application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Cache</span>
                <span className="text-muted-foreground">12.5 MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Données hors ligne</span>
                <span className="text-muted-foreground">8.2 MB</span>
              </div>
              <Button variant="outline" className="w-full text-foreground border-border hover:bg-muted">
                Vider le cache
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <InfoIcon className="w-5 h-5 mr-2 text-primary" strokeWidth={1.5} />
              À propos de AGTS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Développé par</span>
              <span className="text-foreground">IIT Tech Team</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Licence</span>
              <span className="text-foreground">Propriétaire</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
