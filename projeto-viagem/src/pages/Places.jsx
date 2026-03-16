import { places } from "../../src/Components/data/places"
import PlaceCard from "../Components/PlaceCard/PlaceCard"

import "../Components/PlaceCard/PlaceCard.css"

function Places() {
  return (
    <div id="cards-container">
      {places.map((place) => (
        <PlaceCard key={place.id} {...place} />
      ))}
    </div>
  )
}

export default Places
