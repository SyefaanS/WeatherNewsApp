import axios from "axios";
import { WEATHER_API_KEY, WEATHER_API_URL } from "@env";

const fetchWeather = async (latitude: number, longitude: number) => {
  const response = await axios.get(WEATHER_API_URL, {
    params: {
      lat: latitude,
      lon: longitude,
      appid: WEATHER_API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

export default fetchWeather;
