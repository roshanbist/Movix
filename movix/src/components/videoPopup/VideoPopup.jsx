import React, { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import './VideoPopup.scss';

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && show) {
        setShow(!show);
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [show]);

  const closeHandler = () => {
    setShow(!show);
    setVideoId(null);
  };

  return (
    <div className={`video-popup ${show ? 'visible' : ''}`}>
      <div className='opacity-layer' onClick={closeHandler}></div>
      <div className='video-player'>
        <span className='close-btn' onClick={closeHandler}>
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width='100%'
          height='100%'
        />
      </div>
    </div>
  );
};

export default VideoPopup;
