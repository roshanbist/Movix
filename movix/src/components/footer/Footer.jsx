import React from 'react';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <ContentWrapper>
        <ul className='footer__menuItems'>
          <li>Terms Of Use</li>
          <li>Privacy-Policy</li>
          <li>About</li>
          <li>Blog</li>
          <li>FAQ</li>
        </ul>
        <p className='footer__infoText'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <ul className='socialIcons'>
          <li>
            <FaFacebookF />
          </li>
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaLinkedin />
          </li>
        </ul>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
