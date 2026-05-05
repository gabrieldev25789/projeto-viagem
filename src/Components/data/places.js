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

import tokyo from "../../assets/imgs/city-imgs/tokyo.jpg"
import osaka from "../../assets/imgs/city-imgs/osaka.jpg"
import kyoto from "../../assets/imgs/city-imgs/kyoto.jpg"

import rio from "../../assets/imgs/city-imgs/rio de janeiro.jpg"
import saopaulo from "../../assets/imgs/city-imgs/sao paulo.jpg"
import salvador from "../../assets/imgs/city-imgs/salvador.jpg"

import sydney from "../../assets/imgs/city-imgs/sydeney.jpg"
import melbourne from "../../assets/imgs/city-imgs/melbourne.jpg"
import brisbane from "../../assets/imgs/city-imgs/brisbane.jpg"

import capetown from "../../assets/imgs/city-imgs/cape town.jpg"
import johannesburg from "../../assets/imgs/city-imgs/joanesburgo.jpg"
import durban from "../../assets/imgs/city-imgs/durban.jpg"

import toronto from "../../assets/imgs/city-imgs/toronto.jpg"
import vancouver from "../../assets/imgs/city-imgs/vancouver.jpg"
import montreal from "../../assets/imgs/city-imgs/montreal.jpg"

import berlin from "../../assets/imgs/city-imgs/berlin.jpg"
import munich from "../../assets/imgs/city-imgs/munich.jpg"
import hamburg from "../../assets/imgs/city-imgs/hamburg.jpg"

