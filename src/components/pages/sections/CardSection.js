import React from 'react';
import { MDBCard, MDBIcon, MDBRow, MDBCol } from 'mdbreact';

const CardSection = ({ overview }) => {
  return (
    <MDBRow className='mb-4'>
      <MDBCol xl='3' md='6' className='mb-r'>
        <MDBCard className='cascading-admin-card'>
          <div className='admin-up'>
            <MDBIcon icon='exclamation-triangle' className='red' />
            <div className='data'>
              <p>Highest Magnitude</p>
              <h4>
                <strong>{overview.max.value}</strong>
              </h4>
              <p>
                <strong>{overview.max.time}</strong>
              </p>
            </div>
          </div>
        </MDBCard>
      </MDBCol>
      <MDBCol xl='3' md='6' className='mb-r'>
        <MDBCard className='cascading-admin-card'>
          <div className='admin-up'>
            <MDBIcon icon='exclamation-triangle' className='warning-color' />
            <div className='data'>
              <p>Lowest Magnitude</p>
              <h4>
                <strong>{overview.min.value}</strong>
              </h4>
              <p>
                <strong>{overview.min.time}</strong>
              </p>
            </div>
          </div>
        </MDBCard>
      </MDBCol>
      <MDBCol xl='3' md='6' className='mb-r'>
        <MDBCard className='cascading-admin-card'>
          <div className='admin-up'>
            <MDBIcon icon='chart-bar' className='light-blue lighten-1' />
            <div className='data'>
              <p>Most Recent</p>
              <h4>
                <strong>{overview.recent.value}</strong>
              </h4>
              <p>
                <strong>{overview.recent.time}</strong>
              </p>
            </div>
          </div>
        </MDBCard>
      </MDBCol>
      <MDBCol xl='3' md='6' className='mb-r'>
        <MDBCard className='cascading-admin-card'>
          <div className='admin-up'>
            <MDBIcon icon='calculator' className='green' />
            <div className='data'>
              <p>Total Earthquakes</p>
              <h4>
                <strong>{overview.total.value}</strong>
              </h4>
              <p>
                <strong>{overview.total.time}</strong>
              </p>
            </div>
          </div>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default CardSection;
