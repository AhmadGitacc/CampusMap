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
    <div className="sticky top-0 z-10 w-full px-3 py-2 shadow-md bg-gradient-to-r from-slate-800 to-indigo-700 sm:px-6 sm:py-4">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-6">
        <h1 className="text-lg font-extrabold tracking-wider text-white uppercase sm:text-2xl drop-shadow-md">
          <span className="text-teal-300">Campus</span> <span className="text-white">Navigator</span>
        </h1>

        <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:w-auto">
          <input
            type="text"
            className="w-full px-3 py-1.5 text-sm text-gray-900 placeholder-gray-500 rounded-md sm:w-52 focus:outline-none focus:ring-2 focus:ring-teal-300"
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
              className="w-full px-3 py-1.5 text-sm font-semibold text-indigo-700 bg-white rounded-md hover:bg-indigo-100 sm:w-auto"
              onClick={() => handleSelect(search)}
            >
              Go
            </button>
            <button
              className="w-full px-3 py-1.5 text-sm font-semibold text-white bg-rose-600 rounded-md hover:bg-rose-700 sm:w-auto"
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