import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBFormInline,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from 'mdbreact';
import Datetime from 'react-datetime';
import moment from 'moment';
import { api } from '../../config.json';

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    );
  }
  return keyValuePairs.join('&');
}

async function getData(location, startTime, endTime, min) {
  try {
    const start = startTime.format('YYYY-MM-DD HH:mm:ss');
    const end = endTime.format('YYYY-MM-DD HH:mm:ss');
    const params = { location, start, end, min };
    if (location !== '') {
      const response = await fetch(`${api}/events?${objToQueryString(params)}`);
      if (response.status === 200) {
        const responseData = await response.json();
        return { data: responseData };
      } else if (response.status === 204) {
        return { message: 'No events found' };
      } else if (response.status === 400) {
        return { message: 'Location provided is invalid' };
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    throw error;
  }
}

const SearchSection = ({ setOverview, setEvents, setCount, setMapCenter }) => {
  const [location, setLocation] = useState('California');
  const [startTime, setStartTime] = useState(moment().subtract(1, 'month'));
  const [endTime, setEndTime] = useState(moment());
  const [minimum, setMinimum] = useState(2);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const asyncFetchData = async () => {
      try {
        const response = await getData(location, startTime, endTime, minimum);
        if (response.data) {
          setOverview(response.data.overview);
          setEvents(response.data.events);
          setCount(response.data.count);
          setMapCenter(response.data.map);
        } else {
          setMessage(response.message);
          setInfo(true);
        }
      } catch (error) {
        setMessage('Failed to request data');
        setError(true);
      }
    };
    asyncFetchData();
  }, []);

  return (
    <MDBCard className='mb-5'>
      <MDBCardBody
        id='breadcrumb'
        className='d-flex align-items-center justify-content-between'
      >
        <MDBFormInline className='md-form m-0'>
          <p className='h5 text-center mb-0'>Location:&nbsp;&nbsp;</p>
          <input
            className='form-control form-control-sm'
            type='search'
            placeholder='Type your query'
            aria-label='Search'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setLocation(e.target.value);
                document.getElementById('searchBtn').click();
              }
            }}
          />
          <MDBBtn
            id='searchBtn'
            size='sm'
            color='primary'
            className='my-0'
            onClick={async () => {
              try {
                const response = await getData(
                  location,
                  startTime,
                  endTime,
                  minimum
                );
                if (response.data) {
                  setOverview(response.data.overview);
                  setEvents(response.data.events);
                  setCount(response.data.count);
                  setMapCenter(response.data.map);
                } else {
                  setMessage(response.message);
                  setInfo(true);
                }
              } catch (error) {
                setMessage('Failed to request data');
                setError(true);
              }
            }}
          >
            <MDBIcon icon='search' />
          </MDBBtn>
        </MDBFormInline>
        <MDBFormInline className='md-form m-0'>
          <p className='h5 text-center mb-0'>Min. Mag:&nbsp;&nbsp;</p>
          <input
            className='form-control form-control-sm'
            type='text'
            placeholder='Enter minimum mag.'
            aria-label=''
            value={minimum}
            onChange={(e) => setMinimum(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                setMinimum(e.target.value);
                document.getElementById('searchBtn').click();
              }
            }}
          />
        </MDBFormInline>
        <MDBFormInline className='md-form m-0'>
          <p className='h5 text-center mb-0'>Start Time:&nbsp;&nbsp;</p>
          <Datetime
            initialValue={startTime}
            onChange={(e) => setStartTime(e)}
          />
        </MDBFormInline>
        <MDBFormInline className='md-form m-0'>
          <p className='h5 text-center mb-0'>End Time:&nbsp;&nbsp;</p>
          <Datetime initialValue={endTime} onChange={(e) => setEndTime(e)} />
        </MDBFormInline>
      </MDBCardBody>
      <MDBModal isOpen={info} size='sm'>
        <MDBModalHeader>Information Message</MDBModalHeader>
        <MDBModalBody className='text-center'>
          <p>{message}</p>
          <MDBBtn color='secondary' onClick={() => setInfo(false)}>
            Close
          </MDBBtn>
        </MDBModalBody>
      </MDBModal>
      <MDBModal isOpen={error} size='sm'>
        <MDBModalHeader>Error Message</MDBModalHeader>
        <MDBModalBody className='text-center'>
          <p>{message}</p>
          <MDBBtn color='secondary' onClick={() => setError(false)}>
            Close
          </MDBBtn>
        </MDBModalBody>
      </MDBModal>
    </MDBCard>
  );
};

export default SearchSection;
