import React from 'react';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImages/Img';
import Avatar from '../../../assets/avatar.png';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

import './Cast.scss';

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className='skItem'>
        <div className='circle skeleton'></div>
        <div className='row skeleton'></div>
        <div className='row2 skeleton'></div>
      </div>
    );
  };

  return (
    data?.length > 0 && (
      <div className='cast-section'>
        <ContentWrapper>
          <div className='cast-section__heading'>Top Cast</div>
          {!loading ? (
            <div className='cast-section__list-items'>
              {data?.map((item) => (
                <div className='cast-section__list-item' key={item.id}>
                  <div className='profile-img'>
                    <Img
                      src={
                        item.profile_path
                          ? url.profile + item.profile_path
                          : Avatar
                      }
                    />
                  </div>
                  <div className='name'>{item.name}</div>
                  <div className='character'>{item.character}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className='castSkeleton'>
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
              {skeleton()}
            </div>
          )}
        </ContentWrapper>
      </div>
    )
  );
};

export default Cast;
