import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Main/Main'
import Cart from './Components/Cart/Cart'
import Search from './Components/Search/Search'
import Requested from './Components/Requested/Requested'
import FlightSearch from './Components/FlightSearch/FlightSearch'

function App() {
  const [show, setShow] = useState(false)
  const [list, setList] = useState([])
  const [dates, setDates] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [pendingCity, setPendingCity] = useState(null) 

  const navigate = useNavigate()

  const total = list.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.amount) || 0),
    0
  )

  function finish() {
    navigate('/requested', { state: { list, total } })
  }

  function showDestinations() {
    setShow((prev) => !prev)
  }

  function chooseCity(id, name, price, img) {
    setPendingCity({ id, name, price, img })
    setShowCalendar(true)
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
  }

  function removeCity(id) {
    setList((prev) =>
      prev
        .map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item)
        .filter(item => item.amount > 0)
    )
  }

  return (
    <Routes>
      <Route path="/" element={
        <>
          <NavBar />
          <Main />

          {showCalendar && (
            <FlightSearch onSearch={handleSearch} />
          )}

          <button onClick={showDestinations}>
            {show ? "Click to close" : "Click to see destinations"}
          </button>

          {show && (
            <div className="place-cart-container">
              <Search chooseCity={chooseCity} />
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