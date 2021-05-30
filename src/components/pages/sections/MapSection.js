import React from 'react';
import { MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
import GoogleMapReact from 'google-map-react';
import { googleMapsApi } from '../../config.json';
import { isEmpty } from 'lodash';

const InfoWindow = ({ event }) => {
  const infoWindowStyle = {
    position: 'relative',
    'text-align': 'left',
    display: 'none',
    borderRadius: '5%',
    bottom: 125,
    left: '-45px',
    width: 250,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };
  return (
    <div id={event.id} style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>{event.place}</div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>Magnitude: </span>
        <span style={{ color: 'grey' }}>{event.mag}</span>
      </div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>Type: </span>
        <span style={{ color: 'grey' }}>{event.type}</span>
      </div>
      <div style={{ fontSize: 14, color: 'green' }}>{event.time}</div>
    </div>
  );
};

const Marker = ({ event }) => {
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: event.mag * 5,
    width: event.mag * 5,
    backgroundColor:
      event.mag < 4 ? '#5aadf6' : event.mag > 6 ? '#f54a55' : '#f5c032',
    cursor: 'pointer',
    zIndex: 10,
  };
  return (
    <div>
      <div style={markerStyle} />
      <InfoWindow event={event} />
    </div>
  );
};

const MapSection = ({ mapCenter, events }) => {
  const location = { lat: mapCenter.lat, lng: mapCenter.lng };
  const onChildMouseEnterCallback = (key) => {
    document.getElementById(key).style.display = 'block';
  };
  const onChildMouseLeaveCallback = (key) => {
    document.getElementById(key).style.display = 'none';
  };

  return (
    <MDBCol lg='14' className='mb-4'>
      <MDBCard>
        <MDBCardBody
          style={{ width: '100%', height: '500px' }}
          className='text-center'
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: googleMapsApi,
            }}
            center={location}
            defaultZoom={6}
            mapTypeControl={true}
            onChildMouseEnter={onChildMouseEnterCallback}
            onChildMouseLeave={onChildMouseLeaveCallback}
            yesIWantToUseGoogleMapApiInternals
            options={(maps) => ({
              mapTypeControl: true,
              mapTypeId: maps.MapTypeId.ROADMAP,
              mapTypeControlOptions: {
                style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: maps.ControlPosition.BOTTOM_CENTER,
                mapTypeIds: [maps.MapTypeId.ROADMAP, maps.MapTypeId.HYBRID],
              },
            })}
          >
            {!isEmpty(events) &&
              events.map((event) => (
                <Marker
                  key={event.id}
                  place={event.place}
                  lat={event.latitude}
                  lng={event.longitude}
                  event={event}
                />
              ))}
          </GoogleMapReact>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
};

export default MapSection;
