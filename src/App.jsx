import './App.css'
import { useState} from 'react'
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

  function chooseCity(id, name, price){

    setLista((prev)=>{
      const exist = prev.find(item => item.id === id)

      if(exist){
        return prev.map(item => 
          item.id === id 
          ? {...item, amount: item.amount + 1} 
          : item 
        )
      }

      return [...prev, {id, name, price, amount: 1 }]
    })
  }

function removeCity(id){
  setLista((prev) =>
    prev
      .map(item => {
        if(item.id === id){
          return { ...item, amount: item.amount - 1 }
        }
        return item
      })
      .filter(item => item.amount > 0)
  )
}

  return (
    <>
      <NavBar />
      <Main />
      <button onClick={() => showDestinations()}>{show ? "Click to close" : "Click to see destinations"}</button>
    
    <div className='place-cart-container'>
        {show && <Places chooseCity={chooseCity} />}
        
        {show && (
        <aside>
            <Cart lista={lista} removeCity={removeCity} />
        </aside>
        )}
    </div>

    </>
  )
}

export default App
