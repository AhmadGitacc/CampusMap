// // MainMap.tsx
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { LOCATIONS } from './locations';

// // Fix leaflet marker icon issue
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import Header from './Header';

// const DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   iconRetinaUrl: markerIcon2x,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// // Set this default globally
// L.Marker.prototype.options.icon = DefaultIcon;

// export default function MainMap() {
//   return (
//     <div className="h-screen w-full">
//       <Header />

//       <MapContainer
//         center={[8.8430, 7.9056]} // Centered around the university
//         zoom={17}
//         className="h-full w-full z-0"
//       >
//         {/* <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         /> */}

//         <TileLayer
//           url="https://api.maptiler.com/tiles/streets/{z}/{x}/{y}.png?key=hi6clt4EqHzaoWHzZ3qc"
//         />


//         {LOCATIONS.map((loc, i) => (
//           <Marker key={i} position={[loc.lat, loc.lng]}>
//             <Popup>
//               <h2 className="text-lg font-bold">{loc.name}</h2>
//               <p className="text-sm">{loc.description}</p>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// } 

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

const MainMap = ({ selectedLocation }) => {
  const markerRefs = useRef([]);

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

  return (
    <MapContainer
      center={[8.8430, 7.9056]}
      zoom={17}
      className="h-[89.5%] w-full z-0"
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
    </MapContainer>
  );
};

export default MainMap;