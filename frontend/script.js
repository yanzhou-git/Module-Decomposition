const quoteSpace = document.getElementById("quote");
const authorSpace = document.getElementById("author");
const btn = document.getElementById("btn");

async function fetchQuote() {
  try {
    const response = await fetch("/api/quote");
    const data = await response.json();
    quoteSpace.textContent = data.quote;
    authorSpace.textContent = "- " + data.author;
  } catch (error) {
    quoteSpace.textContent = "Failed to fetch quote";
  }
}

btn.addEventListener("click", fetchQuote);
fetchQuote();
