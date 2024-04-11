import React from 'react';
import './Footer.css';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <MDBFooter className='footer' animation animateOnce>
      <MDBContainer>
        <MDBRow>
          <MDBCol md='6' className='social-links d-flex justify-content-center' style={{"gap":"50px", "marginLeft":"20px"}}>
            <a href='https://www.facebook.com/' className='icon-link text-white'>
              <FacebookOutlined style={{ fontSize: '1.5rem' }} />
            </a>
            <a href='https://www.twitter.com/' className='icon-link text-white ms-3'>
              <TwitterOutlined style={{ fontSize: '1.5rem' }} />
            </a>
            <a href='https://www.instagram.com/' className='icon-link text-white ms-3'>
              <InstagramOutlined style={{ fontSize: '1.5rem' }} />
            </a>
            <a href='https://www.linkedin.com/' className='icon-link text-white ms-3'>
              <LinkedinOutlined style={{ fontSize: '1.5rem' }} />
            </a>
          </MDBCol>
        </MDBRow>
        <MDBRow>
        <div className='copyright mt-3'>
              <span style={{ fontSize: '0.8rem', fontFamily: 'sans-serif' }}>
                &copy; 2024 Eventful. All rights reserved.
              </span> <br />
              <a className='text-white' href='/'>info@eventful.com</a>
        </div>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
};

export default Footer;
