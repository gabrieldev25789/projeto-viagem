import { useLocation } from 'react-router-dom'
import "./Requested.css"

function Requested() {
  const { state } = useLocation()
  const { list = [], total = 0 } = state || {}

  return (
    <div>
      <h2>Order confirmed!!</h2>
      <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.name} x {item.amount} — USD {(item.price * item.amount).toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total: USD {total.toFixed(2)}</h3>
    </div>
  )
}

export default Requested