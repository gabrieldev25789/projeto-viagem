import { useState } from 'react'
import "./Cart.css"

// ─────────────────────────────────────────────
// COMPONENT: Cart
// Carrinho lateral com lista de cidades, total e botão de finalizar
// Props: list, removeCity, finish, citySelected
// ─────────────────────────────────────────────
function Cart({ list = [], removeCity, finish, citySelected }) {

  // ── State: controla se o carrinho está aberto ──
  const [show, setShow] = useState(false)

  // ─────────────────────────────────────────────
  // HELPER: Formata valor em USD com símbolo e milhar
  // ─────────────────────────────────────────────
  const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  // ── Soma o total de todos os itens do carrinho ──
  const total = list.reduce(
    (acc, item) => acc + (Number(item.price) + Number(item.valueNight || 0) + Number(item.priceHotel || 0)) * (Number(item.amount) || 1), 0
  )

  // ── Agrupa itens duplicados somando amount e totalPrice ──
  const groupedList = list.reduce((acc, item) => {
    const existing = acc.find(i => i.id === item.id)
    if (existing) {
      existing.amount += 1
      existing.totalPrice += item.price + (item.valueNight || 0) + (item.priceHotel || 0)
    } else {
      acc.push({ ...item, amount: 1, totalPrice: item.price + (item.valueNight || 0) + (item.priceHotel || 0) })
    }
    return acc
  }, [])

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <>
      {/* ── Badge do destino selecionado ── */}
      {citySelected && (
        <div className="city-badge">
          <div className="city-badge__top">
            <span className="city-badge__dot" />
            <span className="city-badge__label">Destination:</span>
          </div>
          <span className="city-badge__value">{citySelected}</span>
        </div>
      )}

      {/* ── Sidebar do carrinho (abre/fecha com classe open) ── */}
      <aside className={`cart-aside ${show ? 'open' : ''}`}>

        {/* Botão flutuante para abrir/fechar */}
        <button className='cart-btn' onClick={() => setShow(prev => !prev)}>
          🛒 {show ? 'Close Cart' : `View Cart (${list.length})`}
        </button>

        <div className='cart-container'>

          {/* ── Header: título + botão fechar ── */}
          <div className='cart-header'>
            <p className='cart-header-label'>Cart</p>
            <button className='cart-close' onClick={() => setShow(false)}>✕</button>
          </div>

          {/* ── Body: tabela de itens ── */}
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
                {/* Estado vazio */}
                {list.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '1rem', color: '#aaa', fontSize: '0.85rem' }}>
                      No cities added yet.
                    </td>
                  </tr>
                ) : (
                  /* Lista de itens agrupados */
                  groupedList.map((item) => (
                    <tr className='cart-item' key={item.uniqueId}>
                      {/* Nome da cidade + quantidade se > 1 */}
                      <td className='cart-name'>
                        {item.name} {item.amount > 1 && `(${item.amount})`}
                      </td>
                      {/* Preço total do item */}
                      <td className='cart-price'>
                        USD {formatPrice(item.totalPrice ?? 0)}
                      </td>
                      {/* Botão remover */}
                      <td>
                        <button className='cart-remove-btn' onClick={() => removeCity(item.uniqueId)}>✕</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Footer: total + botão finalizar ── */}
          <div className='cart-footer'>
            <p className='cart-total-label'>Total</p>
            <p className='cart-total-value'>USD {formatPrice(total)}</p>
            {/* Botão só aparece se houver itens */}
            {total > 0 && (
              <button className='cart-finish-btn' onClick={finish}>
                Finish
              </button>
            )}
          </div>

        </div>
      </aside>
    </>
  )
}

export default Cart


