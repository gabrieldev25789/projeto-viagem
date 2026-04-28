import "./OrderValue.css"

function OrderValue({ handleSort, sortValue, setSortValue, reset, setRemoveClass, hide }) {

  function handleChange(value) {
    setRemoveClass(true)
    setSortValue(value)

    if (value === "") {
      reset()
    } else {
      handleSort(value)
    }
  }

  return (
    !hide && (
      <div className="sort-wrapper">
        <label htmlFor="sort">Sort city by price</label>
        <select id="sort" value={sortValue} onChange={(e) => handleChange(e.target.value)}>
          <option value="">--</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    )
  )
}

export default OrderValue