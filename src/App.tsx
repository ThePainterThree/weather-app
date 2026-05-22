import { useEffect, useState } from "react";
import Header from "./Header";
import { getWeatherNow, type WeatherNow } from "./api/weather-openmeteo.ts";
import { cities } from "./data/cities.ts";
import Dropdown from "./Dropdown.tsx";


function App() {
  const [cityName, setCityName] = useState<string>("Cologne");
  const [weather, setWeather] = useState<WeatherNow | null>(null);

  const location = cities.find((city) => city.name === cityName);
  if (!location) {
    return <h5>Sorry, city not found.</h5>;
  }

  const latitude = location.latitude;
  const longitude = location.longitude;

  useEffect(() => {
    setWeather(null)

    getWeatherNow(latitude, longitude)
      .then((weatherInfo) => {
        setWeather(weatherInfo)
    })
  }, [latitude, longitude]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Weather Dashboard</h1>
      <p>Tracking weather metrics in real time.</p>
      <br></br>
      <Dropdown cityName={cityName} onCityChange={setCityName} />
      <br></br>
      <Header location={location.name}></Header>
      <br></br>
      <h3>{weather === null ? "Loading data..." : `${weather}°C`}</h3>
    </main>
  );
}

export default App