import { useState } from 'react'
import "./Cart.css"

function Cart({ lista = [], removeCity }) {
  const [show, setShow] = useState(false)

const total = lista.reduce(
  (acc, item) => acc + (Number(item.price) || 0) * (Number(item.amount) || 0),
  0
)

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
          <table className='cart-table'>

              <colgroup>
                  <col />
                  <col />
                  <col />
              </colgroup>

             <thead>
                <tr>
                  <th className='cart-th'>City</th>
                  <th className='cart-th'>Price</th>
                </tr>
              </thead>

            <tbody>
              {lista.map((item) => (
              <tr className='cart-item' key={item.id}>
                
                <td className='cart-name'>
                    {item.name} {item.amount > 1 && `(${item.amount})`}
                </td>

                <td className='cart-price'>USD {item.price.toFixed(2)}</td>
                <td>
                  <button className='cart-btn' onClick={() => removeCity(item.id)}>Remove</button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          </div>

          <div className='cart-footer'>
            <p className='cart-total-label'>Total</p>
            <p className='cart-total-value'>USD {(total).toFixed(2)}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart 
