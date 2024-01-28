import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '../../assets/movix-logo.svg';

import './Header.scss';

const Header = () => {
  const [show, setShow] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const mobileMenuHandler = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  useEffect(() => {
    if (mobileMenu) {
      document.body.classList.add('nav-visible');
    } else {
      document.body.classList.remove('nav-visible');
    }
  }, [mobileMenu]);

  useEffect(() => {
    const menuHandler = (e) => {
      if (!navRef.current.contains(e.target)) {
        setMobileMenu(false);
      }
    };

    const resizeHandler = () => {
      if (window.innerWidth >= 768) {
        setMobileMenu(false);
        document.body.classList.remove('nav-visible');
      }
    };

    document.addEventListener('mousedown', menuHandler);
    window.addEventListener('resize', resizeHandler);

    return () => {
      document.removeEventListener('mousedown', menuHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY) {
          setShow('hide');
        } else {
          setShow('show');
        }
      } else {
        setShow('top');
      }

      setLastScrollY(window.scrollY);
    };

    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [lastScrollY]);

  const searchModalHandler = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const querySearchHandler = (e) => {
    if (e.key === 'Enter' && query.trim().length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
      setQuery('');
    }
  };

  const navigationCloseHandler = () => {
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? 'nav-visible' : ''} ${show}`}>
      <ContentWrapper>
        <div className='header__logo' onClick={() => navigate('/')}>
          <img src={logo} alt='Movix' />
        </div>
        <div className='header__inner-holder'>
          <div
            className={`header__search ${showSearch ? 'search-visible' : ''}`}
          >
            <span className='search-icon'>
              {showSearch ? (
                <VscChromeClose onClick={() => setShowSearch(false)} />
              ) : (
                <HiOutlineSearch onClick={searchModalHandler} />
              )}
            </span>
            <div className='searchInput'>
              <input
                type='text'
                placeholder='Search for a movie or tv show....'
                onKeyDown={querySearchHandler}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
          </div>
          <nav className='header__nav' ref={navRef}>
            <span className='header__mobile-menu-icon'>
              {mobileMenu ? (
                <VscChromeClose onClick={() => setMobileMenu(false)} />
              ) : (
                <SlMenu onClick={mobileMenuHandler} />
              )}
            </span>
            <div className='header__nav-drop'>
              <ul>
                <li>
                  <Link to='/explore/movie' onClick={navigationCloseHandler}>
                    movies
                  </Link>
                </li>
                <li>
                  <Link to='/explore/tv' onClick={navigationCloseHandler}>
                    TV Shows
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Header;
