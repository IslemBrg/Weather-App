import Head from 'next/head'
import SearchBox from '../components/SearchBox';
import FamousPlaces from '../components/FamousPlaces';


export default function Home() {
  return (
    <div>
      <head>
        <title>Weather Forecast by MetChames </title>
      </head>
      
      <div className="home">
        <div className="container">
          <div className="Headtxt">
            <h1>Weather Forecast App by MetChames </h1>
            <h1>Built using NEXT.js</h1>
          </div>
          <SearchBox placeholder={"Search for a location..."}/>
          <FamousPlaces/>
        </div>
      </div>
    </div>
  )
}
