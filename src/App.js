import { useEffect, useState } from "react";
import Header from "./Header";
import MainMap from "./MainMap";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleReset = () => {
    setSelectedLocation(null);
    setResetTrigger(true);
  };

  useEffect(() => {
    if (resetTrigger) {
      setResetTrigger(false);
    }
  }, [resetTrigger]);

  return (
    <div className="w-full h-full">
      <Header onSelectLocation={setSelectedLocation} onReset={handleReset} />
      <MainMap selectedLocation={selectedLocation} resetTrigger={resetTrigger} />
    </div>
  );
}