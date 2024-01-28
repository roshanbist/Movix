import React, { useEffect } from 'react';
import './PageNotFound.scss';

const PageNotFound = () => {
  useEffect(() => {
    document.body.classList.add('page-not-found');

    return () => {
      document.body.classList.remove('page-not-found');
    };
  }, []);

  return (
    <div className='not-found-page'>
      <h1 className='not-found-page__heading'>404</h1>
      <div className='not-found-page__sub-heading'>Oops! Page not found</div>
      <p>
        Sorry, but the page you are looking for is not found. Please go to home
        page
      </p>
      <button>Home</button>
    </div>
  );
};

export default PageNotFound;
