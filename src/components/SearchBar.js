
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [countryName, setCountryName] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (countryName.trim() !== '') {
      navigate(`/country/${countryName.toLowerCase()}`);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
        placeholder="Enter country name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
