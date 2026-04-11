import React, { useState } from 'react'
import "./Cart.css"

function Cart({ lista = [] }) {
  const [show, setShow] = useState(false)

  const total = lista.reduce((acc, item) => acc + item.price, 0)

  return (
    <>
      <button className='cart-btn' onClick={() => setShow((prev) => !prev)}>
        {show ? "Close cart" : "View cart"}
      </button>

      {show && (
        <div className='cart-container'>
          <div className='cart-header'>
            <p className='cart-header-label'>Cart</p>
          </div>

          <div className='cart-body'>
            {lista.map((item) => (
              <div className='cart-item' key={item.name}>
                <h4 className='cart-name'>{item.name}</h4>
                <p className='cart-price'>USD {(item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className='cart-footer'>
            <p className='cart-total-label'>Total</p>
            <p className='cart-total-value'>USD {total}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart 
