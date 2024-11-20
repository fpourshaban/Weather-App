import React from 'react'
import './forecast.css'


export default function Forecast({weather, weatherIcon}) {


  const forecastShow = weather.list.map((el,index)=>(
  
    <div key={index} id='box'>
        <p>{el.dt_txt.slice(5,16).replace("-","/")}</p>
        {weatherIcon(el.weather[0].description)}
        <p id='fc_temp'>{Math.round(el.main.temp - 273.15)}°C</p>
    </div> 
  ))
  


  return (
    <div>   
      <div id='forecast_box'>{forecastShow}</div>
    </div>
  )
}
