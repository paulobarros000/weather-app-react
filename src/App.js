import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0616b7f2711cb0fecee4dc429109f400`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
          <p className='location-text'>{data.name} {data.sys && data.sys.country ? data.sys.country : null}  <img src={data.sys && data.sys.country ? `https://flagsapi.com/${data.sys.country}/shiny/32.png` : null} alt="" /></p>
          </div>
          <div className="temp">
            {data.main ? <h1 className='temp-text'>{data.main.temp.toFixed()}°C</h1> : null}
           {data.weather ? <p className='description-text'>{data.weather[0].description}</p> : null}           </div>
          <div className="description">
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="minmax">
            {data.main ? <p className='bold'>❄️ {data.main.temp_min.toFixed()}°C</p> : null}
            {data.main ? <p className='bold'>🔥 {data.main.temp_max.toFixed()}°C</p> : null}          
              </div>
            <div className='sunrise-sun'>
              {data.sys ? <p className='bold'>🌞 {new Date(data.sys.sunrise * 1000).toLocaleTimeString('pt-PT')}</p> : null}
              {data.sys ? <p className='bold'>🌙 {new Date(data.sys.sunset * 1000).toLocaleTimeString('pt-PT')}</p> : null}
            </div>
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KM/h</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;