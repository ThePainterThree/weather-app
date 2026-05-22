type WeatherNow = {
  temperature: number;
  windSpeed: number;
  humidity: number;
  rain: number;
};

export async function getWeatherNow(
  latitude: number,
  longitude: number,
): Promise<WeatherNow> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain`,
  );

  if (!response.ok) {
    throw new Error("Failed to display data. Please try again later.");
  }

  const data = await response.json();

  if (
    data.current?.temperature_2m === undefined ||
    data.current?.wind_speed_10m === undefined ||
    data.current?.relative_humidity_2m === undefined ||
    data.current?.rain === undefined
  ) {
    throw new Error("Weather information is not available");
  }

  return {
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    humidity: data.current.relative_humidity_2m,
    rain: data.current.rain,
  };
}
