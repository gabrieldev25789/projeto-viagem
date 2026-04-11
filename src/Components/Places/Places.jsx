import React from 'react'
import { places } from '../data/places'
import "./Places.css"

function Places({ chooseCity }) {
return (
  <div className='infos-container'>
  {places.map((place) => (
    <ul className='continent-country-ul' key={place.id}>
      <li className='continent-country-li'>{place.continent}</li>
      <li className='continent-country-li'>{place.country}</li>

      <li className='cities-li'>
        <ul className='cities-ul'>
          {place.cities.map((city) => (
            <li className='city-card' key={city.name} onClick={() => chooseCity(city.name, city.price)}>
              <img className='city-img' src={city.img} alt={city.name} />
              <div className='city-info'>
                <h3 className='city-name'>{city.name}</h3>
                <p className='city-price'>R$ {city.price}</p>
                <p className='city-description'>{city.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  ))}
</div>
)
}

export default Places