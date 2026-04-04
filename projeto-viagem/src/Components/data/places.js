import paris from "../../assets/imgs/city-imgs/paris.jpg"
import bordeaux from "../../assets/imgs/city-imgs/bordeux.jpg"
import lyon from "../../assets/imgs/city-imgs/lyon.jpg"

import newyork from "../../assets/imgs/city-imgs/newyork.jpg"
import losangeles from "../../assets/imgs/city-imgs/losangeles.jpg"
import miami from "../../assets/imgs/city-imgs/miami.jpg"

import milano from "../../assets/imgs/city-imgs/milano.jpg"
import roma from "../../assets/imgs/city-imgs/roma.jpg"
import turim from "../../assets/imgs/city-imgs/turim.jpg"

import barcelona from "../../assets/imgs/city-imgs/barcelona.jpg"
import madrid from "../../assets/imgs/city-imgs/madrid.jpg"
import granada from "../../assets/imgs/city-imgs/granada.jpg"

export const places = [
  {
    id: 1,
    country: "France",
    continet: "Europe",
    city1: {
      nome: "Paris",
      img: paris,
      price: 4800,
      description: "Paris is known as the city of love, full of iconic landmarks like the Eiffel Tower, charming cafes, and a rich artistic history that attracts millions of visitors every year."
    },
    city2: {
      nome: "Bordeaux",
      img: bordeaux,
      price: 3900,
      description: "Bordeaux is famous for its world-class wines, elegant architecture, and relaxed lifestyle, offering a perfect mix of culture and gastronomy."
    },
    city3: {
      nome: "Lyon",
      img: lyon,
      price: 4100,
      description: "Lyon is a culinary capital of France, known for its traditional cuisine, historic old town, and vibrant cultural scene."
    },
  },
  
  {
    id: 2,
    country: "USA",
    continet: "North America",
    city1: {
      nome: "New York",
      img: newyork,
      price: 5500,
      description: "New York City is a fast-paced metropolis filled with skyscrapers, famous attractions like Times Square, and endless entertainment options."
    },
    city2: {
      nome: "Los Angeles",
      img: losangeles,
      price: 5300,
      description: "Los Angeles is the heart of the entertainment industry, offering sunny beaches, Hollywood glamour, and a diverse cultural scene."
    },
    city3: {
      nome: "Miami",
      img: miami,
      price: 5000,
      description: "Miami is known for its beautiful beaches, vibrant nightlife, and a strong Latin influence that shapes its unique culture."
    },
  },
  
  {
    id: 3,
    country: "Italy",
    continet: "Europe",
    city1: {
      nome: "Milano",
      img: milano,
      price: 3700,
      description: "Milan is a global fashion capital, combining modern lifestyle with historic landmarks and a thriving business environment."
    },
    city2: {
      nome: "Roma",
      img: roma,
      price: 4000,
      description: "Rome is a city full of ancient history, where you can explore iconic sites like the Colosseum and the Vatican while enjoying authentic Italian cuisine."
    },
    city3: {
      nome: "Turim",
      img: turim,
      price: 3400,
      description: "Turin is known for its elegant architecture, rich history, and as a gateway to the Italian Alps, offering a quieter but charming experience."
    },
  },
  
  {
    id: 4,
    country: "Spain",
    continet: "Europe",
    city1: {
      nome: "Barcelona",
      img: barcelona,
      price: 5600,
      description: "Barcelona blends stunning architecture by Gaudí, beautiful beaches, and a lively atmosphere full of art and culture."
    },
    city2: {
      nome: "Madrid",
      img: madrid,
      price: 5200,
      description: "Madrid is Spain’s capital, known for its royal palaces, world-class museums, and energetic nightlife."
    },
    city3: {
      nome: "Granada",
      img: granada,
      price: 4700,
      description: "Granada offers a unique mix of cultures, highlighted by the Alhambra palace and its breathtaking views of the Sierra Nevada mountains."
    },
  }
]
