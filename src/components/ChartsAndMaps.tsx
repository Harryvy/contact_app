import React from 'react';
import { useQuery } from 'react-query';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartsAndMaps: React.FC = () => {
  // Fetch COVID-19 data for line graph
  const { data: graphData } = useQuery('graphData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return response.data;
  });

  // Fetch COVID-19 data for maps
  const { data: countriesData } = useQuery('countriesData', async () => {
    const response = await axios.get('https://disease.sh/v3/covid-19/countries');
    console.log('Country:', response.data);
    return response.data;
  });

  // Process graph data for line chart
  const chartData = Object.keys(graphData?.cases || []).map(date => ({
    date,
    cases: graphData.cases[date],
  }));

  // Define initial map center and zoom level
  const initialMapCenter = { lat: 0, lng: 0 };
  const initialMapZoom = 2;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Charts and Maps</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
        
        <LineChart width={600} height={300} data={chartData}  margin={{ left: 30, right: 30 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cases" stroke="rgba(75, 192, 192, 1)" fill="rgba(75, 192, 192, 0.2)" />
        </LineChart>
        
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Map</h3>
        <MapContainer center={initialMapCenter} zoom={initialMapZoom} style={{ height: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countriesData?.map((country: any) => {
            const customIcon = L.icon({
              iconUrl: country.countryInfo.flag, // Assuming icon URL is available in country data
              iconSize: [25, 25],
              iconAnchor: [12.5, 25],
            });

            return (
              <Marker
                key={country.countryInfo.iso3}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                icon={customIcon}
              >
                <Popup>
                  <div>
                    <h4>{country.country}</h4>
                    <p>Active: {country.active}</p>
                    <p>Recovered: {country.recovered}</p>
                    <p>Deaths: {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default ChartsAndMaps;
