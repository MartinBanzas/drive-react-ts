import React, { useState } from "react";
import { fetchClimateData } from "../utils/DataAPI";
import { Forecast}  from "./Forecast";
import { translations } from "../utils/Utils";

export interface WeatherData {
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


export const CurrentWeather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [fetchedCurrenWeather, setFetchedCurrentWeather] = useState<WeatherData | null>(null);
  const [isWeatherSet, setIsWeatherSet]=useState(false)
  const [forecast, setForecast]=useState();

  const handleClick = async () => {
    const data = await fetchClimateData(city, country);
    setFetchedCurrentWeather(data?.currentWeatherJson);
    setForecast(data?.forecastJson);
    setIsWeatherSet(true);
  };

  return (
    <div>
      <input
        type="text"
        className="form-text mt-3 w-100"
        onChange={(event) => setCity(event.target.value)}
        placeholder="Escribe la ciudad"
      />
      <button className="mt-2 btn btn-sm btn-primary" onClick={handleClick}>
        Click
      </button>
      {fetchedCurrenWeather && (
        <div className="weather">
          <div className="top">
            <div>
              <p className="city">{fetchedCurrenWeather.name}</p>
              <p className="weather-description mt-1">
                {translations[fetchedCurrenWeather.weather[0].description] ||
                  fetchedCurrenWeather.weather[0].description}
              </p>
            </div>
            <img
              alt="weather"
              className="weather-icon"
              src={`weather_icons/${fetchedCurrenWeather.weather[0].icon}.png`}
            />
          </div>
          <div className="bottom">
            <p className="temperature">
              {Math.round(Number(fetchedCurrenWeather.main.temp))}ºC
            </p>
            <div className="details">
              <div className="parameter-row">
                <span className="parameter-label">Detalles</span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Sensación</span>
                <span className="parameter-value">
                  {Math.round(Number(fetchedCurrenWeather.main.feels_like))}
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Viento</span>
                <span className="parameter-value">
                  {fetchedCurrenWeather.wind.speed}m/s
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Humedad</span>
                <span className="parameter-value">
                  {fetchedCurrenWeather.main.humidity}%
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Presión</span>
                <span className="parameter-value">
                  {fetchedCurrenWeather.main.pressure}hPa
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {isWeatherSet && forecast ? <div className="mt-2"><Forecast forecast={forecast}/></div> : null}
    </div>

  );
};
