const authorText = document.getElementById('author');
const loader = document.getElementById('loader');
const newQuoteBtn = document.getElementById('new-quote');
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const xTwitterBtn = document.getElementById('x-twitter');

let apiQuotes = [];

// Loading Spinner Shown
function showLoader() {
  loader.classList.remove('hidden');
  quoteContainer.classList.add('hidden');
}

// Remove Loading Spinner
function removeLoader() {
  quoteContainer.classList.remove('hidden');
  loader.classList.add('hidden');
}

// Show New Quote
function newQuote() {
  showLoader();

  // Pick a random quote from array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) authorText.textContent = '- Unknown';
  else authorText.textContent = `- ${quote.author}`;

  // Check Quote length to determine styling
  if (quote.text.length > 120) quoteText.classList.add('long-quote');
  else quoteText.classList.remove('long-quote');

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoader();
}

// Get Quotes From API
async function getQuotes() {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    showLoader();
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    console.error('Error fetching quotes:', err);
  }
}

// Post Quote
function postQuote() {
  const xTwitterUrl = `https://x.com/intent/post?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(xTwitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
xTwitterBtn.addEventListener('click', postQuote);

// On Load
getQuotes();
