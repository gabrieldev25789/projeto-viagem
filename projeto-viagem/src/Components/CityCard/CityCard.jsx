import { useState } from "react"


// CityCard.jsx — mais simples, sem estado de lista
function CityCard({ city, onAddCity }) {
  
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

      <p className={showDes ? "description" : "hide"}>
        {city.description}
      </p>
    </div>
  )
}

export default CityCard