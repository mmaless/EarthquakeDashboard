import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBFormInline,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBInput,
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

async function refreshData(location, startTime, endTime, ignore) {
  try {
    const start = startTime.format('YYYY-MM-DD HH:mm:ss');
    const end = endTime.format('YYYY-MM-DD HH:mm:ss');
    const params = { location, start, end, ignore };
    if (location !== '') {
      const response = await fetch(
        `${api}/refresh?${objToQueryString(params)}`,
        { method: 'post' }
      );
      if (response.status === 201) {
        return 'Events inserted successfully';
      } else if (response.status === 204) {
        return 'No events found';
      } else if (response.status === 400) {
        return 'Location provided is invalid';
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    throw error;
  }
}

const SearchSection = () => {
  const [location, setLocation] = useState('Turkey');
  const [startTime, setStartTime] = useState(moment().subtract(1, 'month'));
  const [endTime, setEndTime] = useState(moment());
  const [ignore, setIgnore] = useState(true);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [message, setMessage] = useState('');

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
                const data = await refreshData(
                  location,
                  startTime,
                  endTime,
                  ignore
                );
                if (data) {
                  setMessage(data);
                  setInfo(true);
                }
              } catch (error) {
                setMessage('Failed to request data');
                setError(true);
              }
            }}
          >
            <MDBIcon icon='bolt' />
          </MDBBtn>
        </MDBFormInline>
        <MDBFormInline>
          <MDBInput
            label='Ignore Location'
            type='checkbox'
            id='checkbox1'
            checked={ignore}
            onChange={() => (ignore ? setIgnore(false) : setIgnore(true))}
            containerClass='mr-5'
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
