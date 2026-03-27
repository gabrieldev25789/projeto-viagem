import './App.css'
import { useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Main/Main'
import Places from "./pages/Places"

function App() {
  const [showText, setShowText] = useState("")
  const [priceCity, setPriceCity] = useState([])

  function addCity(city) {
    console.log("addCity chamado:", city)
    setPriceCity(prev => [...prev, { nome: city.nome, price: city.price }])
  }

  function goCity(city) {
    setShowText(`I wanna go to ${city.nome}, this gonna cost me R$ ${city.price}`)
  }

  return (
    <>
      <NavBar />
      <Main />

      <div id="places">
        <h1 className='places-title'>Choose your destiny wisely</h1>

        <Places goCity={goCity} onAddCity={addCity} /> 

        {showText && <p>{showText}</p>}
      </div>

      {priceCity.length > 0 && (
        <ul>
          {priceCity.map(c => (
            <li key={c.nome}>{c.nome} - R$ {c.price}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
