import React from 'react';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBDataTableV5 } from 'mdbreact';
import { isEmpty } from 'lodash';

const TableSection = ({ events }) => {
  var eventsTable = { columns: [], rows: [] };
  if (!isEmpty(events)) {
    eventsTable = {
      columns: [
        {
          label: 'Location',
          field: 'place',
          width: 150,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },
        {
          label: 'Magnitude',
          field: 'mag',
          sort: 'desc',
          width: 270,
        },
        {
          label: 'Time',
          field: 'time',
          sort: 'desc',
          width: 200,
        },
        {
          label: 'Type',
          field: 'type',
          width: 100,
        },
        {
          label: 'Latitude',
          field: 'latitude',
          width: 100,
        },
        {
          label: 'Longitude',
          field: 'longitude',
          width: 100,
        },
      ],
      rows: events,
    };
  }

  return (
    <MDBRow className='mb-4'>
      <MDBCol md='12' className='mb-4'>
        <MDBCard>
          <MDBCardBody>
            <MDBDataTableV5
              responsive
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={eventsTable}
            />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default TableSection;
