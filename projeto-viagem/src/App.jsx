import './App.css'
import { useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Main/Main'
import Places from "./pages/Places"

function App() {
  const [priceCity, setPriceCity] = useState([])
  const [totalPrice, setTotalPrice]= useState("")

function addCity(city) {
  priceCity.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })

  setPriceCity(prev => {
    const newList = [...prev, { nome: city.nome, price: city.price }]

    const total = newList.reduce((acc, item) => acc + item.price, 0)
    setTotalPrice(total)

    return newList
  })

}

  return (
    <>
      <NavBar />
      <Main />

      <div id="places">
        <h1 className='places-title'>Choose your destiny wisely</h1>

        <Places onAddCity={addCity} /> 

       
      </div>

      {priceCity.length > 0 && (
        <ul>
        <h2>{totalPrice}</h2>
            {priceCity.map(c => (
            <li key={c.nome}>{c.nome} - USD {c.price}</li>
          ))}
      
        </ul>
      )}
    </>
  )
}

export default App
