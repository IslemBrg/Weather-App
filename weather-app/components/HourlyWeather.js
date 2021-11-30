import React from 'react'
import moment from 'moment-timezone';
import Image from 'next/image';

export default function HourlyWeather({hourlyWeather, timezone}) {
    console.log(hourlyWeather);
    return (
        
        <div className="hourly">
            <div className="hourly__inner">
                {hourlyWeather.length > 0 && 
                    hourlyWeather.map((weather , index) => 
                        <div className="hourly__box-wrapper" key={weather.dt}>
                            <div className="hourly__box">
                                <span className={`hourly__time ${index == 0 && "hourly__time--now"}`}>
                                    {moment.unix(weather.dt).tz(timezone).format("LT")}
                                </span>
                                <Image
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt={weather.weather[0].main}
                                    height="100"
                                    width="100"
                                />
                            </div>
                       </div>
                    )
                }
            </div>
        </div>
    
    )
}
