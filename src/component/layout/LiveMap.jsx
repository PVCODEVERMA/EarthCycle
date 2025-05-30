import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function LiveMap({ pickupLocation }) {
  return (
    <MapContainer center={pickupLocation} zoom={13} className="h-64 w-full rounded-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={pickupLocation}>
        <Popup>Pickup Location</Popup>
      </Marker>
    </MapContainer>
  );
}
