import "./Requested.css"
import Cart from "../Cart/Cart"

function Requested( { total }) {
    
  return (
    <div>
        <h2>Total: USD {total.toFixed(2)}</h2>
    </div>
  )
}

export default Requested