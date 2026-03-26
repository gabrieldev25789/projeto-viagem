import { useState } from "react"
import "./PlaceCard.css"



function PlaceCard({id, country, city1, city2, city3}) {

    const [show, setShow] = useState(false)
    const [showDes, setShowDes] = useState(false)

    function showCities() {
        setShow(prev => !prev)
    }

   function seeDescription(city) {
  setShowDes(prev => prev === city ? null : city)
}

  return (
    <>
        <div className="card" key={id}>

            <h2>{country}</h2>

            <button onClick={showCities}>{show ? "Fechar" : "Clique para ver cidades"}</button>

            <div className={show ? "cities" : "hide"}>

                <div className="city">
                    <p>{city1.nome}</p>
                    <img src={city1.img} alt={city1.nome} />
                    <p className="price">Price: R$ {city1.price}</p>
                    <button className="see-description" onClick={() => seeDescription("city1")}>{showDes && showDes === "city1" ? "Close" : "see description"}</button>
                    <p className={showDes === "city1" ? "description" : "hide"}>{city1.description}</p>
                </div>

                <div className="city">
                    <p>{city2.nome}</p>
                    <img src={city2.img} alt={city2.nome} />
                    <p className="price">Price: R$ {city2.price}</p>
                    <button className="see-description" onClick={() => seeDescription("city2")}>{showDes && showDes === "city2" ? "Close" : "see description"}</button>
                    <p className={showDes === "city2" ? "description" : "hide"}>{city2.description}</p>
                </div>

                <div className="city">
                    <p>{city3.nome}</p>
                    <img src={city3.img} alt={city3.nome} />
                    <p className="price">Price: R$ {city3.price}</p>
                    <button className="see-description" onClick={()=> seeDescription("city3")}>{showDes && showDes === "city3" ? "Close" : "see description"}</button>    
                    <p className={showDes === "city3" ? "description" : "hide"}>{city3.description}</p>
                </div>
            </div>
        </div>
    </>
    )
}

export default PlaceCard