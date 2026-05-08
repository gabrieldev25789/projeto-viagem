import "./Hotel.css"

// Modal de seleção de hotel durante o fluxo de compra
// onAdd → confirma hotel | onSkip → pula etapa | hideHotel → visibilidade CSS
// showHotel → renderiza ou não | selected/setSelected → hotel ativo | hotels → lista
function Hotel({ onAdd, onSkip, hideHotel, showHotel, selected, setSelected, hotels }){

  if(showHotel){
    return (
      // "hide" no overlay quando hideHotel for false
      <div className={hideHotel ? "hotel-overlay" : "hotel-overlay hide"}>
        <div className="hotel-modal">

          <h2>Add a hotel to your trip?</h2>
          <p className="hotel-subtitle">Choose one of the options below or skip.</p>

          <div className="hotel-cards">
            {hotels.map(h => (
              <div
                key={h.id}
                className={`hotel-card ${selected === h.id ? "hotel-card--selected" : ""}`} // destaca o selecionado
                onClick={() => setSelected(h.id)}
              >
                <span className="hotel-icon">{h.icon}</span>
                <p className="hotel-name">{h.name}</p>
                <p className="hotel-stars">{h.stars}</p>
                <p className="hotel-price">
                  USD ${h.price}
                  <span style={{color: "#60a5fa", fontSize: "1rem"}}> /night</span>
                </p>
              </div>
            ))}
          </div>

          <div className="hotel-actions">
            {/* Desabilitado até haver seleção */}
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