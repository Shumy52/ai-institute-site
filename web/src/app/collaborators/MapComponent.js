"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const universities = [
  { name: "Technical University of Cluj-Napoca (That's us!)", lat: 46.769379, lon: 23.585384, link: "https://www.utcluj.ro/" },
  { name: "University of Technology of Troyes", lat: 48.269328, lon: 4.066839, link: "https://www.utt.fr/" },
  { name: "Darmstadt University of Applied Sciences", lat: 49.8719, lon: 8.6512, link: "https://h-da.de/" },
  { name: "Riga Technical University", lat: 56.950944, lon: 24.116288, link: "https://www.rtu.lv/" },
  { name: "Technological University Dublin", lat: 53.3498, lon: -6.2603, link: "https://www.tudublin.ie/" },
  { name: "Technical University of Sofia", lat: 42.6682, lon: 23.3545, link: "https://tu-sofia.bg/" },
  { name: "Polytechnic University of Cartagena", lat: 37.6079, lon: -0.9919, link: "https://www.upct.es/" },
  { name: "University of Cassino and Southern Lazio", lat: 41.4822, lon: 13.8174, link: "https://www.unicas.it/" },
  { name: "Cyprus University of Technology", lat: 34.6757, lon: 33.0446, link: "https://www.cut.ac.cy/" },
];

export default function MapComponent() {
  return (
    <MapContainer center={[50, 10]} zoom={4} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {universities.map((uni, idx) => (
        <Marker key={idx} position={[uni.lat, uni.lon]} icon={customIcon}>
          <Popup>
            <strong>{uni.name}</strong>
            <br />
            <a href={uni.link} target="_blank" rel="noopener noreferrer">Visit Website</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
