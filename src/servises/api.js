import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const AUTHORIZATION_KEY = '32884302-6b7a2916d20909a9c43654aba';

export async function fetchPictures(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: AUTHORIZATION_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 12,
    },
  });
  console.log('responce', response);

  return response.data;
}
