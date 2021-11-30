import React from 'react'
import city from '../pages/location/[city]'

export default function TodayWeather({city, weather}) {
    console.log(city);
    console.log(weather);
    return (
        <div className="today">
            <div className="today__inner">
                <div className="today__left-content">
                    <h1>{city.name}{city.state && ` , ${city.state}`} ({city.country})</h1>
                </div>
            </div>
        </div>
    )
        
}
