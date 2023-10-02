import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { fetchDataFromApi } from './utils/api';
import { Home, PageNotFound, Details, Explore, SearchResult } from './pages';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };
      dispatch(getApiConfiguration(url));
    });
  };

  // use promise.all for calling multiple api's
  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};

    endPoints.forEach((endPoint) => {
      promises.push(fetchDataFromApi(`/genre/${endPoint}/list`));
    });

    // after promises.push, it will contain two method, one for movie list and next for tv list.
    // here promise.all will the return the response of both api request in a single array
    const data = await Promise.all(promises);

    // destructuring the object where key is genres and value is an array of object of each movie with id and genre
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
