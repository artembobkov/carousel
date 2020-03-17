import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";

const DEMO_API_KEY = "0a51cb02-428c-4ef5-ad48-ed23f1c68251";
const CATS_URL = "https://api.thecatapi.com/v1/images/search";
const CATS_COUNT = 10;
const CATS_IMAGE_SIZE = "small";

function useCats() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    axios
      .get(CATS_URL, {
        params: { limit: CATS_COUNT, size: CATS_IMAGE_SIZE },
        headers: { "x-api-key": DEMO_API_KEY }
      })
      .then(response => {
        const catURLs = response.data.map(cat => cat.url);
        setCats(catURLs);
        console.log(response);
      });
  }, []);

  return [cats];
}

export default function App() {
  const [cats] = useCats();
  const catElements = cats.map(cat => (
    <div>
      <img src={cat} alt="Cat" />
      <p className="legend">Meow</p>
    </div>
  ));
  return <Carousel className="App">{catElements}</Carousel>;
}
