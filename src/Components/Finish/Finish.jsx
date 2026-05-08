import { useEffect, useRef } from "react"
import "./Finish.css"

function Finish({ isOpen, onClose, payementMethod, totalValue }) {
  const canvasRef = useRef(null)
  const orderNumber = useRef(Math.floor(1000 + Math.random() * 9000))

  const labels = {
    credit: "Credit Card",
    debit: "Debit Card",
    pix: "Pix",
    bill: "Bill",
  }

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  // ── Animação: estrelas/partículas voando como trajeto de voo ──
  useEffect(() => {
    if (!isOpen) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Estrelas de fundo fixas
    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.5 + Math.random() * 1.2,
      alpha: 0.2 + Math.random() * 0.6,
      twinkleSpeed: 0.01 + Math.random() * 0.02,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    // Partículas que saem como rastro de avião
    const trails = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: canvas.height * 0.3 + Math.random() * canvas.height * 0.5,
      len: 15 + Math.random() * 40,
      speed: 0.8 + Math.random() * 1.4,
      alpha: 0.3 + Math.random() * 0.5,
      delay: i * 8,
      done: false,
    }))

    let frame = 0, raf

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Desenha estrelas com twinkle
      stars.forEach((s) => {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(frame * s.twinkleSpeed + s.twinkleOffset))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${a})`
        ctx.fill()
      })

      // Desenha rastros de voo
      trails.forEach((t) => {
        if (frame < t.delay) return
        t.x += t.speed
        if (t.x > canvas.width + t.len) {
          t.x = -t.len
          t.y = canvas.height * 0.2 + Math.random() * canvas.height * 0.6
        }
        const grad = ctx.createLinearGradient(t.x - t.len, t.y, t.x, t.y)
        grad.addColorStop(0, `rgba(200,230,255,0)`)
        grad.addColorStop(1, `rgba(200,230,255,${t.alpha})`)
        ctx.beginPath()
        ctx.moveTo(t.x - t.len, t.y)
        ctx.lineTo(t.x, t.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.stroke()

        // Pequeno ponto brilhante na ponta
        ctx.beginPath()
        ctx.arc(t.x, t.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${t.alpha})`
        ctx.fill()
      })

      frame++
      raf = requestAnimationFrame(draw)
    }

    const timer = setTimeout(draw, 200)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="finish-overlay">
      {/* Orbs de fundo */}
      <div className="finish-orb finish-orb--1" />
      <div className="finish-orb finish-orb--2" />

      <div className="finish-modal">
        {/* Canvas com animação de voo */}
        <canvas ref={canvasRef} className="finish-canvas" />

        {/* Tag de status */}
        <div className="finish-tag">
          <span className="finish-dot" />
          booking confirmed
        </div>

        {/* Ícone de avião animado */}
        <div className="finish-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="finish-plane"
              d="M6 24L20 14L18 8L22 10L26 20L38 16L42 20L30 26L32 40L28 38L24 28L10 32L6 24Z"
              fill="#a8f5c8"
              stroke="#a8f5c8"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Título e subtítulo com tema de viagem */}
        <h1 className="finish-title">Your trip is<br />booked! ✈️</h1>
        <p className="finish-sub">
          Pack your bags — adventure awaits.<br />
          Your itinerary details have been sent to your email.
        </p>

        <div className="finish-divider" />

        {/* Cards de info do pedido */}
        <div className="finish-meta">
          <div className="finish-meta-card">
            <span className="finish-meta-label">Booking</span>
            <span className="finish-meta-val">#{orderNumber.current}</span>
          </div>
          <div className="finish-meta-card">
            <span className="finish-meta-label">Total paid</span>
            <span className="finish-meta-val">{formatPrice(totalValue)}</span>
          </div>
          <div className="finish-meta-card">
            <span className="finish-meta-label">Payment</span>
            <span className="finish-meta-val">{labels[payementMethod] ?? "—"}</span>
          </div>
        </div>

        {/* Rodapé de destino aleatório decorativo */}
        <div className="finish-route">
          <span className="finish-route__city">Your city</span>
          <span className="finish-route__line">
            <span className="finish-route__dot" />
            <span className="finish-route__track" />
            <svg className="finish-route__plane" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10l6-4-1-3 2 1 2 5 6-2 2 2-5 3 1 7-2-1-2-5-7 3-2-3z"/>
            </svg>
            <span className="finish-route__track" />
            <span className="finish-route__dot" />
          </span>
          <span className="finish-route__city">Destination</span>
        </div>

        {/* Ações */}
        <div className="finish-actions">
          <button className="finish-btn-primary" onClick={onClose}>Explore more trips</button>
          <button className="finish-btn-secondary">View itinerary</button>
        </div>
      </div>
    </div>
  )
}

export default Finish