import React,{ useState,useEffect } from 'react'
import './index.css'
import Forecast from './Forecast.jsx'

function App() {
  
   const [weather, setWeather] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [city , setCity]= useState("lahijan");
   const [value , setValue]= useState("");
   const [showComponent, setShowComponent] = useState(false);
  
   
   useEffect(() => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bd9cbea7774a975e5f9a94706ee46bea`;
      const fetchWeather = async () => {
         try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWeather(data);
           
            
         } catch (error) {

            setError(error);
          
            
         } finally {
            setLoading(false);
         }
      };
   
      fetchWeather();
   }, [city]);
   
   const handleSubmit = (e) =>{ 
      e.preventDefault();
      if(value){
         setCity(value)
         setValue("")
      }
   }
  
   
  
   const weatherIcon = (description)=> {
      switch(description){
         case 'overcast clouds':
         return <div className='icon' id="overcast_clouds"></div>;
      case 'scattered clouds':
         return <div className='icon' id="scattered_clouds"></div>;
      case 'broken clouds':
         return <div className='icon' id="broken_clouds"></div>;
      case 'light rain':
         return <div className='icon' id="light_rain"></div>;
      case 'snow':
         return <div className='icon' id="snow"></div>;
      case 'few clouds':
         return <div className='icon' id="few_clouds"></div>;
      case 'clear sky':
         return <div className='icon' id="clear_sky"></div>;
      default:
         return <div className='icon' id="default_icon"></div>;
   }
      }
      
   
   
   const forecast = () => {
       setShowComponent(!showComponent);
      
   }
      
   

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;

   


  return (
    <>
      <div id="container">
        <h1 id="title">Weather</h1>
        
        <div>
            <form id='search' action="submit"   onSubmit={handleSubmit}>
               <input type="text" value={value} onChange= {(e) => setValue(e.target.value)} placeholder='Enter your city...' />
               <button type='submit'> submit </button>
               
            </form>
            <h1 id='cityname'> {city.charAt(0).toUpperCase()+city.slice(1) } </h1>
            <div id='description'>
               <div id="weather-icon">
               <div id='temp'> 
               {Math.round(weather.list[0].main.temp - 273.15)}°C
               </div>  
             <div >{weatherIcon(weather.list[0].weather[0].description)}</div>
               </div>
               <div id='details'>
                  
                  <p>
                     {Math.round(weather.list[0].main.temp_min - 273.15)}° / 
                     {Math.round(weather.list[0].main.temp_max - 273.15)}° 
                     Feels like: {Math.round(weather.list[0].main.feels_like - 273.15)}°C
                  </p>
                  <p>{weather.list[1].weather[0].description}</p>
                  <p>Humidity: {weather.list[0].main.humidity} %</p>
                  <p>Wind speed: {weather.list[3].wind.speed} m/s</p>
               </div>
            </div>
         </div>
         <button id='more' onClick={forecast}>
             
            {showComponent ? 'Less details...' : 'More details...'} 
         </button>
         {showComponent && <Forecast weather={weather} weatherIcon={weatherIcon} />}  
      </div>
    </>
  )
}

export default App
