export type WeatherNow = {
  temperature: number;
  windSpeed: number;
  humidity: number;
  precipitationProbability: number;
};

export async function getWeatherNow(
  latitude: number,
  longitude: number,
): Promise<WeatherNow> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation_probability&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
  );

  if (!response.ok) {
    throw new Error("Failed to display data. Please try again later.");
  }

  const data = await response.json();
  console.log(data)

  if (
    data.current?.temperature_2m === undefined ||
    data.current?.wind_speed_10m === undefined ||
    data.current?.relative_humidity_2m === undefined ||
    data.hourly.precipitation_probability[0] === undefined
  ) {
    throw new Error("Weather information is not available");
  }

  return {
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    humidity: data.current.relative_humidity_2m,
    precipitationProbability: data.hourly.precipitation_probability[0]
  }
}
