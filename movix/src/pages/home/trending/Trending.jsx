import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';

const Trending = () => {
  const tabTitles = ['day', 'week'];
  const [endpoint, setEndpoint] = useState('day');

  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const tabChangeHandler = (item) => {
    setEndpoint(item === 'day' ? 'day' : 'week');
  };

  return (
    <div className='carousel-section'>
      <ContentWrapper>
        <div className='carousel-section__top-block'>
          <div className='carousel-section__heading'>Trending</div>
          <SwitchTabs data={tabTitles} onTabChange={tabChangeHandler} />
        </div>
        <Carousel data={data?.results} loading={loading} />
      </ContentWrapper>
    </div>
  );
};

export default Trending;
