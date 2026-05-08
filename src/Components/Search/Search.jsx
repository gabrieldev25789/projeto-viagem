import "./Search.css"
import { places } from '../data/places'
import Places from '../Places/Places'

// ─────────────────────────────────────────────
// COMPONENT: Search
// Barra de filtros por cidade, continente e país
// Props:
//   onFilter          → atualiza a lista filtrada no pai
//   cityValue/set     → estado do input de cidade
//   setCitySearch     → valor usado pelo Places para filtrar cards
//   setSortType       → reseta ordenação ao digitar
//   resetValue        → limpa outros filtros ativos
//   continentValue/set → estado do input de continente
//   countryValue/set  → estado do input de país
//   setRemoveClass    → controla classe de layout no container
// ─────────────────────────────────────────────
function Search({ onFilter, setCityValue, cityValue, setCitySearch, setSortType, resetValue, setContinentValue, setCountryValue, countryValue, continentValue, setRemoveClass }){

  // ─────────────────────────────────────────────
  // HANDLER: Filtro genérico compartilhado pelos 3 inputs
  // Recebe o evento e o campo ("city" | "continent" | "country")
  // ─────────────────────────────────────────────
  function handleChange(e, field) {
    setRemoveClass(false)
    resetValue()       // limpa ordenação e seleção ativa
    setSortType("")

    const rawValue   = e.target.value
    const inputValue = rawValue.toLowerCase().trim()

    // Zera os outros dois campos e seta apenas o campo ativo
    const allSetters = { city: setCityValue, continent: setContinentValue, country: setCountryValue }
    Object.entries(allSetters).forEach(([key, set]) => {
      key === field ? set(rawValue) : set("")
    })

    // Filtra places de acordo com o campo ativo
    const filtered = inputValue
      ? places.filter(place => {
          if (field === "city")      return place.cities.some(city => city.name.toLowerCase().includes(inputValue))
          if (field === "continent") return place.continent.toLowerCase().includes(inputValue)
          if (field === "country")   return place.country.toLowerCase().includes(inputValue)
        })
      : places // sem texto → exibe tudo

    // citySearch alimenta o filtro inline do componente Places
    if (field === "city") {
      setCitySearch(inputValue)
    } else {
      setCitySearch("") // garante que Places não filtre por cidade ao usar outros campos
    }

    onFilter(filtered)
  }

  // Configuração dos 3 inputs — cada um tem seu campo, placeholder, valor e função de limpar
  const fields = [
    {
      field: "city",
      placeholder: "Search city...",
      value: cityValue,
      clear: () => { setCityValue(""); setCitySearch(""); onFilter(places); }
    },
    {
      field: "continent",
      placeholder: "Search continent...",
      value: continentValue,
      clear: () => { setContinentValue(""); onFilter(places); }
    },
    {
      field: "country",
      placeholder: "Search country...",
      value: countryValue,
      clear: () => { setCountryValue(""); onFilter(places); }
    },
  ]

  return (
    <>
      <div className="search-group">
        {fields.map(({ field, placeholder, value, clear }) => (
          <div className="search-wrap" key={field}>
            <div className="search-field">

              {/* Ícone de lupa */}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="6.5" cy="6.5" r="4.5"/>
                <path d="M10.5 10.5L14 14" strokeLinecap="round"/>
              </svg>

              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleChange(e, field)}
                autoComplete="off"
              />

              {/* Botão de limpar — só aparece quando o input tem valor */}
              {value && (
                <button className="clear-btn" onClick={clear}>
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 2l6 6M8 2l-6 6" strokeLinecap="round"/>
                  </svg>
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Search