export const places = [
  {
    id: 1,
    country: "France",
    continent: "Europe",
    cities: [
      {
        id: 101,
        name: "Paris",
        img: paris,
        price: 4800,
        description: "The city of love, home to the Eiffel Tower, charming cafes, and a rich artistic history.",
      },
      {
        id: 102,
        name: "Bordeaux",
        img: bordeaux,
        price: 3900,
        description: "Famous for world-class wines, elegant architecture, and a perfect mix of culture and gastronomy.",
      },
      {
        id: 103,
        name: "Lyon",
        img: lyon,
        price: 4100,
        description: "France's culinary capital, known for traditional cuisine, a historic old town, and vibrant culture.",
      },
    ],
  },
  {
    id: 2,
    country: "USA",
    continent: "North America",
    cities: [
      {
        id: 201,
        name: "New York",
        img: newyork,
        price: 5500,
        description: "A fast-paced metropolis filled with iconic skyscrapers, Times Square, and endless entertainment.",
      },
      {
        id: 202,
        name: "Los Angeles",
        img: losangeles,
        price: 5300,
        description: "The heart of entertainment, offering sunny beaches, Hollywood glamour, and diverse culture.",
      },
      {
        id: 203,
        name: "Miami",
        img: miami,
        price: 5000,
        description: "Known for beautiful beaches, vibrant nightlife, and a strong Latin cultural influence.",
      },
    ],
  },
  {
    id: 3,
    country: "Italy",
    continent: "Europe",
    cities: [
      {
        id: 301,
        name: "Milano",
        img: milano,
        price: 3700,
        description: "A global fashion capital blending modern lifestyle with historic landmarks.",
      },
      {
        id: 302,
        name: "Roma",
        img: roma,
        price: 4000,
        description: "Ancient history at every corner, from the Colosseum to the Vatican and authentic Italian cuisine.",
      },
      {
        id: 303,
        name: "Turim",
        img: turim,
        price: 3400,
        description: "Elegant architecture, rich history, and a gateway to the Italian Alps.",
      },
    ],
  },
  {
    id: 4,
    country: "Spain",
    continent: "Europe",
    cities: [
      {
        id: 401,
        name: "Barcelona",
        img: barcelona,
        price: 5600,
        description: "Stunning Gaudí architecture, beautiful beaches, and a lively atmosphere full of art.",
      },
      {
        id: 402,
        name: "Madrid",
        img: madrid,
        price: 5200,
        description: "Spain's capital, known for royal palaces, world-class museums, and energetic nightlife.",
      },
      {
        id: 403,
        name: "Granada",
        img: granada,
        price: 4700,
        description: "Home to the Alhambra palace and breathtaking views of the Sierra Nevada mountains.",
      },
    ],
  },
  {
    id: 5,
    country: "Japan",
    continent: "Asia",
    cities: [
      {
        id: 501,
        name: "Tokyo",
        img: tokyo,
        price: 6000,
        description: "A futuristic city blending cutting-edge technology with traditional temples and culture.",
      },
      {
        id: 502,
        name: "Osaka",
        img: osaka,
        price: 5200,
        description: "Osaka is known for its street food, vibrant nightlife, and friendly atmosphere.",
      },
      {
        id: 503,
        name: "Kyoto",
        img: kyoto,
        price: 5800,
        description: "Kyoto is famous for its temples, geishas, and traditional Japanese culture.",
      },
    ],
  },
  {
    id: 6,
    country: "Brazil",
    continent: "South America",
    cities: [
      {
        id: 601,
        name: "Rio de Janeiro",
        img: rio,
        price: 3000,
        description: "Famous for its beaches, Carnival, and iconic landmarks like Christ the Redeemer.",
      },
      {
        id: 602,
        name: "São Paulo",
        img: saopaulo,
        price: 2800,
        description: "A massive financial hub with diverse culture, food, and nightlife.",
      },
      {
        id: 603,
        name: "Salvador",
        img: salvador,
        price: 2500,
        description: "Salvador is rich in Afro-Brazilian culture, music, and historic architecture.",
      },
    ],
  },
  {
    id: 7,
    country: "Australia",
    continent: "Oceania",
    cities: [
      {
        id: 701,
        name: "Sydney",
        img: sydney,
        price: 6200,
        description: "Sydney is known for its Opera House, beaches, and relaxed lifestyle.",
      },
      {
        id: 702,
        name: "Melbourne",
        img: melbourne,
        price: 5900,
        description: "Melbourne is famous for its coffee culture, arts scene, and livability.",
      },
      {
        id: 703,
        name: "Brisbane",
        img: brisbane,
        price: 5400,
        description: "Brisbane offers warm weather, outdoor lifestyle, and a growing cultural scene.",
      },
    ],
  },
  {
    id: 8,
    country: "South Africa",
    continent: "Africa",
    cities: [
      {
        id: 801,
        name: "Cape Town",
        img: capetown,
        price: 4500,
        description: "Cape Town is known for Table Mountain, stunning beaches, and diverse culture.",
      },
      {
        id: 802,
        name: "Johannesburg",
        img: johannesburg,
        price: 4200,
        description: "A major African city with a rich history and vibrant urban life.",
      },
      {
        id: 803,
        name: "Durban",
        img: durban,
        price: 4000,
        description: "Durban offers warm beaches, Indian-influenced cuisine, and a relaxed vibe.",
      },
    ],
  },
  {
    id: 9,
    country: "Canada",
    continent: "North America",
    cities: [
      {
        id: 901,
        name: "Toronto",
        img: toronto,
        price: 5300,
        description: "A multicultural city with a strong economy and vibrant arts scene.",
      },
      {
        id: 902,
        name: "Vancouver",
        img: vancouver,
        price: 5500,
        description: "Vancouver combines mountains, ocean, and a high quality of life.",
      },
      {
        id: 903,
        name: "Montreal",
        img: montreal,
        price: 5100,
        description: "Montreal blends French culture with a lively festival and food scene.",
      },
    ],
  },
  {
    id: 10,
    country: "Germany",
    continent: "Europe",
    cities: [
      {
        id: 1001,
        name: "Berlin",
        img: berlin,
        price: 4800,
        description: "A dynamic city known for its history, modern culture, and vibrant nightlife.",
      },
      {
        id: 1002,
        name: "Munich",
        img: munich,
        price: 5200,
        description: "Famous for Oktoberfest, beautiful architecture, and high quality of life.",
      },
      {
        id: 1003,
        name: "Hamburg",
        img: hamburg,
        price: 4600,
        description: "A major port city with a rich maritime history and lively cultural scene.",
      },
    ],
  }
]

