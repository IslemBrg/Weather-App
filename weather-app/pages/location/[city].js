import React from 'react';
import cities from '../../lib/city.list.json';
import Head from 'next/head';
import TodayWeather from '../../components/TodayWeather.js';
import SearchBox from '../../components/SearchBox';
import moment from 'moment-timezone';
import HourlyWeather from '../../components/HourlyWeather.js'
import DailyWeather from '../../components/DailyWeather';
import Darkmode from 'darkmode-js';
import FamousPlaces from '../../components/FamousPlaces';
import Background from '../../components/Background';

const options = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: true, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();


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
                timezone: data.timezone,
                currentWeather: data.current,
                dailyWeather: data.daily,
                hourlyWeather: getHourlyWeather(data.hourly, data.timezone),
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

const getHourlyWeather = (HourlyData, timezone) =>{
    const now = moment().tz(timezone).valueOf();
    const endOfDay = moment().tz(timezone).endOf('day').valueOf();
    // devide time by 1000 to transform from milliseconds to seconds
    const endOfDayTimeStamp = Math.floor(endOfDay / 1000);
    const nowTimeStamp = Math.floor(now/1000);

    return (HourlyData.filter(data => (data.dt < endOfDayTimeStamp) && (data.dt >nowTimeStamp)));
}

export default function city({city,currentWeather,dailyWeather,hourlyWeather,timezone}) {
    return (
        <div>
            <Head>
                <title>{city.name} weather - Weather Forecast by Islem</title>
            </Head>
            <div className="backgroundCov">
                <Background/>
            </div>
            <div className="page-wrapper">
                
                <div className="container">
                    
                    <SearchBox placeholder={"search for another location..."}/>
                    <TodayWeather city={city} weather={dailyWeather[0]} timezone={timezone} currentWeather={currentWeather} />
                    <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone}/>
                    <DailyWeather dailyWeather={dailyWeather} currentWeather={currentWeather} timezone={timezone}/>
                    <FamousPlaces/>
                </div>
            </div>
        </div>
    )
}
