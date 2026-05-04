import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Main/Main'
import Cart from './Components/Cart/Cart'
import Search from './Components/Search/Search'
import Requested from '../pages/Requested'
import FlightSearch from './Components/FlightSearch/FlightSearch'
import { places } from './Components/data/places'
import Places from './Components/Places/Places'
import Message from './Components/Message/Message'
import OrderValue from './Components/OrderValue/OrderValue'
import Hotel from './Components/Hotel/Hotel'

function App() {
  const [show, setShow] = useState(false)
  const [list, setList] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [pendingCity, setPendingCity] = useState(null)
  const [message, setMessage] = useState({ text: "", type: "add", isOpen: false })
  const [filteredPlaces, setFilteredPlaces] = useState(places)
  const [selectCity, setSelectCity] = useState(null)
  const [cityValue, setCityValue] = useState("")
  const [citySearch, setCitySearch] = useState("")
  const [sortValue, setSortValue] = useState("")
  const [hide, setHide] = useState(false)
  const [showCitySelected, setShowCitySelected] = useState(false)
  const [citySelected, setCitySelected] = useState("")
  const [selected, setSelected] = useState(null)
  const [hideHotel, setHideHotel] = useState(false)
  const [showHotel, setShowHotel] = useState(true)
  const [sortType, setSortType] = useState("")
  const [continentValue, setContinentValue] = useState("")
  const [countryValue, setCountryValue] = useState("")
  const [removeClass, setRemoveClass] = useState(false)

  const pendingSearchRef = useRef(null)

  const navigate = useNavigate()

  const hotels = [
    { id: 1, icon: "🏨", name: "Grand Palace", stars: "5 stars · Centro", price: "R$ 680" },
    { id: 2, icon: "🛏️", name: "Beira Mar Inn", stars: "4 stars · Praia", price: "R$ 420" },
    { id: 3, icon: "🌿", name: "Pousada Serra", stars: "3 stars · Bairro", price: "R$ 220" },
  ]

  const total = list.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.amount) || 0),
    0
  )

  function finish() {
    navigate('/requested', { state: { list, total } })
  }

  function resetValue() {
    setSortType("")
    setSortValue("")
  }

  function showDestinations() {
    setShowCalendar(false)
    setShow((prev) => !prev)
    if (show) setSelectCity(null)
  }

  function chooseCity(id, name, price, img) {
    if (selectCity === id) {
      setSelectCity(null)
      setShowCalendar(false)
      setPendingCity(null)
      setCitySelected("")
    } else {
      setPendingCity({ id, name, price, img })
      setShowCalendar(true)
      setSelectCity(id)
      setCitySelected(name)
    }
  }

  function handleSearch({ startDate, endDate, nights }) {
    if (!pendingCity) return
    if (nights > 30) { error(); return }

    const toISODate = (date) => new Date(date).toISOString().split("T")[0]

    pendingSearchRef.current = {
      ...pendingCity,
      amount: 1,
      startDate: toISODate(startDate),
      endDate: toISODate(endDate),
      nights,
    }

    setPendingCity(null)
    setShowCalendar(false)

    setShowHotel(true)  
    setHideHotel(true)  
}

function addHotel() {
  if (!pendingSearchRef.current) return

  const foundHotel = hotels.find(h => h.id === selected) ?? null
  const newItem = {
    ...pendingSearchRef.current,
    uniqueId: `${pendingSearchRef.current.id}_${crypto.randomUUID()}`,
    hotelSelected: foundHotel
  }

  setList((prev) => [...prev, newItem]) 
  pendingSearchRef.current = null
  cityAdd()
}

function onSkip() {
  if (!pendingSearchRef.current) return

  const newItem = {
    ...pendingSearchRef.current,
    uniqueId: `${pendingSearchRef.current.id}_${crypto.randomUUID()}`, 
    hotelSelected: null
  }

  setList((prev) => [...prev, newItem]) 

  pendingSearchRef.current = null
  setCitySelected("")
  setHideHotel(false)
  cityAdd()
}

