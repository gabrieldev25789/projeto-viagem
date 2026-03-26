import { useState } from "react"
import "./PlaceCard.css"
import CityCard from "../CityCard/CityCard"


function PlaceCard({ id, country, city1, city2, city3, goCity }) 
{ const [show, setShow] = useState(false) 
    return ( 
    <div className="card" key={id}> 
    <h2>{country}</h2> 
    <button onClick={() => setShow(prev => !prev)}> 
    {show ? "Fechar" : "Clique para ver cidades"} 
    </button> 
    <div className={show ? "cities" : "hide"}> 
    <CityCard city={city1} onGoCity={goCity}/> 
    <CityCard city={city2} onGoCity={goCity}/> 
    <CityCard city={city3} onGoCity={goCity}/> 
    </div> 
    </div> 
    ) 
}

export default PlaceCard