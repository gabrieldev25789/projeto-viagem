import { useEffect, useRef, useMemo } from "react"
import "./Finish.css"

function Finish({ isOpen, onClose, payementMethod, totalValue }) {
  const canvasRef = useRef(null)

  const orderNumber = useMemo(() => Math.floor(1000 + Math.random() * 9000), [isOpen])

  const labels = {
    credit: "Credit Card",
    debit: "Debit Card",
    pix: "Pix",
    bill: "Bill",
  }

  const formatPrice = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  useEffect(() => {
    if (!isOpen) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const colors = ["#a8f5c8", "#FAC775", "#85B7EB", "#ED93B1", "#9FE1CB", "#AFA9EC"]
    const pieces = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 60,
      w: 5 + Math.random() * 6, h: 3 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vx: (Math.random() - 0.5) * 1.5, vy: 1.5 + Math.random() * 2.5,
      vr: (Math.random() - 0.5) * 6, life: 1,
    }))
    let frame = 0, raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr
        if (frame > 50) p.life -= 0.015
        ctx.save(); ctx.globalAlpha = Math.max(0, p.life)
        ctx.translate(p.x, p.y); ctx.rotate((p.rot * Math.PI) / 180)
        ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })
      frame++
      if (pieces.some((p) => p.life > 0)) raf = requestAnimationFrame(draw)
    }
    const timer = setTimeout(draw, 400)
    return () => { clearTimeout(timer); cancelAnimationFrame(raf) }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="finish-overlay">
      <div className="finish-orb finish-orb--1" />
      <div className="finish-orb finish-orb--2" />

      <div className="finish-modal">
        <canvas ref={canvasRef} className="finish-canvas" />

        <div className="finish-tag">
          <span className="finish-dot" />
          order confirmed
        </div>

        <div className="finish-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#a8f5c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path className="finish-check" d="M4 13l5 5L20 7" />
          </svg>
        </div>

        <h1 className="finish-title">Thank you for<br />your order!</h1>
        <p className="finish-sub">
          Your purchase was completed successfully.<br />
          A confirmation email is on its way to you.
        </p>

        <div className="finish-divider" />

        <div className="finish-meta">
          <div className="finish-meta-card">
            <span className="finish-meta-label">Order</span>
            <span className="finish-meta-val">#{orderNumber}</span>
          </div>
          <div className="finish-meta-card">
            <span className="finish-meta-label">Total</span>
            <span className="finish-meta-val">{formatPrice(totalValue)}</span>
          </div>
          <div className="finish-meta-card">
            <span className="finish-meta-label">Payment</span>
            <span className="finish-meta-val">{labels[payementMethod] ?? "—"}</span>
          </div>
        </div>

        <div className="finish-actions">
          <button className="finish-btn-primary" onClick={onClose}>Continue shopping</button>
          <button className="finish-btn-secondary">Track order</button>
        </div>
      </div>
    </div>
  )
}

export default Finish