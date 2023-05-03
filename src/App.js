import React, { useState } from 'react';

const api = {
  key: "475159de360392e6aa235b76aaa47089",
  base: "https://api.openweathermap.org/data/2.5/"
}

let city = ''
const apiTime = {
  method: 'GET',
  url: 'https://api.api-ninjas.com/v1/worldtime?city=' + city,
  headers: { 'X-Api-Key': 'eH2EqDyaO40+dr9/spancQ==3uRVtTihSVqGM3Gl'},
  contentType: 'application/json',
  success: function(result) {
      console.log(result);
  },
  error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
  }
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [time, setTime] = useState({});
  const [suffix, setSuffix] = useState('');
  

  const search = evt => { 
    if (evt.key === "Enter") {
      fetch(`https://api.api-ninjas.com/v1/worldtime?city=${query}`, apiTime)
        .then(res=> res.json())
        .then(result => {setTime(result)});
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res=> res.json( ))
        .then(result => {setQuery(''); 
        setWeather(result);
      });
      setSuffix(randomizer());
      
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  } 
  
  const randomizer = () => {
    let a = Math.floor(Math.random() *4);
    return a === 0 ? "zero" : (a === 1 ? "one" : (a === 2 ? "two" : "three"));
  };



  return (
    <div className={(typeof weather.main != "undefined")
      ? ((weather.weather[0].main === "Clouds") ?
           `App cloudy-${suffix}` : ((weather.weather[0].main === "Rain") 
           ? `App rainy-${suffix}` : ((weather.weather[0].main === "Clear") 
           ? `App sunny-${suffix}` : ((weather.weather[0].main === "Snow") ? `App snow-${suffix}` : "App")))) : "App"}>
      <main>
        <div className="search-box">
           <span className='glass'>
            .
           </span>

          <input
          type = "text"
          className='search-bar'
          placeholder='Search...'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyDown={search}
          >
       
          </input>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>
                {dateBuilder(new Date())}
              </div>
              <div className='time'>
                {time.hour} : {time.minute}
              </div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ): ('')}
        
      </main>
    </div>
  );
}

export default App;
