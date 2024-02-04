import React, { useState } from "react";
import { fetchClimateData } from "./utils/DataAPI";
import "./css/weather.css";

interface ClimateData {
  name: string;
  weather: { description: string; icon: string }[];
  main: {
    temp: string;
    feels_like: string;
    pressure: string;
    humidity: string;
  };
  wind: { speed: string };
}

const translations: Record<string, string> = {
  "clear sky": "Despejado",
  "broken clouds": "Nubes ocasionales",
  "light rain": "Lluvia ligera",
  "thunderstorm": "Tormenta eléctrica",
  "snow": "Nieve",
  "mist": "Niebla",
  "drizzle": "Orballo",
  "overcast clouds": "Nubes", 
  "shower rain": "Lluvia torrencial",
  

};

export const Climate = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [fetchedData, setFetchedData] = useState<ClimateData | null>(null);

  const handleClick = async () => {
    const data = await fetchClimateData(city, country);
    setFetchedData(data);
  };

  return (
    <div>
      <input
        type="text"
        className="form-text mt-3 w-100"
        onChange={(event) => setCity(event.target.value)}
        placeholder="Escribe la ciudad"
      />
      <button className="mt-2 btn btn-primary" onClick={handleClick}>
        Click
      </button>
      {fetchedData && (
        <div className="weather">
          <div className="top">
            <div>
              <p className="city">{fetchedData.name}</p>
              <p className="weather-description">
                {translations[fetchedData.weather[0].description] ||
                  fetchedData.weather[0].description}
              </p>
            </div>
            <img
              alt="weather"
              className="weather-icon"
              src={`weather_icons/${fetchedData.weather[0].icon}.png`}
            />
          </div>
          <div className="bottom">
            <p className="temperature">
              {Math.round(Number(fetchedData.main.temp))}ºC
            </p>
            <div className="details">
              <div className="parameter-row">
                <span className="parameter-label">Detalles</span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Sensación</span>
                <span className="parameter-value">
                  {Math.round(Number(fetchedData.main.feels_like))}
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Viento</span>
                <span className="parameter-value">
                  {fetchedData.wind.speed}m/s
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Humedad</span>
                <span className="parameter-value">
                  {fetchedData.main.humidity}%
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Presión</span>
                <span className="parameter-value">
                  {fetchedData.main.pressure}hPa
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
