import { useLocation } from 'react-router-dom'
import "./Requested.css"

function Requested() {
  const { state } = useLocation()
  const { list = [], total = 0 } = state || {}

    const formatPrice = (value) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value)
    }

    const formatDate = (date) =>
      new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })

  return (
    <div>
      <h2>Order confirmed!!</h2>
      <ul>
        {list.map(item => (
      <div>

        <img style={{width: "200px"}} src={item.img} alt="city image" />
          <li key={item.id}>
            {item.name} x {item.amount} — USD {formatPrice(item.price * item.amount)}
          </li>
          <li>Departure: {formatDate(item.startDate)}</li>
          <li>Return: {formatDate(item.endDate)}</li>
          <li>{item.nights} nights</li>
        </div>
        ))}
      </ul>
      <h3>Total: USD {formatPrice(total.toFixed(2))}</h3>
    </div>
  )
}

export default Requested