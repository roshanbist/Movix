import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';

const Popular = () => {
  const tabTitles = ['Movies', 'Tv Shows'];
  const [endpoint, setEndpoint] = useState('movie');

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const tabChangeHandler = (item) => {
    setEndpoint(item === 'Movies' ? 'movie' : 'tv');
  };

  return (
    <div className='carousel-section'>
      <ContentWrapper>
        <div className='carousel-section__top-block'>
          <div className='carousel-section__heading'>What's Popular</div>
          <SwitchTabs data={tabTitles} onTabChange={tabChangeHandler} />
        </div>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
      </ContentWrapper>
    </div>
  );
};

export default Popular;
