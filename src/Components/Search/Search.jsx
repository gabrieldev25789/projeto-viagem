import { useState } from 'react'
import { places } from '../data/places'
import Places from '../Places/Places'

function Search({ chooseCity }) {
  const [value, setValue] = useState("")

  const valueReset = value.toLowerCase().trim()

  const filteredPlaces = valueReset
    ? places.filter(place =>
        place.country.toLowerCase().includes(valueReset)
      )
    : places

  return (
    <div>
      <input 
        type="text" 
        placeholder='Search country...' 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Places placesData={filteredPlaces} chooseCity={chooseCity} />
    </div>
  )
}

export default Search