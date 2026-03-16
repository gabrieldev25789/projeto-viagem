import "./PlaceCard.css"

function PlaceCard({id, country, city, price, img}) {
  return (
    <>
        <div className="card">
                <ul key={id}>
                    <img src={img} alt="" />
                    <h2>{country}</h2>
                    <li>{city}</li>
                    <li>{price}</li>
                </ul>
        </div>
    </>
    )
}

export default PlaceCard