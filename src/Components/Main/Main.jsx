import "./Main.css"
import img from "../../assets/imgs/main-img2.jpg"

function Main() {
  return (
    <div id='img'>
      <img src={img} alt="" />
      <div id="opacity">
        <div id="intro-infos">
          <h2>Welcome to GrizzyFlyes</h2>
          <p>
            At GrizzyFlyes, every journey begins with inspiration. Our mission is to help you discover extraordinary destinations, experience different cultures, and create unforgettable memories around the world. Whether you dream of relaxing on tropical beaches, exploring vibrant cities, or venturing into breathtaking landscapes, GrizzyFlyes is here to guide you every step of the way. Welcome aboard — your next adventure starts here.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main