import { useEffect, useState } from "react";
import Header from "./Header";
import MainMap from "./MainMap";

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleReset = () => {
    setSelectedLocation(null);
    setResetTrigger(prev => !prev); // toggle the reset key
  };


  useEffect(() => {
    if (resetTrigger) {
      setTimeout(() => {
        setResetTrigger(false);
      }, 1000);
    }
  }, [resetTrigger]);

  return (
    <div className="w-full h-full">
      <Header onSelectLocation={setSelectedLocation} onReset={handleReset} />
      <MainMap
        key={resetTrigger ? 'reset' : 'normal'}
        selectedLocation={selectedLocation}
      />
    </div>
  );
}