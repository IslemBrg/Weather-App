import React from 'react'
import moment from 'moment-timezone';

export default function HourlyWeather({hourlyWeather, timezone}) {
    console.log(hourlyWeather);
    return (
        
        <div className="hourly">
            <div className="hourly__inner">
                {hourlyWeather.length > 0 && 
                    hourlyWeather.map((weather , index) => 
                        <div className="hourly__box-wrapper" key={weather.dt}>
                            <div className="hourly__box">
                                <span className="hourly__time">
                                    {moment.unix(weather.dt).tz(timezone).format("LT")}
                                </span>
                            </div>
                       </div>
                    )
                }
            </div>
        </div>
    
    )
}
