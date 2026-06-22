import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const quotes = [
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function pickRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

app.get("/quote", (req, res) => {
  console.log("Received a request for a quote");
  res.json(pickRandomQuote());
});

app.post("/quote", (req, res) => {
  const body = req.body;

  if (!body?.quote || !body?.author) {
    return res.status(400).send("Expected quote and author");
  }

  quotes.push(body);
  res.send("ok");
});

app.get("/health", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Quote server listening on port ${port}`);
});
