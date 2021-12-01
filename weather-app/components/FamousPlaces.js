import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


//importing images
import tunisImage from '../public/images/tunis.jpg';
import DubaiImage from '../public/images/dubai.jpg';
import SyriaImage from '../public/images/syria.jpg';
import AlexandriaImage from '../public/images/alexandria.jpg';
import LondonImage from '../public/images/london.jpg';
import NewYorkImage from '../public/images/new-york.jpg';
import ParisImage from '../public/images/paris.jpg';
import TokyoImage from '../public/images/tokyo.jpg';

export default function FamousPlaces() {

  const places = [
    {
      name:"tunis",
      image: tunisImage,
      url:"/location/tunis-2464470",
    },
    {
      name:"dubai",
      image: DubaiImage,
      url:"/location/dubai-292223"
    },
    {
      name:"syria",
      image: SyriaImage,
      url:"/location/syrian-arab-republic-163843"
    },
    {
      name:"alexandria",
      image: AlexandriaImage,
      url:"/location/alexandria-361058",
    },
    {
      name: "London",
      image: LondonImage,
      url: "/location/london-2643743",
    },
    {
      name: "Paris",
      image: ParisImage,
      url: "/location/paris-2968815",
    },
    {
      name: "Tokyo",
      image: TokyoImage,
      url: "/location/tokyo-1850147",
    },
    {
      name: "New York",
      image: NewYorkImage,
      url: "/location/new-york-city-5128581",
    },
  ]
    return (
        <div className="places">
      <div className="places__row">
        {places.length > 0 &&
          places.map((place, index) => (
            <div className="places__box" key={index}>
              <Link href={place.url}>
                <a>
                  <div className="places__image-wrapper">
                    <Image
                      src={place.image}
                      alt={`${place.name} Image`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <span>{place.name}</span>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
    )
}
