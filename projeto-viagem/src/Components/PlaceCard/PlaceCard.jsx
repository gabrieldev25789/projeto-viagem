import { useState } from "react"
import "./PlaceCard.css"



function PlaceCard({id, country, city1, city2, city3, price}) {

    const [show, setShow] = useState(false)

    function showCities(){
        setShow(true)
    }
  return (
    <>
        <div className="card" key={id}>


            <h2>{country}</h2>

            <button onClick={showCities}>Clique para ver cidades</button>

            <div className={show ? "cities" : "hide"}>

                <div className="city">
                    <p>{city1.nome}</p>
                    <img src={city1.img} alt={city1.nome} />
                </div>

                <div className="city">
                    <p>{city2.nome}</p>
                    <img src={city2.img} alt={city2.nome} />
                </div>

                <div className="city">
                    <p>{city3.nome}</p>
                    <img src={city3.img} alt={city3.nome} />
                </div>

            </div>

            <p className="price">Price: R$ {price}</p>
        </div>
    </>
    )
}

export default PlaceCard