function cityAdd() {
  setMessage({ text: "City added successfully", type: "add", isOpen: true })
  setShowHotel(false) 
  setHideHotel(false)
  setShowCitySelected(false)
  setSelectCity(null)
  setSelected(null) 
}

function error() {
  setMessage({ text: "You can only stay for 30 nights", type: "erro", isOpen: true })
}


function removeCity(uniqueId) {
  setList((prev) => prev.filter(item => item.uniqueId !== uniqueId))
}

  function reset() {
    setCityValue("")
    setCountryValue("")
    setContinentValue("")
    setCitySearch("")
    setFilteredPlaces(places)
    setSortType("")
    setSortValue("")
  }

  const cities = places.flatMap(place => place.cities)
  let sorted = [...cities]

  const sortedCities = sortType
    ? [...cities].sort((a, b) =>
        sortType === "asc" ? a.price - b.price : b.price - a.price
      )
    : null

  function handleSort(type) {
    setSortType(type)
    if (type === "asc") sorted.sort((a, b) => a.price - b.price)
    if (type === "desc") sorted.sort((a, b) => b.price - a.price)
  }

  useEffect(() => {
    if (!message.isOpen) return
    const timer = setTimeout(() => setMessage((prev) => ({ ...prev, isOpen: false })), 2000)
    return () => clearTimeout(timer)
  }, [message.isOpen])

  return (
    <Routes>
      <Route path="/" element={
        <>
          <NavBar />
          <Main />

          {showCalendar && (
            <FlightSearch onSearch={handleSearch} setSelectCity={setSelectCity} />
          )}

          <button className={`dest-btn ${show ? "open" : ""}`} onClick={showDestinations}>
            <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{show ? "Click to close" : "Click to see destinations"}</span>
          </button>

          {show && (
            <div className="place-cart-container">
              <div className="search-places-wrapper">
                {!showCalendar &&
                  <Search
                    chooseCity={chooseCity}
                    selectCity={selectCity}
                    setSelectCity={setSelectCity}
                    onFilter={setFilteredPlaces}
                    setCityValue={setCityValue}
                    cityValue={cityValue}
                    setCitySearch={setCitySearch}
                    setSortType={setSortType}
                    resetValue={resetValue}
                    countryValue={countryValue}
                    setCountryValue={setCountryValue}
                    continentValue={continentValue}
                    setContinentValue={setContinentValue}
                    setRemoveClass={setRemoveClass}
                  />
                }

                <Hotel
                  onSkip={onSkip}
                  onAdd={addHotel}
                  hideHotel={hideHotel}
                  showHotel={showHotel}
                  selected={selected}
                  setSelected={setSelected}
                  hotels={hotels}
                />

                {!showCalendar &&
                  <OrderValue
                    handleSort={(type) => handleSort(type)}
                    sorted={sorted}
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                    reset={reset}
                    setRemoveClass={setRemoveClass}
                    hide={hide}
                  />
                }

                <Places
                  placesData={filteredPlaces}
                  chooseCity={chooseCity}
                  selectCity={selectCity}
                  setSelectCity={setSelectCity}
                  cityValue={cityValue}
                  citySearch={citySearch}
                  sortedCities={sortedCities}
                  removeCLass={removeClass}
                  countryValue={countryValue}
                  continentValue={continentValue}
                  setHide={setHide}
                  setMessage={setMessage}
                />
              </div>

              <Message
                isOpen={message.isOpen}
                type={message.type}
                message={message.text}
                onClose={() => setMessage((prev) => ({ ...prev, isOpen: false }))}
              />

              {!hideHotel && (
                <Cart
                  list={list}
                  removeCity={removeCity}
                  finish={finish}
                  citySelected={citySelected}
                  showCitySelected={showCitySelected}
                />
              )}
            </div>
          )}
        </>
      } />
      <Route path="/requested" element={<Requested />} />
    </Routes>
  )
}

export default App