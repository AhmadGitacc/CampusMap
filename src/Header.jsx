import { useState } from 'react';
import { LOCATIONS } from './locations';

const Header = ({ onSelectLocation }) => {
  const [search, setSearch] = useState('');

  const handleSelect = (name) => {
    const location = LOCATIONS.find((loc) => loc.name === name);
    if (location) {
      onSelectLocation(location);
    }
  };

  return (
    <div className="w-full p-4 bg-white shadow-md flex items-center justify-between top-0 z-10 sticky">
      <h1 className="text-lg font-semibold">Campus Navigator</h1>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="border px-2 py-1 rounded"
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
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => handleSelect(search)}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default Header;
