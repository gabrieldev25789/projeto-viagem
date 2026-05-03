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
import OrderValue from './Components/OrderValue/OrderValue'
import Hotel from './Components/Hotel/Hotel'

function App() {
  const [show, setShow] = useState(false)
  const [list, setList] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [pendingCity, setPendingCity] = useState(null) 

  const [message, setMessage] = useState({ text: "", type: "add", isOpen: false });

  const [filteredPlaces, setFilteredPlaces] = useState(places)

  const [selectCity, setSelectCity] = useState(null)

  const [cityValue, setCityValue] = useState("")
  const [citySearch, setCitySearch] = useState("")

  const [sortValue, setSortValue] = useState("")

  const [hide, setHide] = useState(false)

  function resetValue() {
    setSortType("")
    setSortValue("")
  }

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
    if(show){
      setSelectCity(null)
    }
  }

  const [showCitySelected, setShowCitySelected] = useState(false)
  const [citySelected, setCitySelected] = useState("")

function chooseCity(id, name, price, img) {
  if (selectCity === id) {
    setSelectCity(null)
    setShowCalendar(false)
    setPendingCity(null)
  } else {
    setPendingCity({ id, name, price, img })
    setShowCalendar(true)
    setSelectCity(id)
  }

  setShowCitySelected(true)
  setCitySelected(name)
}

const [hideHotel, setHideHotel] = useState(false)
const [showHotel, setShowHotel] = useState(true)

function cityAdd() {
  setMessage({ text: "City added successfully", type: "add", isOpen: true });
  setShowHotel(true)
  setHideHotel(true)
  setShowCitySelected(false)
  setSelectCity(null)
}

function error() {
  setMessage({ text: "You can only stay for 30 nights", type: "erro", isOpen: true });
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
  if (!message.isOpen) return;
  const timer = setTimeout(() => setMessage((prev) => ({ ...prev, isOpen: false })), 2000);
  return () => clearTimeout(timer);
}, [message.isOpen]);


  const cities = places.flatMap(place => place.cities)
  let sorted = [...cities]

 const [sortType, setSortType] = useState("")

 const sortedCities = sortType
  ? [...cities].sort((a, b) =>
      sortType === "asc" ? a.price - b.price : b.price - a.price
    )
  : null 

  function handleSort(type){
    setSortType(type)
    if(type === "asc"){
    sorted.sort((a, b) => a.price - b.price)
    }
    
    if(type === "desc"){
    sorted.sort((a, b) => b.price - a.price)
    }
  }

const [continentValue, setContinentValue] = useState("")
const [countryValue, setCountryValue] = useState("")

const [removeClass, setRemoveClass] = useState(false)

function reset() {
  setCityValue("")
  setCountryValue("")
  setContinentValue("")
  setCitySearch("")
  setFilteredPlaces(places)
  setSortType("")
  setSortValue("")
}

function onSkip(){
  setHideHotel(false)
}

  return (
    <Routes>
      <Route path="/" element={
        <>
          <NavBar />
          <Main />
          {message && (
            <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
            </div>
          )}
          {showCalendar && (
            <FlightSearch onSearch={handleSearch} setSelectCity={setSelectCity}/>
          )}

          <button className={`dest-btn ${show ? "open" : ""}`} onClick={showDestinations}>
            <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
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
          hideHotel={hideHotel}
          showHotel={showHotel}
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
            
          {!hideHotel &&  <Cart list={list} removeCity={removeCity} finish={finish} citySelected={citySelected} showCitySelected={showCitySelected}/>}
          </div>
          )}
        </>
      } />
      <Route path="/requested" element={<Requested /> } />
    </Routes>
  )
}

export default App