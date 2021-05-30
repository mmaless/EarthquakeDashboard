import React from 'react';
import { MDBFooter } from 'mdbreact';

const Footer = () => {
  return (
    <MDBFooter color='blue' className='text-center font-small darken-2'>
      Data is extracted from:
      <a href='https://earthquake.usgs.gov/'>earthquake.usgs.gov</a>
    </MDBFooter>
  );
};

export default Footer;
