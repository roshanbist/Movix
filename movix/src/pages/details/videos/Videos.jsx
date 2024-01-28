import React, { useState } from 'react';
import Img from '../../../components/lazyLoadImages/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { PlayIcon } from '../Playbtn';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import './Videos.scss';

const Videos = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className='skItem'>
        <div className='thumb skeleton'></div>
        <div className='row skeleton'></div>
        <div className='row2 skeleton'></div>
      </div>
    );
  };

  return (
    data?.length > 0 && (
      <div className='videos-section'>
        <ContentWrapper>
          <div className='videos-section__heading'>Official Videos</div>
          {!loading ? (
            <div className='videos'>
              {data?.map((video) => (
                <div
                  className='video-item'
                  key={video.id}
                  onClick={() => {
                    setShow(true);
                    setVideoId(video.key);
                  }}
                >
                  <div className='video-thumbnail'>
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayIcon />
                  </div>
                  <div className='video-title'>{video.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className='videoSkeleton'>
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
            </div>
          )}
        </ContentWrapper>
        <VideoPopup
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
          show={show}
        />
      </div>
    )
  );
};

export default Videos;
