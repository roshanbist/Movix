import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import useFetch from '../../../hooks/useFetch';
import Genres from '../../../components/genres/Genres';
import PosterFallback from '../../../assets/no-poster.png';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImages/Img';
import './DetailsBanner.scss';
import CircleRating from '../../../components/circleRating/CircleRating';
import { PlayIcon } from '../Playbtn';
import VideoPopup from '../../../components/videoPopup/VideoPopup';

const DetailsBanner = ({ video, crew }) => {
  // useParams hook return object of key-value pairs of dynamic param from the current url.
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const backgroundImage = url.backdrop + data?.backdrop_path;
  const posterImage = data?.poster_path
    ? url.poster + data?.poster_path
    : PosterFallback;

  const genreIds = data?.genres.map((g) => g.id);
  const director = crew?.filter((c) => c.job === 'Director');
  const writer = crew?.filter(
    (c) => c.job === 'Screenplay' || c.job === 'Story' || c.job === 'Writer'
  );

  const toHoursAndMinute = (duration) => {
    const hour = Math.floor(duration / 60);
    const min = duration % 60;
    return `${hour}h ${min > 0 ? min : ''}m`;
  };

  return (
    <div className='detailsBanner'>
      {!loading ? (
        <>
          <div className='detailsBanner__backdrop-img'>
            <Img src={backgroundImage} />
          </div>
          <div className='opacity-layer' />
          <ContentWrapper>
            <div className='detailsBanner__content'>
              <div className='banner__poster'>
                <Img src={posterImage} className='posterImg' />
              </div>
              <div className='banner__content'>
                <div className='title'>
                  {data?.original_title || data?.name} (
                  {dayjs(data?.release_data || data?.first_air_date).format(
                    'YYYY'
                  )}
                  )
                </div>
                <div className='subtitle'>{data?.tagline}</div>
                <Genres data={genreIds} />
                <div className='row'>
                  <CircleRating rating={data?.vote_average.toFixed(1)} />
                  {video && (
                    <div
                      className='playbtn'
                      onClick={() => {
                        setShow(true);
                        setVideoId(video.key);
                      }}
                    >
                      <PlayIcon />
                      <span className='text'>Watch Trailer</span>
                    </div>
                  )}
                </div>
                <div className='overview'>
                  <div className='heading'>Overview</div>
                  <p className='description'>{data?.overview}</p>
                </div>
                <div className='info'>
                  {data?.status && (
                    <div className='infoItem'>
                      <span className='text bold'>Status:</span>
                      <span className='text'>{data.status}</span>
                    </div>
                  )}
                  {data?.release_date && (
                    <div className='infoItem'>
                      <span className='text bold'>Release Date:</span>
                      <span className='text'>
                        {dayjs(data.release_date).format('MMM D, YYYY')}
                      </span>
                    </div>
                  )}
                  {data?.runtime && (
                    <div className='infoItem'>
                      <span className='text bold'>Runtime:</span>
                      <span className='text'>
                        {toHoursAndMinute(data.runtime)}
                      </span>
                    </div>
                  )}
                </div>
                {director?.length > 0 && (
                  <div className='info'>
                    <div className='infoItem'>
                      <span className='text bold'>Director:</span>
                      {director?.map((d, i) => (
                        <span className='text' key={i}>
                          {d.name} {director.length - 1 !== i && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {writer?.length > 0 && (
                  <div className='info'>
                    <div className='infoItem'>
                      <span className='text bold'>Writer:</span>
                      {writer?.map((w, i) => (
                        <span className='text' key={i}>
                          {w.name} {writer.length - 1 !== i && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {data?.created_by?.length > 0 && (
                  <div className='info'>
                    <div className='infoItem'>
                      <span className='text bold'>Creator:</span>
                      {data?.created_by.map((c, i) => (
                        <span className='text' key={i}>
                          {c.name} {data?.created_by.length - 1 !== i && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
              show={show}
            />
          </ContentWrapper>
        </>
      ) : (
        <div className='detailsBannerSkeleton'>
          <ContentWrapper>
            <div className='left skeleton'></div>
            <div className='right'>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
              <div className='row skeleton'></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
