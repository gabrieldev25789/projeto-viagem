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
import Message from './Components/Message/Message'

function App() {
  const [show, setShow] = useState(false)
  const [list, setList] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [pendingCity, setPendingCity] = useState(null) 

  const [message, setMessage] = useState("")

  const [filteredPlaces, setFilteredPlaces] = useState(places)

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

function cityAdd() {
  setMessage({ text: `City added successfully`, type: "add"});
}

function error() {
  setMessage({ text: "You can only stay for 30 nights", type: "erro" });
}

  function handleSearch({ startDate, endDate, nights }) {
    if (!pendingCity) return

    if (nights > 30) {
      error()
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
      
    console.log(newItem)
    cityAdd()
  }

  function removeCity(id) {
    setList((prev) =>
      prev
        .map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item)
        .filter(item => item.amount > 0)
    )
  }

  useEffect(() => {
  if (!message) return;
  const timer = setTimeout(() => setMessage(null), 2000);
  return () => clearTimeout(timer);
}, [message]);

  const [selectCity, setSelectCity] = useState(null)

  return (
    <Routes>
      <Route path="/" element={
        <>
          <NavBar />
          <Main />
          {message && (
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
              <Message message={message.text} type={message.type} />
            </div>
          )}
          {showCalendar && (
            <FlightSearch onSearch={handleSearch} setSelectCity={setSelectCity}/>
          )}

          <button onClick={showDestinations}>
            {show ? "Click to close" : "Click to see destinations"}
          </button>

          {show && (
        <div className="place-cart-container">
          <div className="search-places-wrapper"> 
              <Search 
                chooseCity={chooseCity} 
                selectCity={selectCity}
                setSelectCity={setSelectCity}
                onFilter={setFilteredPlaces}/>

              <Places 
                placesData={filteredPlaces} 
                chooseCity={chooseCity}
                selectCity={selectCity}
                setSelectCity={setSelectCity}/>
            </div> 
            
            <Cart list={list} removeCity={removeCity} finish={finish}/>
          </div>
          )}
        </>
      } />
      <Route path="/requested" element={<Requested /> } />
    </Routes>
  )
}

export default App