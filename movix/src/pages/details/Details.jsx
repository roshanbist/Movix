import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import useFetch from '../../hooks/useFetch';
import Cast from './cast/Cast';
import Videos from './videos/Videos';
import Similar from './similar/Similar';
import Recommendations from './recommendations/Recommendations';

const Details = () => {
  // useParams hook return object of key-value pairs of dynamic param from the current url.
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <Videos data={data?.results} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendations mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
