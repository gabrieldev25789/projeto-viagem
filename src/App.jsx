import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Main/Main'
import Cart from './Components/Cart/Cart'
import Search from './Components/Search/Search'
import Requested from '../pages/Requested'
import FlightSearch from './Components/FlightSearch/FlightSearch'
import { places } from './Components/data/places'
import Places from './Components/Places/Places'

function App() {
  const [show, setShow] = useState(false)
  const [list, setList] = useState([])
  const [dates, setDates] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [pendingCity, setPendingCity] = useState(null) 

  const [select, setSelect] = useState(false)

  const [array, setArray] = useState([])

  const navigate = useNavigate()

  const total = list.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.amount) || 0),
    0
  )

  function finish() {
    navigate('/requested', { state: { list, total } })
  }

  function showDestinations() {
    setShowCalendar(false)
    setShow((prev) => !prev)
  }

  function chooseCity(id, name, price, img) {
    setPendingCity({ id, name, price, img })
    setShowCalendar(true)
    setSelectCity(id)
    return true 
  }

  function handleSearch({ startDate, endDate, nights }) {
    if (!pendingCity) return

    if (nights > 30) {
      alert("You can only stay for 30 nights")
      return
    }

    const toISODate = (date) => new Date(date).toISOString().split("T")[0]

    const newItem = {
      ...pendingCity,
      amount: 1,
      startDate: toISODate(startDate),
      endDate: toISODate(endDate),
      nights,
    } 

    setDates({ startDate, endDate, nights })
    setPendingCity(null)
    setShowCalendar(false) 
    
    setList((prev) => {
      const exist = prev.find(item => item.id === pendingCity.id)
      if (exist) {
        return prev.map(item =>
          item.id === pendingCity.id ? { ...item, amount: item.amount + 1 } : item
        )
      }
      return [...prev, newItem]
    }) 
      
    setArray((prev)=> [...prev, newItem])   
  }

  function removeCity(id) {
    setList((prev) =>
      prev
        .map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item)
        .filter(item => item.amount > 0)
    )
  }

  const [selectCity, setSelectCity] = useState(null)
  const [value, setValue] = useState("")
  
  const valueReset = value.toLowerCase().trim()

  const filteredPlaces = valueReset
    ? places.filter(place =>
        place.country.toLowerCase().includes(valueReset)
      )
    : places

  return (
    <Routes>
      <Route path="/" element={
        <>
          <NavBar />
          <Main />

          {showCalendar && (
            <FlightSearch onSearch={handleSearch} setSelectCity={setSelectCity}/>
          )}

          <button onClick={showDestinations}>
            {show ? "Click to close" : "Click to see destinations"}
          </button>

          {show && (
            <div className="place-cart-container">
              <Search chooseCity={chooseCity} />
              <Places 
              key={valueReset} 
              placesData={filteredPlaces} 
              chooseCity={chooseCity}
              selectCity={selectCity}
              setSelectCity={selectCity}/>
              <Cart list={list} removeCity={removeCity} finish={finish} />
            </div>
          )}
        </>
      } />
      <Route path="/requested" element={<Requested />} />
    </Routes>
  )
}

export default App