import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_TOKEN = process.env.REACT_APP_API_TOKEN;

const headers = {
  Authorization: 'Bearer ' + TMDB_TOKEN,
  accept: 'application/json',
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const response = await axios.get(BASE_URL + url, {
      headers: headers,
      params: params,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
