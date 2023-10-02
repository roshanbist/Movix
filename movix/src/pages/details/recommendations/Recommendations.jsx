import React from 'react';
import useFetch from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Carousel from '../../../components/carousel/Carousel';

const Recommendations = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    data?.results.length > 0 && (
      <div className='carousel-section'>
        <ContentWrapper>
          <div className='carousel-section__top-block'>
            <div className='carousel-section__heading'>Recommendations</div>
          </div>
          <Carousel data={data?.results} loading={loading} />
        </ContentWrapper>
      </div>
    )
  );
};

export default Recommendations;
