import React from 'react';
import useFetch from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Carousel from '../../../components/carousel/Carousel';

const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === 'tv' ? 'Similar Tv Shows' : 'Similar Movies';

  return (
    data?.results.length > 0 && (
      <div className='carousel-section'>
        <ContentWrapper>
          <div className='carousel-section__top-block'>
            <div className='carousel-section__heading'>{title}</div>
          </div>
          <Carousel
            data={data?.results}
            loading={loading}
            endpoint={mediaType}
          />
        </ContentWrapper>
      </div>
    )
  );
};

export default Similar;
