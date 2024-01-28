import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImages/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import './HeroBanner.scss';

const HeroBanner = () => {
  const [background, setBackground] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch('/movie/upcoming');

  // TODO: click on search button should also trigger searching with the text entered, yet to do

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && inputSearch.trim().length > 0) {
      // navigating to the search page
      navigate(`/search/${inputSearch}`);
    }
  };

  useEffect(() => {
    const backgroundImage =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(backgroundImage);
  }, [data]);

  return (
    <div className='heroBanner'>
      {!loading && (
        <div className='heroBanner__backdropImg'>
          <Img src={background} />
        </div>
      )}
      <div className='opacity-layer' />
      <ContentWrapper>
        <div className='heroBanner__content'>
          <h1 className='heroBanner__title'>Welcome.</h1>
          <span className='heroBanner__subtitle'>
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className='searchInput'>
            <input
              type='text'
              placeholder='Search for a movie or tv show....'
              onChange={(e) => setInputSearch(e.target.value)}
              onKeyDown={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
