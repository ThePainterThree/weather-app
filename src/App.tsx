import { useEffect, useState } from "react";
import Header from "./Header"
import {getTemperatureNow } from "./api/weather-openmeteo.ts"

function App() {
  const location = "Cologne"
  const latitude = 50.94
  const longitude = 6.96

  const [temperature, setTemperature] = useState<number | null> (null);

  useEffect(() => {
    getTemperatureNow(latitude, longitude).then((temperatura: number) => {
      setTemperature(temperatura)
    });
  }, []);

  return(
    <main>
      <h1>Weather Dashboard</h1>
      <p>Tracking weather metrics in real time.</p><br></br>
      <Header location={location}></Header>

      <h3>
        {temperature === null ? "Loading data..." : `${temperature}°C`}
      </h3>
  
    </main>
  )
}

export default App