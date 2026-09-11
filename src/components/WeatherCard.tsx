import {
  Card,
  Text,
  Flex,
  HStack,
  VStack,
  Separator,
  Box,
} from "@chakra-ui/react";

import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiFog,
  WiRain,
  WiShowers,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

import type { WeatherNow } from "../api/weather-openmeteo";

type WeatherCardProps = {
  cityName: string;
  weather: WeatherNow;
};

function getWeatherDisplay(code: number) {
  if (code === 0) {
    return {
      label: "Clear sky",
      icon: WiDaySunny,
    };
  }

  if ([1, 2].includes(code)) {
    return {
      label: "Partly cloudy",
      icon: WiCloud,
    };
  }

  if (code === 3) {
    return {
      label: "Cloudy",
      icon: WiCloudy,
    };
  }

  if ([45, 48].includes(code)) {
    return {
      label: "Foggy",
      icon: WiFog,
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      label: "Drizzle",
      icon: WiShowers,
    };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      label: "Rain",
      icon: WiRain,
    };
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: "Snow",
      icon: WiSnow,
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      label: "Thunderstorm",
      icon: WiThunderstorm,
    };
  }

  return {
    label: "Current weather",
    icon: WiCloud,
  };
}

function WeatherCard({ cityName, weather }: WeatherCardProps) {
  const weatherDisplay = getWeatherDisplay(weather.weatherCode);
  const WeatherIcon = weatherDisplay.icon;

  return (
    <Card.Root
      variant="outline"
      width="100%"
      maxWidth="500px"
      bg="whiteAlpha.900"
      borderRadius="2xl"
      marginTop="1.5rem"
      overflow="hidden"
    >
      <Card.Header>
        <Text fontSize="sm" fontWeight="bold" color="blue.900">
          CURRENT WEATHER IN {cityName.toUpperCase()}
        </Text>
      </Card.Header>

      <Separator />

      <Card.Body>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap="8"
        >
          <VStack gap="1">
            <Box color="blue.600">
              <WeatherIcon size={90} />
            </Box>

            <Text color="blue.800" fontWeight="medium">
              {weatherDisplay.label}
            </Text>

            <HStack align="start" gap="1">
              <Text fontSize="5xl" fontWeight="bold" color="blue.700">
                {weather.temperature}
              </Text>

              <Text fontSize="xl" color="blue.700" paddingTop="2">
                °C
              </Text>
            </HStack>
          </VStack>

          <VStack align="stretch" gap="3" width={{ base: "100%", md: "auto" }}>
            <Text fontSize="md" fontWeight="medium" color="blue.800">
              Wind speed: {weather.windSpeed} km/h
            </Text>

            <Separator />

            <Text fontSize="md" fontWeight="medium" color="blue.800">
              Humidity: {weather.humidity}%
            </Text>

            <Separator />

            <Text fontSize="md" fontWeight="medium" color="blue.800">
              Chance of rain: {weather.precipitationProbability}%
            </Text>
          </VStack>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default WeatherCard;
