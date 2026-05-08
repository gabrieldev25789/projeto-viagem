import "./Places.css"
import { useEffect } from "react"

// ─────────────────────────────────────────────
// COMPONENT: Places
// Lista de destinos filtrados por continente, país ou cidade
// Props:
//   placesData        → dados completos de destinos
//   chooseCity        → seleciona uma cidade
//   selectCity        → ID da cidade ativa
//   citySearch        → texto do filtro por cidade
//   sortedCities      → lista ordenada (quando filtro de preço está ativo)
//   removeCLass       → impede layout em lista no modo ordenado
//   countryValue      → filtro ativo de país
//   continentValue    → filtro ativo de continente
//   setHide/setMessage → controlam toast de erro externo
// ─────────────────────────────────────────────
function Places({ placesData, chooseCity, selectCity, citySearch, sortedCities, removeCLass, countryValue, continentValue, setHide, setMessage }) {

  // Filtra cidades pelo texto digitado, mantendo a estrutura por continente/país
  const placesFound = placesData.map((place) => ({
    ...place,
    cities: place.cities.filter(city =>
      citySearch ? city.name.toLowerCase().includes(citySearch.toLowerCase()) : true
    )
  })).filter(place => place.cities.length > 0) // remove países sem cidades após o filtro

  // True quando há filtro ativo mas nenhum resultado foi encontrado
  const notFound = (countryValue || citySearch || continentValue) && placesFound.length === 0

  // Dispara toast de erro quando nenhum resultado é encontrado
  useEffect(() => {
    if (notFound) {
      setHide(true)
      if (citySearch) {
        setMessage({ text: "City not found", type: "erro", isOpen: true })
      } else if (countryValue) {
        setMessage({ text: "Country not found", type: "erro", isOpen: true })
      } else {
        setMessage({ text: "Continent not found", type: "erro", isOpen: true })
      }
    } else {
      setHide(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notFound])

  // ── Render: modo ordenado por preço ──────────
  // Quando sortedCities existe, renderiza a lista flat (sem agrupar por continente)
  if (sortedCities) {
    return (
      <div className={`infos-container ${citySearch ? `${!removeCLass ? "infos-container--list" : ""}` : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
          {sortedCities
            .filter(city =>
              citySearch ? city.name.toLowerCase().includes(citySearch.toLowerCase()) : true
            )
            .map((city, index) => {
              // Busca continente e país da cidade para exibir no card
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

  // Container vazio quando não há resultados (mantém espaço no layout)
  if (notFound) return <div className="infos-container hide"></div>

  // ── Render: modo padrão — agrupado por continente/país ──
  return (
    <div className={`infos-container ${citySearch ? `${!removeCLass ? "infos-container--list" : ""}` : ""}`}>
      {placesFound.map((place) => (
        <ul className='continent-country-ul' key={place.id}>
          <li className='continent-country-li'>{place.continent}</li>
          <li className='continent-country-li'>{place.country}</li>
          <li className='cities-li'>
            <ul className='cities-ul'>
              {place.cities.map((city, index) => (
                <div className='city-card-wrapper' key={city.id} style={{ animationDelay: `${index * 60}ms`}}>
                  <li
                    onClick={() => chooseCity(city.id, city.name, city.price, city.img)}
                    className={`city-card ${selectCity === city.id ? "select" : ""}`}
                  >
                    <img className='city-img' src={city.img} alt={city.name} />
                    <div className='city-info'>
                      <h3 className='city-name'>{city.name}</h3>
                      <p className='city-price'>
                        USD {city.price.toFixed(2)}
                        <span style={{ color: "#b7791f" }}> (+10% per week)</span> {/* aviso de taxa semanal */}
                      </p>
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