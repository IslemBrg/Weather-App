import React from 'react'
import cities from '../lib/city.list.json';
import Link from 'next/link';

export default function SearchBox() {

    const [querry, setQuary] = React.useState("");
    const [results, setResults] = React.useState([]);

    const onChange = (e) => {
        const { value } = e.target;
        setQuary(value);

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
            <input type="text" value={querry} onChange={onChange} />
            {
                querry.length > 0 && (
                    <ul>
                        {
                            results.length > 0 ? (
                                results.map((city) =>
                                    <li keys={city.slug}>
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
