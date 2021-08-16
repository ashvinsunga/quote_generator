const quoteBox = document.getElementById('quote-box');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote-button');
const loader = document.getElementById('loader');


let API_quotes  =[];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteBox.hidden = true;
}

function hideLoadingSpinner(){
    loader.hidden = true;
    quoteBox.hidden = false;
}

function genAPIQuotes(){
    // Pick a random quote from API_quotes
    const quote = API_quotes[Math.floor(Math.random() * localQuotes.length)]

    // If Author is blank, display 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Adjust text size depending on quote length
    if (quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}

// Get Quotes from API
async function fetchQuote() {
    showLoadingSpinner();
    const API_url = 'https://type.fit/api/quotes';
    try{
        const API_response = await fetch(API_url);
        API_quotes = await API_response.json();
        genAPIQuotes();
    } catch (error) {
        alert("Try reloading the page", error);
    }
}

// Tweet quotes
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',fetchQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
fetchQuote();

