import { useState, useEffect } from 'react';
import { fetchDataFromApi } from '../utils/api';

/**
 *  NOTE: dependency for useEffect will be url as it will be dynamic therefore everytime url changes data,error are set back to null initially inside useEffect
 *
 */

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading('Loading...');
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((error) => {
        setLoading(false);
        setError('Something went wrong!');
        console.log(error);
      });
  }, [url]);

  // return object
  return { data, error, loading };
};

export default useFetch;
