import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import CircleRating from '../circleRating/CircleRating';
import Img from '../lazyLoadImages/Img';
import PosterFallback from '../../assets/no-poster.png';
import './Card.scss';
import Genres from '../genres/Genres';

const Card = ({ data, endpoint, fromSearch }) => {
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  return (
    <div
      className='card'
      onClick={() => navigate(`/${data.media_type || endpoint}/${data.id}`)}
    >
      <div className='card__poster'>
        <Img src={posterUrl} />
        {!fromSearch && (
          <>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </>
        )}
      </div>
      <div className='card__text-block'>
        <span className='title'>{data.title || data.name}</span>
        <span className='date'>
          {dayjs(data.release_date || data.first_air_date).format(
            'MMM D, YYYY'
          )}
        </span>
      </div>
    </div>
  );
};

export default Card;
