import React, { useState, useRef } from "react";
import './App.css'; 

function App() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [countryDetails, setCountryDetails] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  
  
  const inputRef = useRef(null);

  
  const fetchCountryDetails = async () => {
    if (!searchTerm) {
      setError("Please enter a country name.");
      return;
    }

    setLoading(true);
    setError(""); 
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchTerm}?fullText=true`
      );
      if (!response.ok) {
        throw new Error("Country not found or API error.");
      }
      const data = await response.json();
      setCountryDetails(data[0]); 
      setSearchTerm("");
    } catch (error) {
      setError("Country not found. Please try again.");
      setCountryDetails(null); 
    } finally {
      setLoading(false); 
      inputRef.current.focus(); 
    }
  };

  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

 
  const renderCountryDetails = () => {
    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!countryDetails) return <p>No country details to display.</p>;

    const { name, flags, capital, region, population, languages } = countryDetails;

    return (
      <div className="country-details">
        <h3>{name.common}</h3>
        <img src={flags.svg} alt={`Flag of ${name.common}`} />
        <p><strong>Capital:</strong> {capital ? capital[0] : "N/A"}</p>
        <p><strong>Region:</strong> {region}</p>
        <p><strong>Population:</strong> {population}</p>
        <p><strong>Languages:</strong> {languages ? Object.values(languages).join(", ") : "N/A"}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Enter country name..."
        value={searchTerm}
        onChange={handleInputChange}
        ref={inputRef} 
      />
      <button onClick={fetchCountryDetails}>Search</button>

      {renderCountryDetails()}
    </div>
  );
}

export default App;
