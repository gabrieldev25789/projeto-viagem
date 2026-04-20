import "./Search.css"
import { useState } from 'react'
import { places } from '../data/places'
import Places from '../Places/Places'

function Search({ onFilter }) {
const [cityValue, setCityValue] = useState("")
const [continentValue, setContinentValue] = useState("")
const [countryValue, setCountryValue] = useState("")

function handleChange(e, field) {
  const inputValue = e.target.value.toLowerCase().trim()

  if (field === "city") {
    setCityValue(e.target.value)
  } 

  if (field === "continent"){ 
    setContinentValue(e.target.value)
  }

  if (field === "country") {
    setCountryValue(e.target.value)
  }  

  const allSetters = { city: setCityValue, continent: setContinentValue, country: setCountryValue }

  Object.entries(allSetters).forEach(([key, set]) => {
    key === field ? set(e.target.value) : set("")
  })

  const filtered = inputValue
    ? places.filter(place => {
        if (field === "city") return place.cities.some(city => city.name.toLowerCase().includes(inputValue))
        if (field === "continent") return place.continent.toLowerCase().includes(inputValue)
        if (field === "country")   return place.country.toLowerCase().includes(inputValue)
      })
    : places

  onFilter(filtered)
}

  return (
    <>
    <div className="search-wrap">
      <div className="search-field">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6.5" cy="6.5" r="4.5"/>
          <path d="M10.5 10.5L14 14" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search city..."
          value={cityValue}
          onChange={(e) => handleChange(e, "city")}
          autoComplete="off"
        />
        {cityValue && (
          <button className="clear-btn" onClick={() => setCityValue('')}>
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 2l6 6M8 2l-6 6" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>


    <div className="search-wrap">
      <div className="search-field">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6.5" cy="6.5" r="4.5"/>
          <path d="M10.5 10.5L14 14" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search continent..."
          value={continentValue}
          onChange={(e) => handleChange(e, "continent")}
          autoComplete="off"
        />
        {continentValue && (
          <button className="clear-btn" onClick={() => setContinentValue('')}>
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 2l6 6M8 2l-6 6" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>

    <div className="search-wrap">
      <div className="search-field">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6.5" cy="6.5" r="4.5"/>
          <path d="M10.5 10.5L14 14" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search country..."
          value={countryValue}
          onChange={(e) => handleChange(e, "country")}
          autoComplete="off"
        />
        {countryValue && (
          <button className="clear-btn" onClick={() => setCountryValue('')}>
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 2l6 6M8 2l-6 6" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  </>
  )
    
}

export default Search