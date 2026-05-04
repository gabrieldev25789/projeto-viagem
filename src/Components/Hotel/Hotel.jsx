import "./Hotel.css"

function Hotel({ onAdd, onSkip, hideHotel, showHotel, selected, setSelected, hotels }){
    
if(showHotel){
  return (
    <div className={hideHotel ? "hotel-overlay" : "hotel-overlay hide"}>
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
          onClick={() => onAdd()}
        >
          Add hotel
        </button>
        <button className="btn-skip" onClick={() => {onSkip()}}>
            Skip
        </button>
        </div>
      </div>
    </div>
  )
}
}

export default Hotel