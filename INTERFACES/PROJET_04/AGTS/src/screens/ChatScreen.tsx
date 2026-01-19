import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTrackingStore } from '@/stores/trackingStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '../hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Send, MapPin } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  isLink?: boolean;
}

const initialMessages: Message[] = [
  { id: '1', text: 'Bonjour tout le monde ! Le trajet commence bientôt.', sender: 'other', timestamp: new Date(Date.now() - 600000) },
  { id: '2', text: 'Le bus est en route', sender: 'other', timestamp: new Date(Date.now() - 300000) },
];

export default function ChatScreen() {
  const { userRole } = useAuthStore();
  const { busLocation } = useTrackingStore();
  const { toast } = useToast();

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulation réponse
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Message reçu !',
        sender: 'other',
        timestamp: new Date(),
      }]);
    }, 800);
  };

  const sharePosition = () => {
    if (!busLocation) {
      toast({
        title: "Position indisponible",
        description: "La position du bus n'est pas encore connue.",
        variant: "destructive",
      });
      return;
    }
    const link = `https://www.google.com/maps?q=${busLocation.lat},${busLocation.lng}`;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: link,
      sender: 'me',
      timestamp: new Date(),
      isLink: true,
    };
    setMessages(prev => [...prev, newMsg]);
    toast({
      title: "Position partagée",
      description: "Lien Google Maps ajouté au chat.",
    });
  };

  const isDriver = userRole === 'driver';

  return (
    <>
      <Card className="h-screen flex flex-col pb-20">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Chat AGTS</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto pt-4">
          <div className="space-y-4 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.isLink ? (
                    <a
                      href={msg.text}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline flex items-center gap-1"
                    >
                      <MapPin className="w-4 h-4" />
                      Voir ma position sur Google Maps
                    </a>
                  ) : (
                    <p className="break-words">{msg.text}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        {/* Input fixe au-dessus de la BottomNav */}
        <div className="fixed bottom-20 left-0 right-0 bg-background border-t p-4 flex gap-2 z-40">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Écrivez un message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} size="icon">
            <Send className="w-5 h-5" />
          </Button>
          {isDriver && (
            <Button onClick={sharePosition} variant="secondary" size="icon">
              <MapPin className="w-5 h-5" />
            </Button>
          )}
        </div>
      </Card>
      <Toaster />
    </>
  );
}
