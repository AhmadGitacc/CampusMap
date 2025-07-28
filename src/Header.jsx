import { useState } from "react";
import { LOCATIONS } from "./locations";

const Header = ({ onSelectLocation, onReset }) => {
  const [search, setSearch] = useState('');

  const handleSelect = (name) => {
    const location = LOCATIONS.find((loc) => loc.name === name);
    if (location) {
      onSelectLocation(location);
    }
  };

  return (
    <div className="sticky top-0 z-10 w-full p-4 shadow-lg bg-gradient-to-r from-purple-700 to-pink-600">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
        <h1 className="text-xl font-bold tracking-wide text-center text-white sm:text-left">
          Campus Navigator
        </h1>

        <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:w-auto">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm placeholder-gray-700 border-none rounded-lg sm:w-60 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            list="location-options"
          />
          <datalist id="location-options">
            {LOCATIONS.map((loc, index) => (
              <option key={index} value={loc.name} />
            ))}
          </datalist>

          <div className="flex w-full gap-2 sm:w-auto">
            <button
              className="w-full px-4 py-2 font-semibold text-pink-700 transition-all duration-200 bg-white rounded-lg sm:w-auto hover:bg-pink-100"
              onClick={() => handleSelect(search)}
            >
              Go
            </button>
            <button
              className="w-full px-4 py-2 font-semibold text-white transition-all duration-200 bg-red-600 rounded-lg sm:w-auto hover:bg-red-700"
              onClick={() => {
                setSearch('');
                onReset();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;