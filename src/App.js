import { useState } from "react";
import Header from "./Header";
import MainMap from "./MainMap";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="w-full h-full">
      <Header onSelectLocation={setSelectedLocation} />
      <MainMap selectedLocation={selectedLocation} />
    </div>
  );
}