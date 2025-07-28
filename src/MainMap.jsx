import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import L from 'leaflet';
import { LOCATIONS } from './locations';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const FlyToLocation = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 18);
    }
  }, [location, map]);

  return null;
};

const MainMap = ({ selectedLocation, resetTrigger }) => {
  const markerRefs = useRef([]);
  const mapRef = useRef();

  useEffect(() => {
    if (selectedLocation && markerRefs.current) {
      const foundIndex = LOCATIONS.findIndex(
        (loc) => loc.name === selectedLocation.name
      );
      const marker = markerRefs.current[foundIndex];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (resetTrigger && mapRef.current) {
      mapRef.current.flyTo([8.8450, 7.9076], 17);
    }
  }, [resetTrigger])

  return (
    <MapContainer
      center={[8.8450, 7.9076]}
      zoom={17}
      className="h-[89.5%] w-full z-0"
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=hi6clt4EqHzaoWHzZ3qc"
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
      />

      {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}


      {selectedLocation && <FlyToLocation location={selectedLocation} />}

      {LOCATIONS.map((loc, i) => (
        <Marker
          key={i}
          position={[loc.lat, loc.lng]}
          ref={(el) => (markerRefs.current[i] = el)}
        >
          <Popup>
            <h2 className="text-lg font-bold">{loc.name}</h2>
            <p className="text-sm">{loc.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MainMap;