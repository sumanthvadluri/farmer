

import React, { useEffect, useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const SoilMonitoring = () => {
  const [moisture, setMoisture] = useState(0);

  const fetchMoisture = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/soil');
      const data = await res.json();
      setMoisture(data.moisture);
    } catch (error) {
      console.error('Error fetching moisture data:', error);
      setMoisture(0);
    }
  };

  useEffect(() => {
    fetchMoisture(); 
    const interval = setInterval(fetchMoisture, 2000);
    return () => clearInterval(interval);
  }, []);

  // Determine soil condition
  const getSoilCondition = (value) => {
    if (value < 300) return { label: 'Wet', color: 'blue' };
    if (value > 700) return { label: 'Dry', color: 'red' };
    return { label: 'Normal', color: 'green' };
  };

  const condition = getSoilCondition(moisture);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>Soil Moisture Monitor</h1>
      <h2>Current Moisture: {moisture}</h2>

      <div style={{ width: '500px', margin: 'auto', paddingTop: '2rem' }}>
        <ReactSpeedometer
          value={moisture}
          minValue={100}
          maxValue={2000}
          segments={10} 
          needleColor="steelblue"
          startColor="lightgreen"
          endColor="red"
          currentValueText="Moisture: ${value}"
          height={300}
        />
      </div>

      <h3 style={{ marginTop: '1.5rem', color: condition.color }}>
        Status: {condition.label}
      </h3>
    </div>
  );
};

export default SoilMonitoring;

