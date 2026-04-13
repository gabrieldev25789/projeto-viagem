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
    console.log("clicou")
    setList((prev) => {
      const exist = prev.find(item => item.id === id)
      if (exist) {
        return prev.map(item =>
          item.id === id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      }
      return [...prev, { id, name, price, img, amount: 1 }]
    })
  }

  function removeCity(id) {
    setList((prev) =>
      prev
        .map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item)
        .filter(item => item.amount > 0)
    )
  }

  function handleSearch({ startDate, endDate, nights }) {
    setDates({ startDate, endDate, nights })

    const payload = {
      checkIn: startDate.toISOString().split("T")[0],
      checkOut: endDate.toISOString().split("T")[0],
      nights,
    }

    console.log("Payload:", payload)
  }

  return (
    <Routes>
      <Route path="/" element={
        <>
          <NavBar />
          <Main />
          <FlightSearch onSearch={handleSearch} />

          <button onClick={showDestinations}>
            {show ? "Click to close" : "Click to see destinations"}
          </button>
          {show && (
            <div className="place-cart-container">
              <Search chooseCity={chooseCity} />
              <Cart list={list} removeCity={removeCity} finish={finish} />
            </div>
          )}
          {dates && (
         <p>
            {new Date(dates.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })} — {new Date(dates.endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })} · {dates.nights} nights
          </p>
          )}
        </>
      } />
      <Route path="/requested" element={<Requested />} />
    </Routes>
  )
}

export default App