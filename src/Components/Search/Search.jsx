import "./Search.css"
import { places } from '../data/places'
import Places from '../Places/Places'

function Search({ onFilter, setCityValue, cityValue, setCitySearch, setSortType, resetValue, setContinentValue, setCountryValue, countryValue, continentValue, setRemoveClass }){

function handleChange(e, field) {
  setRemoveClass(false)
  resetValue()
  setSortType("")

  const rawValue = e.target.value                    
  const inputValue = rawValue.toLowerCase().trim()

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
    key === field ? set(rawValue) : set("")
  })


  const filtered = inputValue
    ? places.filter(place => {
        if (field === "city") return true
        if (field === "city") return place.cities.some(city => city.name.toLowerCase().includes(inputValue))
        if (field === "continent") return place.continent.toLowerCase().includes(inputValue)
        if (field === "country")   return place.country.toLowerCase().includes(inputValue)
      })
    : places

  if (field === "city") {
    setCitySearch(inputValue)
  } else {
    setCitySearch("") 
  }

  onFilter(filtered)
}

const fields = [
  { 
    field: "city",      
    placeholder: "Search city...",      
    value: cityValue,      
    clear: () => { setCityValue(""); setCitySearch(""); onFilter(places); } 
  },
  { 
    field: "continent", 
    placeholder: "Search continent...", 
    value: continentValue, 
    clear: () => { setContinentValue(""); onFilter(places); } 
  },
  { 
    field: "country",   
    placeholder: "Search country...",   
    value: countryValue,   
    clear: () => { setCountryValue(""); onFilter(places); } 
  },
]

return (
  <>
  <div className="search-group">
    {fields.map(({ field, placeholder, value, clear }) => (
      <div className="search-wrap" key={field}>
        <div className="search-field">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="6.5" cy="6.5" r="4.5"/>
            <path d="M10.5 10.5L14 14" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleChange(e, field)}
            autoComplete="off"
          />
          {value && (
            <button className="clear-btn" onClick={clear}>
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 2l6 6M8 2l-6 6" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
  </>
)
    
}

export default Search