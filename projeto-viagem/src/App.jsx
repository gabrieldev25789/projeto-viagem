import './App.css'
import { useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Main/Main'
import Places from "./pages/Places"

function App() {
const [cities, setCities] = useState([])
const [showText, setShowText] = useState("")

  function goCity(city) {
    setCities(prev => [...prev, city])
    setShowText(`i wanna go to ${city.nome} this gonna cost me R$ ${city.price}`)
  }

  return (
    <>
      <NavBar />
      <Main />
      <div id="places">
        <h1 className='places-title'>Choose your destiny wisely</h1>
      <Places goCity={goCity}/>
      { showText && <p>{showText}</p> }
      </div>
    </>
  )
}

export default App
