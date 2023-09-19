import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38286600-4fb6f6569bd6cc1d5b65d3854';

export const getImg = async (searchValue, shownPage = 1) => {
  const option = {
    headers: {
      'Content-type': 'application/json',
    },
    params: {
      key: API_KEY,
      q: `${searchValue}`,
      image_type: 'photo',
      photo: 'horizontal',
      safesearch: 'true',
      page: `${shownPage}`,
      per_page: 12,
    },
  };
  const { data } = await axios(BASE_URL, option);
  return data;
};
