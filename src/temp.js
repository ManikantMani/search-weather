import React, { useState, useEffect } from 'react';
import "./style.css";
import WeatherCard from './weatherCard';

const Temp = () => {
    const [searchValue, setSearchValue] = useState("ujjain");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let res =
                `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e8ef4570be1706e4e46d4e0f6803ecd9`;
            const data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        getWeatherInfo();
    },)

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder="search..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
            {/* our temprature card */}

            <WeatherCard tempInfo={tempInfo} />

        </>
    );
};

export default Temp;
