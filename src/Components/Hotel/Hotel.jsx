import "./Hotel.css"
import React, { useState } from 'react'

const hotels = [
    { id: 1, icon: "🏨", name: "Grand Palace", stars: "5 stars · Centro", price: "R$ 680" },
    { id: 2, icon: "🛏️", name: "Beira Mar Inn", stars: "4 stars · Praia",  price: "R$ 420" },
    { id: 3, icon: "🌿", name: "Pousada Serra",  stars: "3 stars · Bairro", price: "R$ 220" },
]

function Hotel({ onAdd, onSkip }){
    const [selected, setSelected] = useState(null)
  return (
          <div className="hotel-overlay">
      <div className="hotel-modal">
        <h2>Add a hotel to your trip?</h2>
        <p className="hotel-subtitle">Choose one of the options below or skip.</p>
        <div className="hotel-cards">
          {hotels.map(h => (
            <div
              key={h.id}
              className={`hotel-card ${selected === h.id ? "hotel-card--selected" : ""}`}
              onClick={() => setSelected(h.id)}
            >
              <span className="hotel-icon">{h.icon}</span>
              <p className="hotel-name">{h.name}</p>
              <p className="hotel-stars">{h.stars}</p>
              <p className="hotel-price">{h.price}<span>/noite</span></p>
            </div>
          ))}
        </div>

        <div className="hotel-actions">
          <button
            className="btn-add"
            disabled={!selected}
            onClick={() => selected && onAdd(hotels.find(h => h.id === selected))}
          >
            Add hotel
          </button>
          <button className="btn-skip" onClick={onSkip}>
            No, skip
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hotel