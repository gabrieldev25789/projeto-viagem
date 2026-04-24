import "./OrderValue.css"

function OrderValue({ handleSort, sortValue, setSortValue, reset }) {

  function handleChange(value){
    setSortValue(value)
    handleSort(value)
  }

return (
    <div className="sort-wrapper">

      <label htmlFor="sort">Sort city by price</label>
      <select id="sort" onClick={() => reset()} value={sortValue} onChange={(e) => handleChange(e.target.value)}>
        <option value="">--</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>

    </div>
  )
}

export default OrderValue