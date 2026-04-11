import React, { useState } from 'react'

function Cart({ lista }) {

    const [show, setShow] = useState(false)

 

    function showCart(){
       setShow((prev)=> !prev)
        console.log(lista)
    }

  return (
    <div>
    <button onClick={() => showCart()}>{show ? "Click to close" : "Click to see cart"}</button> 
      {show && lista.map((item) => (
        <div key={item.name}>
          <h4>{item.name}</h4>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  )
}
export default Cart 
