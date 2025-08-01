import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import { LOCATIONS } from './locations';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Default marker icon setup
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/5216/5216434.png',
  iconSize: [48, 48],
  iconAnchor: [16, 32],
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

const LocateMeControl = ({ onLocationFound }) => {
  const map = useMap();

  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        onLocationFound({ lat, lng });
        map.flyTo([lat, lng], 18);
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-14 right-4 z-[1000] bg-white text-sm text-blue-700 font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-blue-50"
    >
      Locate Me
    </button>
  );
};

const DirectionsButton = ({ userLocation, destination }) => {
  const map = useMap();

  const handleDirections = () => {
    if (!userLocation || !destination) {
      alert("User location or destination is missing.");
      console.log("userLocation:", userLocation, "destination:", destination);
      return;
    }

    if (!map) {
      console.log("Map is not ready.");
      return;
    }

    // Remove previous routing if any
    if (map._routingControl) {
      map.removeControl(map._routingControl);
    }

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
      },
      createMarker: () => null,
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      show: false,
    }).addTo(map);

    map._routingControl = routingControl;
  };

  return (
    <button
      onClick={handleDirections}
      className="absolute bottom-28 right-4 z-[1000] bg-white text-sm text-green-700 font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-green-50"
    >
      Get Directions
    </button>
  );
};

const MainMap = ({ selectedLocation }) => {
  const markerRefs = useRef([]);
  const mapRef = useRef(); // <-- NEW
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (selectedLocation && markerRefs.current) {
      const foundIndex = LOCATIONS.findIndex((loc) => loc.name === selectedLocation.name);
      const marker = markerRefs.current[foundIndex];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedLocation]);

  return (
    <div className="relative h-[89.5%] w-full z-0">
      <MapContainer
        center={[8.845, 7.9076]}
        zoom={17}
        className="w-full h-full"
      >
        <TileLayer
          url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=hi6clt4EqHzaoWHzZ3qc"
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
        />

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

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        <LocateMeControl onLocationFound={setUserLocation} />

        <DirectionsButton
          userLocation={userLocation}
          destination={selectedLocation}
        />
      </MapContainer>
    </div>
  );
};

export default MainMap;