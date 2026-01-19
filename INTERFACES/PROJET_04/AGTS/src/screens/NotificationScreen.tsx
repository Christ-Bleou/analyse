// src/screens/NotificationScreen.tsx
import { useNavigate } from 'react-router-dom';
import { useNotificationStore } from '../stores/notificationStore';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeftIcon, BellIcon, InfoIcon, AlertTriangleIcon, CheckCircleIcon, Trash2Icon } from 'lucide-react';

export default function NotificationScreen() {
  const navigate = useNavigate();
  const { notifications, markAsRead, clearAll } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-success" strokeWidth={1.5} />;
      case 'warning':
        return <AlertTriangleIcon className="w-5 h-5 text-warning" strokeWidth={1.5} />;
      case 'error':
        return <AlertTriangleIcon className="w-5 h-5 text-destructive" strokeWidth={1.5} />;
      default:
        return <InfoIcon className="w-5 h-5 text-tertiary" strokeWidth={1.5} />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-1 text-black px-6 pt-12 pb-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="absolute top-4 left-4 bg-red-500 text-foreground hover:bg-red-600 shadow-lg"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" strokeWidth={1.5} />
          Retour
        </Button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BellIcon className="w-8 h-8" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold">Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <Button
              onClick={clearAll}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-red-500 text-black hover:bg-red-600/10 shadow-lg"
            >
              <Trash2Icon className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Tout effacer
            </Button>
          )}
        </div>
      </div>

      <div className="px-6 py-6">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BellIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
              <p className="text-muted-foreground">Aucune notification</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors ${!notification.read ? 'bg-primary/5' : ''
                  }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="py-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-foreground">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
