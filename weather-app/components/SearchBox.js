import React from 'react'
import cities from '../lib/city.list.json';
import Link from 'next/link';
import Router from 'next/router';

export default function SearchBox({placeholder}) {

    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState([]);

    React.useEffect(() => {
        const clearQuery = () => setQuery("");
        Router.events.on("routeChangeComplete",clearQuery);
        return () => {
            Router.events.off("routeChangeComplete",clearQuery);
        }
    }, []);
    
    const onChange = (e) => {
        const { value } = e.target;
        setQuery(value);

        let matchingCities = [];

        if (value.length >0){
            for (let city of cities){
                if (matchingCities.length >=20){
                    break;
                }
                
                if (city.name.toLowerCase().startsWith(value.toLowerCase()) || (city.state.toLowerCase().startsWith(value.toLowerCase()))) {
                    
                    const cityData={
                        ...city,
                        slug: `${city.name.toLowerCase().replace(/ /g,"-")}-${city.id}`
                    }

                    matchingCities.push(cityData);
                }
            }
        }
        return setResults(matchingCities);
    };

    return (
        <div className="search">
            <input type="text" value={query} onChange={onChange} placeholder={placeholder ? placeholder : ""} />
            {
                query.length > 0 && (
                    <ul>
                        {
                            results.length > 0 ? (
                                results.map((city) =>
                                    <li key={city.slug}>
                                        <Link href= {`/location/${city.slug}`}>
                                            <a>
                                                {city.name}
                                                {city.state && `, ${city.state} `}
                                                <span>({city.country})</span>
                                            </a>
                                        </Link>
                                    </li>
                                )
                            ) : (
                                <li className="search__no-results">No Data found.</li>
                            )
                        }
                    </ul>
                )
            }           
        </div>
    )
}
