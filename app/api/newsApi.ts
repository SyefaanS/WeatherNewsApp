import axios from "axios";
import { NEWS_API_KEY, NEWS_API_URL } from "@env";

const fetchNews = async () => {
  const response = await axios.get(NEWS_API_URL, {
    params: {
      country: "us",
      apiKey: NEWS_API_KEY,
    },
  });
  return response.data.articles;
};

export default fetchNews;
