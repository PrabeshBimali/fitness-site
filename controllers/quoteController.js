import {quotes} from "../data/quotes.js"

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

export function quote_get(req, res) {
    const randInt = randomIntFromInterval(0, 14)
    const quote = quotes.all[randInt]
    return res.status(200).json(quote)
}