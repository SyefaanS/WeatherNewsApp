import axios from 'axios';

const API_KEY = '7e9c1bd449434cd5a6973455e7762d8e';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

 const fetchNews = async () => {
  const response = await axios.get(BASE_URL, {
    params: {
      country: 'us', 
      apiKey: API_KEY,
    },
  });
  return response.data.articles; 
};

export default fetchNews;