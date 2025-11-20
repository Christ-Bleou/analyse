import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTrackingStore } from '../stores/trackingStore';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction pour les icônes Leaflet par défaut qui manquent souvent
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  fullscreen?: boolean;
}

export default function MapView({ fullscreen = false }: MapViewProps) {
  const { busLocation, studentLocation } = useTrackingStore();

  // Coordonnées par défaut (Abidjan) si le store est vide
  const defaultPosition: [number, number] = [5.3599517, -4.0082563];
  
  const center = busLocation 
    ? [busLocation.lat, busLocation.lng] as [number, number]
    : defaultPosition;

  return (
    <div 
      className={`relative w-full z-0 ${fullscreen ? 'h-screen' : 'h-full'}`}
      style={{ minHeight: fullscreen ? '100vh' : '300px' }}
    >
      <MapContainer 
        center={center} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // On désactive le zoom par défaut pour le style mobile
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {busLocation && (
          <Marker position={[busLocation.lat, busLocation.lng]}>
            <Popup>
              Bus Scolaire <br /> En route vers Cocody
            </Popup>
          </Marker>
        )}

        {studentLocation && (
          <Marker position={[studentLocation.lat, studentLocation.lng]}>
            <Popup>
              Votre position
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}