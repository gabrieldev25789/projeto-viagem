import { useState } from 'react'
import "./Cart.css"

function Cart({ list = [], removeCity, finish, citySelected }) {
  const [show, setShow] = useState(false)

    const total = list.reduce(
      (acc, item) => acc + (Number(item.price) + Number(item.valueNight || 0)) + Number(item.priceHotel || 0) * (Number(item.amount) || 0), 0
    )

    const groupedList = list.reduce((acc, item) => {
      const existing = acc.find(i => i.id === item.id)
      if (existing) {
        existing.amount += 1
        existing.totalPrice += item.price + (item.valueNight || 0) + (item.priceHotel || 0)
      } else {
        acc.push({ ...item, amount: 1, totalPrice: item.price + (item.valueNight || 0) })
      }
      return acc
    }, [])

  return (
    <>
    <aside className={`cart-aside ${show ? 'open' : ''}`}>

      <button className='cart-btn' onClick={() => setShow(prev => !prev)}>
        🛒 {show ? 'Close Cart' : `View Cart (${list.length})`}
      </button>

      <div className='cart-container'>
        <div className='cart-header'>
          <p className='cart-header-label'>Cart</p>
          <button className='cart-close' onClick={() => setShow(false)}>✕</button>
        </div>

        <div className='cart-body'>
          <table className='cart-table'>
            <thead>
              <tr>
                <th className='cart-th'>City</th>
                <th className='cart-th'>Price</th>
                <th className='cart-th'></th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '1rem', color: '#aaa', fontSize: '0.85rem' }}>
                    No cities added yet.
                  </td>
                </tr>
              ) : (
                groupedList.map((item) => (
                  <tr className='cart-item' key={item.uniqueId}>
                    <td className='cart-name'>
                      {item.name} {item.amount > 1 && `(${item.amount})`}
                    </td>
                    <td className='cart-price'>
                      USD {((item.totalPrice ?? 0) + (item.priceHotel || 0)).toFixed(2)}
                    </td>
                    <td>
                      <button className='cart-remove-btn' onClick={() => removeCity(item.uniqueId)}>✕</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='cart-footer'>
          <p className='cart-total-label'>Total</p>
          <p className='cart-total-value'>USD {total.toFixed(2)}</p>
          {total > 0 && (
            <button className='cart-finish-btn' onClick={finish}>
              Finish
            </button>
          )}
        </div>
      </div>

    {citySelected && <h3>City selected: <span style={{color: "green"}}>{citySelected}</span></h3>} 
    </aside>
    </>
  )
}

export default Cart


