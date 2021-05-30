import React from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBRow } from 'mdbreact';
import { Bar, Pie } from 'react-chartjs-2';
import { isEmpty } from 'lodash';
import moment from 'moment';

const ChartSection = ({ events, count }) => {
  var barLabel = [];
  var barData = [];
  var barTooltip = [];
  var barColors = [];
  if (!isEmpty(events)) {
    events.forEach((event) => {
      barLabel.push(event.time);
      barData.push(event.mag);
      barTooltip.push(event.place);
      if (event.mag < 4) barColors.push('#5aadf6');
      if (event.mag >= 4 && event.mag <= 6) barColors.push('#f5c032');
      if (event.mag > 6) barColors.push('#f54a55');
    });
  }
  const barChartOptions = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: {
            callback: function(value, index, values) {
              return moment(value).format('DD MMM YYYY');
            },
          },
          gridLines: {
            display: false,
            color: 'rgba(0, 0, 0, 0.1)',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: 'rgba(0, 0, 0, 0.1)',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          var label = `${tooltipItem.yLabel}: ${barTooltip[tooltipItem.index]}`;
          return label;
        },
      },
    },
  };

  const bar = {
    labels: barLabel,
    datasets: [
      {
        label: '',
        data: barData,
        backgroundColor: barColors,
        borderWidth: 1,
      },
    ],
  };

  const pie = {
    labels: ['mag < 4', '> 4 mag < 6', 'mag > 6'],
    datasets: [
      {
        data: [count.low, count.medium, count.high],
        backgroundColor: ['#5aadf6', '#f5c032', '#f54a55'],
        hoverBackgroundColor: ['#5aadf6', '#f5c032', '#f54a55'],
      },
    ],
  };

  return (
    <MDBRow className='mb-4'>
      <MDBCol md='9' className='mb-4'>
        <MDBCard className='mb-4'>
          <MDBCardBody>
            <Bar data={bar} height={600} options={barChartOptions} />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol md='3' className='mb-3'>
        <MDBCard className='mb-3'>
          <MDBCardBody>
            <Pie data={pie} height={400} options={{ responsive: true }} />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default ChartSection;
