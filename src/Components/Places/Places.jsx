import React, { useState } from 'react'
import { places } from '../data/places'
import "./Places.css"

function Places({ placesData = places, chooseCity, selectCity, setSelectCity }) {

  return (
    <div className='infos-container'>
      {placesData.map((place) => (
        <ul className='continent-country-ul' key={place.id}>
          <li className='continent-country-li'>{place.continent}</li>
          <li className='continent-country-li'>{place.country}</li>

          <li className='cities-li'>
            <ul className='cities-ul'>
              {place.cities.map((city, index) => (
                <div
                  className='city-card-wrapper'
                  key={city.id}
                  style={{ animationDelay: `${index * 60}ms`}}
                >
                  <li
                  onClick={() => {chooseCity(city.id, city.name, city.price, city.img), setSelectCity(city.id)}}
                  className={`city-card ${selectCity === city.id ? "select" : ""}`}
                  >
                    <img className='city-img' src={city.img} alt={city.name} />
                    <div className='city-info'>
                      <h3 className='city-name'>{city.name}</h3>
                      <p className='city-price'>USD {(city.price).toFixed(2)}</p>
                      <p className='city-description'>{city.description}</p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default Places