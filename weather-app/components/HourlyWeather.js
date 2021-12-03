import React from 'react'
import moment from 'moment-timezone';
import Image from 'next/image';

export default function HourlyWeather({hourlyWeather, timezone}) {
    return (
        <div>
        {hourlyWeather.length > 0 ? 
            <div className="weekly">
            <h3 className="weekly__title">
                Rest of <span>the Day</span>
            </h3>            
        </div>
        : <div className="weekly">
        <h3 className="weekly__title">
            <span>End of the Day.</span><br/>
            <span>No</span> Hourly Weather <span>Data.</span>
        </h3>
        </div>
        
        }
        <div className="hourly">
            
            <div className="hourly__inner">
                
                {hourlyWeather.length > 0 && 
                    hourlyWeather.map((weather , index) => 
                        <div className="hourly__box-wrapper" key={weather.dt}>
                            <div className="hourly__box">
                                <span className="hourly__time">
                                    {moment.unix(weather.dt).tz(timezone).format("LT")}
                                </span>
                                <Image
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt={weather.weather[0].main}
                                    height="100"
                                    width="100"
                                />
                                <span>
                                    {weather.temp.toFixed(0)}&deg;C
                                </span>
                            </div>
                       </div>
                    )
                }
            </div>
        </div>
    </div>
    )
}


