import './App.css'
import { useState, useEffect } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Main/Main'
import Places from './Components/Places/Places'
import Cart from './Components/Cart/Cart'

function App() {
    const [show, setShow] = useState(false)
    const [lista, setLista] = useState([])

  function showDestinations(){
      setShow((prev)=> !prev)
  }

  function chooseCity(name, price){
      console.log(name, price)
      setLista((prev)=> [...prev, {name, price}])
  }

    useEffect(()=>{
      console.log(lista)
    }, [lista])

  return (
    <>
      <NavBar />
      <Main />
      <button onClick={() => showDestinations()}>{show ? "Click to close" : "Click to see destinations"}</button>
      {show && <Places  chooseCity={chooseCity}/>}
      {show && <Cart lista={lista}/> }
    </>
  )
}

export default App
