import Head from 'next/head'
import SearchBox from '../components/SearchBox';

export default function Home() {
  return (
    <div>
      <head>
        <title>Weather Forecast by Islem</title>
      </head>

      <div className="home">
        <div className="container">
          <SearchBox placeholder={"Search for a location..."}/>
        </div>
      </div>
    </div>
  )
}
