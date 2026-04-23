import "./OrderValue.css"
import { places } from "../data/places.js"

  const cities = places.flatMap(place => place.cities)

function OrderValue() {

   let sorted = [...cities]

  function handleSort(type){
    if(type === "asc"){
    sorted.sort((a, b) => a.price - b.price)
    }
    
    if(type === "desc"){
    sorted.sort((a, b) => b.price - a.price)
    }
  }

return (
    <div className="sort-wrapper">
      <label htmlFor="sort">Sort by price</label>

      <select id="sort" onChange={(e) => handleSort(e.target.value)}>
        <option value="">--</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  )
}

export default OrderValue