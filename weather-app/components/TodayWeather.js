import React from 'react'
import city from '../pages/location/[city]'
import moment from 'moment-timezone';
import Image from 'next/image';

export default function TodayWeather({city, weather, currentWeather, timezone}) {
    return (
        <div className="today">
            <div className="today__inner">
                <div className="today__left-content">
                    
                    <h1>
                        {city.name}{city.state && ` , ${city.state}`} ({city.country})
                    </h1>
                    
                        
                    <h2>
                        <span>Currently {currentWeather.temp.toFixed(0)}&deg;C</span>
                       <span>    ↑{weather.temp.max.toFixed(0)}&deg;C   ↓{weather.temp.min.toFixed(0)}&deg;C</span>
                    </h2>

                    <div className="today__sun-times">
                        <div>
                            <span>Sunrise</span>
                            <span>{moment.unix(weather.sunrise).tz(timezone).format("LT")}</span>
                        </div>

                        <div>
                            <span>Sunset</span>
                            <span>{moment.unix(weather.sunset).tz(timezone).format("LT")}</span>
                        </div>
                    </div>
                </div>
                <div className="today__right-content">
                <h3>
                    {moment.unix(currentWeather.dt).tz(timezone).format("dddd, d MMM YYYY")}    
                </h3>
                <h3>
                ({moment.unix(currentWeather.dt).tz(timezone).format("LT")})
                </h3>
                    <div className="today__icon-wrapper">
                        <div>
                            <Image
                            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                            alt={currentWeather.weather[0].description}
                            layout='fill'
                            />
                        </div>
                            
                    </div>
                    <h3>{currentWeather.weather[0].description}</h3>
                </div>
            </div>
        </div>
    )
        
}
