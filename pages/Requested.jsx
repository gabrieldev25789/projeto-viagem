import { useLocation } from 'react-router-dom'
import "./Requested.css"

function Requested() {
  const { state } = useLocation()
  const { list = [], total = 0 } = state || {}

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    })
return (
  <div className="order-page">

    {/* ── Esquerda: cards ── */}
    <div className="order-left">
      <h2 className="order-title">Order confirmed!</h2>

      <ul className="order-list">
        {list.map(item => (
          <li key={item.id} className="order-card">
            <img className="order-card__img" src={item.img} alt={item.name} />

            <div className="order-card__info">
              <h3 className="order-card__name">{item.name}</h3>

              <div className="order-card__details">
                <span>{item.nights} nights</span>
                <span>x {item.amount}</span>
                <span className="order-card__price">
                  {formatPrice(item.price * item.amount)}
                </span>
              </div>

              <div className="order-card__dates">
                <span>Departure: {formatDate(item.startDate)}</span>
                <span>Return: {formatDate(item.endDate)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* ── Direita: pagamento ── */}
    <div className="order-right">
      <h3 className="payment-title">Payment Method</h3>

      <div className="payment-form">
        <label className="payment-option">
          <input type="radio" name="payment" defaultChecked />
          <span>Credit Card</span>
        </label>

        <label className="payment-option">
          <input type="radio" name="payment" />
          <span>Debit Card</span>
        </label>

        <label className="payment-option">
          <input type="radio" name="payment" />
          <span>Pix</span>
        </label>

        <label className="payment-option">
          <input type="radio" name="payment" />
          <span>Boleto</span>
        </label>

        <div className="order-total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        <button type="button" className="payment-btn">
          Confirm Payment
        </button>
      </div>
    </div>
  </div>
)
}

export default Requested