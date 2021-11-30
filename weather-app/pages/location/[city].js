import React from 'react';
import cities from '../../lib/city.list.json';
import Head from 'next/head';
import TodayWeather from '../../components/TodayWeather.js';

export async function getServerSideProps(context){

    const city = getCity(context.params.city);
    if (!city){
        return(
            {notFound: true}
        )
    }
    
    const APIres = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely`);
    const data = await APIres.json();

    if (!data) {
        return(
            {notFound: true}
        )
    }

    const slug = context.params.city;
    
    return(
        {
            props: {
                city: city,
                currentWeather: data.current,
                dailyWeather: data.daily,
                hourlyWeather: getHourlyWeather(data.hourly),
            }
        }
    )
}

const getCity = (param) => {
    const CityDataSplit= param.trim().split("-");
    const id= CityDataSplit[CityDataSplit.length -1];
    if (!id) {return(null)};

    const city = cities.find(city => city.id.toString() == id);

    if (city){
        return city;
    } else {
        return null;
    }
}

const getHourlyWeather = (HourlyData) =>{
    const current = new Date();
    current.setHours(current.getHours(),0 ,0 ,0);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +1 );
    tomorrow.setHours(0,0,0,0);

    // Devide by 1000 to get timestamps from milliseconds to seconds

    const currentTimeStamp = Math.floor(current.getTime()/1000);
    const tomorrowTimeStamp = Math.floor(tomorrow.getTime()/1000);

    const todayData = HourlyData.filter(data => data.dt < tomorrowTimeStamp);

    return todayData;
}

export default function city({city,currentWeather,dailyWeather,hourlyWeather}) {
    return (
        <div>
            <Head>
                <title>{city.name} weather - Weather Forecast by Islem</title>
            </Head>
            <div className="page-wrapper">
                <div className="container">
                    <TodayWeather city={city} weather={dailyWeather[0]} />
                </div>
            </div>
        </div>
    )
}
