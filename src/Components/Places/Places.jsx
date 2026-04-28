import "./Places.css"

function Places({ placesData, chooseCity, selectCity, citySearch, sortedCities, removeCLass }) {


  if (sortedCities) {
    return (
      <div className={`infos-container ${citySearch ? `${!removeCLass ? "infos-container--list" : ""}` : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
          {sortedCities
            .filter(city =>
              citySearch ? city.name.toLowerCase().includes(citySearch.toLowerCase()) : true
            )
            .map((city, index) => {
              const place = placesData.find(p => p.cities.some(c => c.id === city.id))

              return (
                <ul className='continent-country-ul' key={city.id}>
                  <div className='city-card-wrapper' style={{ animationDelay: `${index * 60}ms` }}>
                    <li className='continent-country-li'>{place?.continent}</li>
                    <li className='continent-country-li'>{place?.country}</li>
                    <li className='cities-li'>
                      <ul className='cities-ul'>
                        <li
                          onClick={() => chooseCity(city.id, city.name, city.price, city.img)}
                          className={`city-card ${selectCity === city.id ? "select" : ""}`}
                        >
                          <img className='city-img' src={city.img} alt={city.name} />
                          <div className='city-info'>
                            <h3 className='city-name'>{city.name}</h3>
                            <p className='city-price'>USD {city.price.toFixed(2)}</p>
                            <p className='city-description'>{city.description}</p>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </div>
                </ul>
              )
            })
          }
        </div>
      </div>
    )
  }

  return (
    <div className={`infos-container ${citySearch ? `${!removeCLass ? "infos-container--list" : ""}` : ""}`}>
      {placesData.map((place) => {
        const filteredCities = place.cities.filter(city =>
          citySearch ? city.name.toLowerCase().includes(citySearch.toLowerCase()) : true
        )

        console.log("place:", place.country, "filteredCities:", filteredCities.length)

        if (filteredCities.length === 0) return null

        return (
          <ul className='continent-country-ul' key={place.id}>
            <li className='continent-country-li'>{place.continent}</li>
            <li className='continent-country-li'>{place.country}</li>
            <li className='cities-li'>
              <ul className='cities-ul'>
                {filteredCities.map((city, index) => (
                  <div className='city-card-wrapper' key={city.id} style={{ animationDelay: `${index * 60}ms` }}>
                    <li
                      onClick={() => chooseCity(city.id, city.name, city.price, city.img)}
                      className={`city-card ${selectCity === city.id ? "select" : ""}`}
                    >
                      <img className='city-img' src={city.img} alt={city.name} />
                      <div className='city-info'>
                        <h3 className='city-name'>{city.name}</h3>
                        <p className='city-price'>USD {city.price.toFixed(2)}</p>
                        <p className='city-description'>{city.description}</p>
                      </div>
                    </li>
                  </div>
                ))}
              </ul>
            </li>
          </ul>
        )
      })}
    </div>
  )
}

export default Places