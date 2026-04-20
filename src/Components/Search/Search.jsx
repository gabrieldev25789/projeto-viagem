import "./Search.css"
import { useState } from 'react'
import { places } from '../data/places'
import Places from '../Places/Places'

function Search({ onFilter }) {
  const [value, setValue] = useState("")

  function handleChange(e) {
    const inputValue = e.target.value
    setValue(inputValue)

    const valueReset = inputValue.toLowerCase().trim()

    const filtered = valueReset
      ? places.filter(place =>
          place.country.toLowerCase().includes(valueReset)
        )
      : places

    onFilter(filtered)
  }

  return (
    <div className="search-wrap">
      <div className="search-field">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6.5" cy="6.5" r="4.5"/>
          <path d="M10.5 10.5L14 14" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          placeholder="Search country..."
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />
        {value && (
          <button className="clear-btn" onClick={() => setValue('')}>
            <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M2 2l6 6M8 2l-6 6" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
    
}

export default Search