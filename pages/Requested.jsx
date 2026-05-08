import { useState } from "react"
import Finish from "../src/Components/Finish/Finish"
import { useNavigate } from 'react-router-dom'
import "./Requested.css"

// ─────────────────────────────────────────────
// COMPONENT: Requested
// Página de confirmação do pedido e pagamento
// Props: list, setList, total, totalPriceHotel, totalValueNight
// ─────────────────────────────────────────────
function Requested({ list, setList, total, totalPriceHotel, totalValueNight }) {

  const navigate = useNavigate()

  // ── States: Pagamento ─────────────────────
  const [discountRate, setDiscountRate] = useState(0)
  const [payementMethod, setPayementMethod] = useState("credit")

  // ── States: Modal de conclusão ────────────
  const [showFinish, setShowFinish] = useState(false)
  const [finalTotal, setFinalTotal] = useState(0)

  // ── Cálculo do total base ─────────────────
  const totalBase = total + totalValueNight + totalPriceHotel

  // ─────────────────────────────────────────────
  // HELPERS: Formatação
  // ─────────────────────────────────────────────
  const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  const formatDate = (date) => {
    const [year, month, day] = date.split("-")
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    })
  }

  // ─────────────────────────────────────────────
  // HANDLER: Remover hotel de um item do pedido
  // ─────────────────────────────────────────────
  const removeHotelFromOrder = (uniqueId) => {
    setList(prev => prev.map(item =>
      item.uniqueId === uniqueId ? { ...item, hotelSelected: null, priceHotel: 0 } : item
    ))
  }

  // ─────────────────────────────────────────────
  // HANDLER: Selecionar método de pagamento
  // Atualiza desconto de acordo com o método escolhido
  // ─────────────────────────────────────────────
  function payement(value) {
    setPayementMethod(value)

    const discounts = {
      pix: 0.10,
      debit: 0.03,
      bill: 0.02,
      credit: 0,
    }
    setDiscountRate(discounts[value] ?? 0)
  }

  // ── Cálculo do total com desconto ─────────
  const discount = totalBase * discountRate
  const totalValue = totalBase - discount

  // ─────────────────────────────────────────────
  // HANDLER: Confirmar pagamento
  // Salva o total final, exibe o modal Finish e limpa o carrinho
  // ─────────────────────────────────────────────
  function handlePayement() {
    setFinalTotal(totalValue)
    setShowFinish(true)
    setList([])
  }

  // ─────────────────────────────────────────────
  // HANDLER: Fechar modal e resetar estado
  // ─────────────────────────────────────────────
  function handleClose() {
    setShowFinish(false)
    setList([])
    setDiscountRate(0)
    setPayementMethod("credit")
    setFinalTotal(0)
    navigate("/")
  }

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <>
      <div className="order-page">

        {/* ── LEFT PANEL: Lista de itens do pedido ── */}
        <div className="order-left">
          <h2 className="order-title">Order confirmed!</h2>

          <ul className="order-list">
            {list.map(item => (
              <li key={item.id} className="order-card">

                {/* Imagem do destino */}
                <img className="order-card__img" src={item.img} alt={item.name} />

                <div className="order-card__info">

                  {/* Nome e detalhes do destino */}
                  <h3 className="order-card__name">{item.name}</h3>

                  <div className="order-card__details">
                    <span>{item.nights} nights</span>
                    <span>x {item.amount}</span>
                    <span className="order-card__price">
                      USD {formatPrice(item.price + item.valueNight)}
                    </span>
                  </div>

                  {/* Hotel selecionado ou aviso de ausência */}
                  {item.hotelSelected ? (
                    <div className='order-card-hotel'>
                      <span style={{fontSize: 14}}>{item.hotelSelected.icon}</span>
                      <span className='order-card-hotel__name'>{item.hotelSelected.name}</span>
                      <span className='order-card-hotel__stars'> · {item.hotelSelected.stars}</span>
                      <span className='order-card-hotel__price'>USD ${item.hotelSelected.price}</span>
                      <button className="remove-hotel-btn" onClick={() => removeHotelFromOrder(item.uniqueId)}>X</button>
                    </div>
                  ) : (
                    <span style={{fontSize: 16, color: "#973232"}}>No hotel selected</span>
                  )}

                  {/* Datas de ida e volta */}
                  <div className="order-card__dates">
                    <span>Departure: {formatDate(item.startDate)}</span>
                    <span>Return: {formatDate(item.endDate)}</span>
                  </div>

                  {/* Subtotal do item */}
                  <p className='total-price'>
                    <span style={{color: "#ffff"}}>Total:</span> USD {item.hotelSelected
                      ? formatPrice(item.price + (item.priceHotel || 0) + item.valueNight)
                      : formatPrice(item.price + item.valueNight)
                    }
                  </p>

                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── RIGHT PANEL: Pagamento + Rodapé ── */}
        <div className="order-right-wrapper">

          {/* Métodos de pagamento */}
          <div className="order-right">
            <h3 className="payment-title">Payment Method</h3>

            <div className="payment-form">

              <label className="payment-option">
                <input type="radio" name="payment" defaultChecked onChange={() => payement("credit")} />
                <span>Credit Card</span>
              </label>

              <label className="payment-option">
                <input type="radio" name="payment" onChange={() => payement("debit")} />
                <span>Debit Card</span>
              </label>

              <label className="payment-option">
                <input type="radio" name="payment" onChange={() => payement("pix")} />
                <span>Pix</span>
              </label>

              <label className="payment-option">
                <input type="radio" name="payment" onChange={() => payement("bill")} />
                <span>Bill</span>
              </label>

              {/* Total com desconto aplicado */}
              <div className="order-total">
                <span>Total</span>
                <span>USD {formatPrice(totalValue)}</span>
              </div>

              {/* Botão de confirmação */}
              <button type="button" className="payment-btn" onClick={() => {handlePayement()}}>
                Confirm Payment
              </button>

            </div>
          </div>

          {/* ── FOOTER: Agradecimento e contato ── */}
          <div className="order-thanks">
            <div className="order-thanks__divider" />
            <p className="order-thanks__title">Thank you for choosing us! 🌍</p>
            <p className="order-thanks__text">
              Your adventure is in good hands. We're committed to making every trip unforgettable.
            </p>
            <div className="order-thanks__links">
              <span>📧 support@GrizzyFlyes.com</span>
              <span>📞 +1 (800) 123-4567</span>
            </div>
            <p className="order-thanks__copy">© 2026 TravelApp · All rights reserved</p>
          </div>

        </div>
      </div>

      {/* ── MODAL: Confirmação de conclusão do pedido ── */}
      <Finish
        isOpen={showFinish}
        payementMethod={payementMethod}
        totalValue={finalTotal}
        onClose={() => {handleClose()}}
      />
    </>
  )
}

export default Requested