import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function CountryDetails() {
    const { name } = useParams(); 
    const [country, setCountry] = useState(null);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/all`);
                if (!response.ok) throw new Error("Failed to fetch country data");
                const data = await response.json();
                setCountry(data[0]); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCountryDetails();
    }, [name]); 

    if (!country) return <p>Loading country details...</p>;

   
    const { name: countryName, capital, languages, timezones, region, population, flags, maps } = country;

    return (
        <div className="country-details-container">
            <h1 className="country-title">{countryName.common} Details</h1>
            <div className="country-info">
                {flags?.png && (
                    <img
                        src={flags.png}
                        alt={`Flag of ${countryName.common}`}
                        className="country-flag"
                    />
                )}
                <h2 className="country-name">{countryName.common}</h2>
                <p><strong>Capital:</strong> {capital || "Not available"}</p>
                <p><strong>Languages:</strong> {languages ? Object.values(languages).join(", ") : "Not available"}</p>
                <p><strong>Time Zones:</strong> {timezones?.join(", ") || "Not available"}</p>
                <p><strong>Region:</strong> {region}</p>
                <p><strong>Population:</strong> {population}</p>

                {maps?.googleMaps && (
                    <p>
                        <strong>Google Maps:</strong>
                        <a href={maps.googleMaps} target="_blank" rel="noopener noreferrer">
                            View on Google Maps
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}

export default CountryDetails;
