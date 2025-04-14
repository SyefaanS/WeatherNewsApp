import axios from "axios";

const API_KEY = "18c3c75556b986dbc1b196f905827092";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const fetchWeather = async (latitude: number, longitude: number) => {
  const response = await axios.get(BASE_URL, {
    params: {
      lat: latitude,
      lon: longitude,
      appid: API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

export default fetchWeather;