import { useState } from "react"


// CityCard.jsx — mais simples, sem estado de lista
function CityCard({ city, onGoCity, onAddCity }) {
  console.log("CityCard onAddCity:", onAddCity)
  const [showDes, setShowDes] = useState(false)

  return (
    <div className="city">
      <p>{city.nome}</p>
      <img src={city.img} alt={city.nome} />
      <p className="price">Price: R$ {city.price}</p>

      <button onClick={() => setShowDes(prev => !prev)}>
        {showDes ? "Fechar" : "Ver descrição"}
      </button>

      <button onClick={() => onAddCity(city)}>Adicionar</button>

      <button onClick={() => onGoCity(city)}>GO</button>

      <p className={showDes ? "description" : "hide"}>
        {city.description}
      </p>
    </div>
  )
}

export default CityCard