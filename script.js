const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const verseText = document.getElementById('verse');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get quotes from API
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show the new quote
// function newQuote() {
//     showLoadingSpinner();
//     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//     //ceck if author field is blank and replace it with Unknown
//     if(!quote.author) {
//         authorText.textContent = 'Unknown';
//     } else {
//         authorText.textContent = quote.author;
//     }
//     if(quote.text.length > 100) {
//         quoteText.classList.add('long-quote');
//     } else {
//         quoteText.classList.remove('long-quote');
//     }
//     quoteText.textContent = quote.text;
//     removeLoadingSpinner();
//     }

async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://beta.ourmanna.com/api/v1/get?format=json&order=random';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const newVerseText = data.verse.details.text
        const newVerse = data.verse.details.reference
            verseText.innerText = newVerse;
        if (newVerseText.length > 100) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        // Display Verse Text
        quoteText.innerText = newVerseText;
        // Stop Loader, Show Quote
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const verse = verseText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${verse}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//run getQuotes function
getQuote();
