import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Main/Main'
import Cart from './Components/Cart/Cart'
import Search from './Components/Search/Search'
import Requested from '../pages/Requested'
import FlightSearch from './Components/FlightSearch/FlightSearch'
import { places } from './Components/data/places'
import Places from './Components/Places/Places'
import Message from './Components/Message/Message'
import OrderValue from './Components/OrderValue/OrderValue'
import Hotel from './Components/Hotel/Hotel'

function App() {

  // ── UI ───────────────────────────────────────
  const [show, setShow] = useState(false)               // exibe painel de destinos
  const [showCalendar, setShowCalendar] = useState(false) // exibe FlightSearch
  const [hide, setHide] = useState(false)               // esconde OrderValue ao não encontrar resultados
  const [showCitySelected, setShowCitySelected] = useState(false)
  const [citySelected, setCitySelected] = useState("")  // nome da cidade ativa no calendário
  const [message, setMessage] = useState({ text: "", type: "add", isOpen: false })

  // ── Filtros / busca ──────────────────────────
  const [filteredPlaces, setFilteredPlaces] = useState(places)
  const [selectCity, setSelectCity] = useState(null)    // ID da cidade selecionada nos cards
  const [cityValue, setCityValue] = useState("")        // input de busca por cidade
  const [citySearch, setCitySearch] = useState("")      // valor repassado ao Places para filtrar
  const [continentValue, setContinentValue] = useState("")
  const [countryValue, setCountryValue] = useState("")
  const [removeClass, setRemoveClass] = useState(false) // controla layout de lista no Places

  // ── Ordenação ────────────────────────────────
  const [sortValue, setSortValue] = useState("")
  const [sortType, setSortType] = useState("")          // "asc" | "desc" | ""

  // ── Hotel ────────────────────────────────────
  const [selected, setSelected] = useState(null)        // ID do hotel selecionado no modal
  const [hideHotel, setHideHotel] = useState(false)     // visibilidade do overlay do modal
  const [showHotel, setShowHotel] = useState(true)      // monta/desmonta o modal Hotel

  // ── Preços ───────────────────────────────────
  const [valueNight, setValueNight] = useState(0)       // custo calculado por noite no FlightSearch

  // ── Cidade pendente (entre selecionar e confirmar datas) ──
  const [pendingCity, setPendingCity] = useState(null)
  const [pendingCityPrice, setPendingCityPrice] = useState(null)
  const pendingSearchRef = useRef(null) // armazena dados do item até o modal Hotel ser resolvido

  // ── Lista do carrinho — persiste no localStorage ──
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("order-list")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("order-list", JSON.stringify(list))
  }, [list])

  const navigate = useNavigate()

  // Dados dos hotéis disponíveis para seleção
  const hotels = [
    { id: 1, icon: "🏨", name: "Grand Palace", stars: "5 stars · Downtown", price: "680" },
    { id: 2, icon: "🛏️", name: "Over Sea Inn", stars: "4 stars · South Side",  price: "420" },
    { id: 3, icon: "🌿", name: "Rest Place",   stars: "3 stars · Suburbio", price: "220" },
  ]

  // Soma dos preços base × quantidade de cada destino no carrinho
  const total = list.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.amount) || 0),
    0
  )

  // Navega para a página de confirmação passando os dados do pedido
  function finish() {
    navigate('/requested', { state: { list, total } })
  }

  // Reseta ordenação sem mexer nos filtros de busca
  function resetValue() {
    [setSortType, setSortValue].forEach(set => set(""))
  }

  // Alterna painel de destinos e limpa seleção ao fechar
  function showDestinations() {
    setShowCalendar(false)
    setShow(prev => !prev)
    if (show) setSelectCity(null)
  }

  // ─────────────────────────────────────────────
  // HANDLER: Selecionar cidade nos cards
  // Clique duplo no mesmo card desmarca e fecha o calendário
  // ─────────────────────────────────────────────
  function chooseCity(id, name, price, img) {
    if (selectCity === id) {
      [setSelectCity, setPendingCity, setPendingCityPrice].forEach(set => set(null))
      setShowCalendar(false)
      setCitySelected("")
    } else {
      setPendingCity({ id, name, price, img })
      setPendingCityPrice(price)
      setShowCalendar(true)
      setSelectCity(id)
      setCitySelected(name)
    }
  }

  // ─────────────────────────────────────────────
  // HANDLER: Confirmar datas no FlightSearch
  // Valida limite de 30 noites e abre modal de hotel
  // ─────────────────────────────────────────────
  function handleSearch({ startDate, endDate, nights }) {
    if (!pendingCity) return
    if (nights > 30) { error(); return }

    const toISODate = (date) => new Date(date).toISOString().split("T")[0]

    // Salva na ref para aguardar decisão do modal Hotel antes de adicionar ao carrinho
    pendingSearchRef.current = {
      ...pendingCity,
      amount: 1,
      startDate: toISODate(startDate),
      endDate: toISODate(endDate),
      nights,
    }

    setPendingCity(null)
    setShowCalendar(false)
    setShowHotel(true)
    setHideHotel(true)
  }

  // ─────────────────────────────────────────────
  // HANDLER: Confirmar hotel e adicionar ao carrinho
  // ─────────────────────────────────────────────
  function addHotel() {
    if (!pendingSearchRef.current) return

    const foundHotel = hotels.find(h => h.id === selected) ?? null
    const newItem = {
      ...pendingSearchRef.current,
      uniqueId: `${pendingSearchRef.current.id}_${crypto.randomUUID()}`,
      hotelSelected: foundHotel,
      valueNight: valueNight,
      priceHotel: foundHotel ? parseFloat(foundHotel.price.replace("R$ ", "")) : 0
    }

    setList(prev => [...prev, newItem])
    pendingSearchRef.current = null
    cityAdd()
  }

  // ─────────────────────────────────────────────
  // HANDLER: Pular seleção de hotel
  // Adiciona o item sem hotel e fecha o modal
  // ─────────────────────────────────────────────
  function onSkip() {
    if (!pendingSearchRef.current) return

    const newItem = {
      ...pendingSearchRef.current,
      uniqueId: `${pendingSearchRef.current.id}_${crypto.randomUUID()}`,
      hotelSelected: null,
      valueNight: valueNight
    }

    setList(prev => [...prev, newItem])
    pendingSearchRef.current = null
    setCitySelected("")
    setHideHotel(false)
    cityAdd()
  }

  // Exibe toast de sucesso e reseta estados pós-adição
  function cityAdd() {
    setMessage({ text: "City added successfully", type: "add", isOpen: true })
    setCitySelected("")
    ;[setShowHotel, setHideHotel, setShowCitySelected].forEach(set => set(false))
    ;[setSelectCity, setSelected].forEach(set => set(null))
  }

  // Toast de erro para limite de noites excedido
  function error() {
    setMessage({ text: "You can only stay for 30 nights", type: "erro", isOpen: true })
  }

  // Remove item do carrinho pelo uniqueId
  function removeCity(uniqueId) {
    setList(prev => prev.filter(item => item.uniqueId !== uniqueId))
  }

  // Reseta todos os filtros e restaura lista completa
  function reset() {
    [setCityValue, setCountryValue, setContinentValue, setCitySearch, setSortType, setSortValue].forEach(set => set(""))
    setFilteredPlaces(places)
  }

  // ── Ordenação de cidades ─────────────────────
  const cities = places.flatMap(place => place.cities)
  let sorted = [...cities]

  // sortedCities só existe quando há ordenação ativa — repassado ao Places
  const sortedCities = sortType
    ? [...cities].sort((a, b) =>
        sortType === "asc" ? a.price - b.price : b.price - a.price
      )
    : null

  function handleSort(type) {
    setSortType(type)
    if (type === "asc")  sorted.sort((a, b) => a.price - b.price)
    if (type === "desc") sorted.sort((a, b) => b.price - a.price)
  }

  // Fecha o toast automaticamente após 2s
  useEffect(() => {
    if (!message.isOpen) return
    const timer = setTimeout(() => setMessage(prev => ({ ...prev, isOpen: false })), 2000)
    return () => clearTimeout(timer)
  }, [message.isOpen])

  // Totais derivados da lista — repassados ao Cart e Requested
  const totalPriceHotel  = list.reduce((acc, item) =>
    acc + (item.hotelSelected ? parseFloat(item.hotelSelected.price) : 0), 0)

  const totalValueNight = list.reduce((acc, item) => acc + (item.valueNight || 0), 0)

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <Routes>

      {/* ── Página principal ── */}
      <Route path="/" element={
        <>
          <NavBar />
          <Main />

          {showCalendar && (
            <FlightSearch
              onSearch={handleSearch}
              setSelectCity={setSelectCity}
              setValueNight={setValueNight}
              list={list}
              cityPrice={pendingCityPrice}
            />
          )}

          {/* Botão que abre/fecha o painel de destinos */}
          <button className={`dest-btn ${show ? "open" : ""}`} onClick={showDestinations}>
            <svg className="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{show ? "Click to close" : "Click to see destinations"}</span>
          </button>

          {show && (
            <div className="place-cart-container">
              <div className="search-places-wrapper">

                {/* Search fica oculto durante seleção de datas */}
                {!showCalendar &&
                  <Search
                    chooseCity={chooseCity}
                    selectCity={selectCity}
                    setSelectCity={setSelectCity}
                    onFilter={setFilteredPlaces}
                    setCityValue={setCityValue}
                    cityValue={cityValue}
                    setCitySearch={setCitySearch}
                    setSortType={setSortType}
                    resetValue={resetValue}
                    countryValue={countryValue}
                    setCountryValue={setCountryValue}
                    continentValue={continentValue}
                    setContinentValue={setContinentValue}
                    setRemoveClass={setRemoveClass}
                  />
                }

                {/* Modal de hotel — sempre montado, visibilidade via hideHotel/showHotel */}
                <Hotel
                  onSkip={onSkip}
                  onAdd={addHotel}
                  hideHotel={hideHotel}
                  showHotel={showHotel}
                  selected={selected}
                  setSelected={setSelected}
                  hotels={hotels}
                />

                {!showCalendar &&
                  <OrderValue
                    handleSort={type => handleSort(type)}
                    sorted={sorted}
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                    reset={reset}
                    setRemoveClass={setRemoveClass}
                    hide={hide}
                  />
                }

                <Places
                  placesData={filteredPlaces}
                  chooseCity={chooseCity}
                  selectCity={selectCity}
                  setSelectCity={setSelectCity}
                  cityValue={cityValue}
                  citySearch={citySearch}
                  sortedCities={sortedCities}
                  removeCLass={removeClass}
                  countryValue={countryValue}
                  continentValue={continentValue}
                  setHide={setHide}
                  setMessage={setMessage}
                />
              </div>

              <Message
                isOpen={message.isOpen}
                type={message.type}
                message={message.text}
                onClose={() => setMessage(prev => ({ ...prev, isOpen: false }))}
              />

              {/* Cart fica oculto enquanto o modal Hotel está aberto */}
              {!hideHotel && (
                <Cart
                  list={list}
                  removeCity={removeCity}
                  finish={finish}
                  citySelected={citySelected}
                  showCitySelected={showCitySelected}
                  valueNight={valueNight}
                  totalPriceHotel={totalPriceHotel}
                  totalValueNight={totalValueNight}
                />
              )}
            </div>
          )}
        </>
      } />

      {/* ── Página de confirmação do pedido ── */}
      <Route path="/requested" element={
        <Requested
          list={list}
          setList={setList}
          total={total}
          totalPriceHotel={totalPriceHotel}
          totalValueNight={totalValueNight}
        />
      } />

    </Routes>
  )
}

export default App