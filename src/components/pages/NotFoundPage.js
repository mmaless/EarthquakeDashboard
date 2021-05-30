import React from 'react';
import { MDBCol, MDBRow } from 'mdbreact';
import logo from '../../logo.png';

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <div className='full'>
        <MDBRow className='bad-gateway-row'>
          <MDBCol md='8'>
            <img
              alt='Error 404'
              className='img-fluid'
              hieght='20px'
              src={logo}
            />
            <h2 className='h2-responsive mt-3 mb-2'>404. That's an error.</h2>
            <h4>The requested URL was not found on this server.</h4>
          </MDBCol>
        </MDBRow>
      </div>
    </React.Fragment>
  );
};

export default NotFoundPage;
