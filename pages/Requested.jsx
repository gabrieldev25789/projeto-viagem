import { useLocation } from 'react-router-dom'
import "./Requested.css"

function Requested() {
  const { state } = useLocation()
  const { list = [] , total = 0 } = state || {}

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

const formatDate = (date) => {
  const [year, month, day] = date.split("-")
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  })
}

  const totalPriceHotel = list.reduce((acc, item) => acc + (item.priceHotel || 0), 0)
  const totalValueNight = list.reduce((acc, item) => acc + (item.valueNight || 0), 0)

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
                  USD {formatPrice(item.price + item.valueNight)}
                </span>
              </div>

              {item.hotelSelected ? (
                <div className='order-card-hotel'>
                      <span style={{fontSize: 14}}>{item.hotelSelected.icon}</span>
                      <span className='order-card-hotel__name'>{item.hotelSelected.name}</span>
                      <span className='order-card-hotel__stars'> · {item.hotelSelected.stars}</span>
                      <span className='order-card-hotel__price'>USD ${item.hotelSelected.price}</span>
                </div>
              ): <span style={{fontSize: 16, color: "#973232"}}>No hotel selected</span> }

              <div className="order-card__dates">
                <span>Departure: {formatDate(item.startDate)}</span>
                <span>Return: {formatDate(item.endDate)}</span>
              </div>

                <p className='total-price'>
                  <span style={{color: "#ffff"}}>Total:</span> USD {formatPrice(item.price + (item.priceHotel || 0) + item.valueNight)}
                </p>

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
          <span>USD {formatPrice(total + totalValueNight + totalPriceHotel)}</span>
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