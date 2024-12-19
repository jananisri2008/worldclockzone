import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState('');
  const timerRef = useRef(null);

  const countries = [
    { name: 'New York', offset: -5 },
    { name: 'London', offset: 0 },
    { name: 'India', offset: 5.6 },
  ];

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const getTimeInTimeZone = (offset) => {
    const utcTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000;
    const timeZoneTime = new Date(utcTime + offset * 60 * 60 * 1000);
    return timeZoneTime.toLocaleTimeString();
  };

  return (
    <div className='dropdown'>
      <h1>World Clock with Time Zones.</h1>
      <select
        className='dropdown'
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={index}>
            {country.name}
          </option>
        ))}
      </select>

      {selectedCountry !== '' && (
        <div className='dropdown'>
          <h2>Current Time in {countries[selectedCountry].name}</h2>
          <p>{getTimeInTimeZone(countries[selectedCountry].offset)}</p>
        </div>
      )}
    </div>
  );
}

export default App;