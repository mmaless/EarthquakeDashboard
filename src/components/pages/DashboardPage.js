import React, { useState } from 'react';
import CardSection from './sections/CardSection';
import SearchSection from './sections/SearchSection';
import ChartSection from './sections/ChartSection';
import MapSection from './sections/MapSection';
import TableSection from './sections/TableSection';

const DashboardPage = () => {
  const [overview, setOverview] = useState({
    max: { value: 0, time: '' },
    min: { value: 0, time: '' },
    recent: { value: 0, time: '' },
    total: { value: 0, time: '' },
  });
  const [events, setEvents] = useState({});
  const [count, setCount] = useState({ low: 0, medium: 0, high: 0 });
  const [mapCenter, setMapCenter] = useState({
    lat: 39.074208,
    lng: 21.824312,
  });

  return (
    <React.Fragment>
      <SearchSection
        setOverview={setOverview}
        setEvents={setEvents}
        setCount={setCount}
        setMapCenter={setMapCenter}
      />
      <CardSection overview={overview} />
      <ChartSection events={events} count={count} />
      <MapSection mapCenter={mapCenter} events={events} />
      <TableSection events={events} />
    </React.Fragment>
  );
};

export default DashboardPage;
