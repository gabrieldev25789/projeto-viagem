import { useState } from "react"

function CityCard({ city }) {
  const [showDes, setShowDes] = useState(false)

  return (
    <div className="city">
      <p>{city.nome}</p>
      <img src={city.img} alt={city.nome} />
      <p className="price">Price: R$ {city.price}</p>
      <button className="see-description" onClick={() => setShowDes(prev => !prev)}>
        {showDes ? "Close" : "See description"}
      </button>
      <p className={showDes ? "description" : "hide"}>{city.description}</p>
    </div>
  )
}

export default CityCard