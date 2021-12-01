import Head from 'next/head'
import SearchBox from '../components/SearchBox';
import Darkmode from 'darkmode-js';
import FamousPlaces from '../components/FamousPlaces';
import Background from '../components/Background';

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

export default function Home() {
  return (
    <div>
      <head>
        <title>Weather Forecast by Islem</title>
      </head>
      <div className="backgroundCov">
        <Background/>
      </div>
      <div className="home">
        <div className="container">
          <SearchBox placeholder={"Search for a location..."}/>
          <FamousPlaces/>
        </div>
      </div>
    </div>
  )
}
