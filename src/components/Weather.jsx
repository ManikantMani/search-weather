import React, { useEffect, useState } from "react";
import "./style.css";

const Weather = () => {
  const [searchValue, setSearchValue] = useState("ujjain");
  const [tempInfo, setTempInfo] = useState({});

  // for weather mood
  const [weatherState, setWeatherState] = useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e8ef4570be1706e4e46d4e0f6803ecd9`;

      const res = await fetch(url);
      const data = await res.json();
      //   console.log(data);
      const { temp } = data.main;
      const { main: weathremood } = data.weather[0];
      const { name } = data;
      const { country } = data.sys;
      // console.log(country)
      const myNewWeatherInfo = { temp, weathremood, name, country };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const { temp, weathremood, name, country } = tempInfo;

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  let day = weekday[d.getDay()];

  useEffect(() => {
    getWeatherInfo();
  }, []);

  // for weather mood useeffect

  useEffect(() => {
    if (weathremood) {
      switch (weathremood) {
        case "Clouds":
          setWeatherState("fas fa-clouds");
          break;
        case "Haze":
          setWeatherState("fas fa-smog");
          break;
        case "Clear":
          setWeatherState("fas fa-sun");
          break;
        default:
          setWeatherState("fas fa-cloud-sun");
          break;
      }
    }
  }, [weathremood]);

  return (
    <>
      <div className="container-fluid main_header">
        <div className="row">
          <div className="col-md-10 col-12 mx-auto">
            <div className="main_content">
              <form className="temp_form">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your city name"
                  autoComplete="off"
                  id="search"
                  autoFocus
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  className="input"
                  type="button"
                  value="search"
                  onClick={getWeatherInfo}
                >
                  Search
                </button>
              </form>
            </div>

            {/* weather card  */}

            <div className="tempInformation">
              <div className="top_layer">
                <p>{new Date().toLocaleTimeString()}</p>
                <p>{day}</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
              <div className="main_layer">
                <p className="city_name">
                  {name},{country}
                </p>
                <div className="middle_layer data_hide">
                  <p id="temp">
                    <span>{temp}&deg;C</span>
                  </p>
                  <p id="temp_status">
                    <i class={`fas ${weatherState}`} aria-hidden="true"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
