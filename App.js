import React,{useEffect, useState} from "react";
import places from "places.js";
import "./App.css";
import moment from "moment";
import "moment/locale/fr";


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(0);
  const [data, setData] = useState([]);
  const key = "1d5cfbb4b1ba74f6287033207b5f59d7";
  const iconLink = "https://darksky.net/images/weather-icons";
  

  useEffect(() => {
    getPlaces();
  },[]);

   async function getWeather(suggestion) {
    const proxy ="https ://cors-anywhere.herokuapp.com/"
    let apiUrl = `https://api.darksky.net/
    forecast/${key}/${suggestion.latlng.lat},
    ${suggestion.latlng.lng}?lang=fr&units=ca`
    const data = await fetch( proxy + apiUrl);
    const res = await data.json();
    const weatherData = {
      time : res.currently.time,
      summary : res.currently.summary,
     icon : res.currently.icon ,
     temperature : res.currently.temperature,
     humidity : res.currently.humidity,
    }
   setWeather(weatherData);
   setData(resData.daily.data)
   } 

       

  function getPlaces() {
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/places.js/1/places.min.js';
    script.onerror = () => {
      console.error('Error loading Algolia Places script');
    };
  
    document.head.appendChild(script);
  
    script.onload = () => {
      let placeAutoComplete = places({
        appId: "Y29BMAJYTD",
        apiKey: "00475b8319d921b9cf3a5f74e313fc54",
        container: document.querySelector('#address-input'),
      });
      placeAutoComplete.on("change", function (e) {
        getWeather(e.suggestion);
      })
    };
  }



  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-6 mx-auto">
          <div className="card bg-white text-dark">
            <div className="card-header">
              <h3 className="card-title mt-2 text-center">React weather</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <input 
                      type="text"
                      name="city" 
                      id="address-input" 
                      className="form-control"
                      placeholder="Enter une ville" 
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {
                weather !== null && (
                  <div className="weather border-bot">
                    <div className="weather-header">
                      <img src={iconLink + day.icon + ".png"}
                      alt="icon"
                      width="80"
                      height="80"
                      className="img-fluid"
                     />
                     <h3 className="temperature mr-2 font-weight">
                      {weather.temperature}
                     </h3>
                     <h5 className="font-weight-bold">
                      {weather.summary}
                     </h5>
                    </div>
                  </div>
                )
              }
              <div className="row">
                {
                  data !== null && (data.map(day =>(
                    <div className="col mb-1">
                      <div className="day">
                        <span className="text-dark">
                          {day.time}

                        </span>
                        <img src={iconLink + day.icon + ".png"}
                      alt="icon"
                      width="80"
                      height="80"
                      className="img-fluid"
                     />
                     <span className="text-dark">
                      Max : {Math.round(day.temperatureHight) + "c"}

                     </span>

                     <span className="text-dark" className="text-dark font-weight-bold">
                      Min : {Math.round(day.temperatureLow) + "c"}

                     </span>
                     <img 
                     src={iconLink + day.icon + ".png"}
                     alt="icon"
                     width="50"
                     height="50"
                     className="img-fluid"



                     />
                     <h3 ></h3>




                      </div>

                    </div>
                  )))
                }
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
