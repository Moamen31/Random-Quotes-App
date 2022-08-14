let quoteBtn = document.querySelector("button");
let quote = document.querySelector(".quote-p");
let authorName = document.querySelector(".author-name");

let soundBtn = document.querySelector(".sound");
let copyBtn = document.querySelector(".copy");
let shareBtn = document.querySelector(".share");

function getRandomQuote() {
    //give the btn class loading to have less opacity
    quoteBtn.classList.add("loading");
    //before fetching, change the btn text
    quoteBtn.textContent = "Getting Quote...";
    fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((data) => {
            quote.textContent = data.content;
            authorName.textContent = data.author;
            //after fetching, change the btn text back
            quoteBtn.textContent = "New Quote";
            quoteBtn.classList.remove("loading");
        });
}

soundBtn.addEventListener("click", () => {
    /* web api represents a speech request. It contains the content the speech service
    to read texts and takes other properties(e.g. language, pitch and volume.)*/
    let speech = new SpeechSynthesisUtterance(
        `${quote.textContent} by ${authorName.textContent}`
    );
    //add property speak
    speechSynthesis.speak(speech);
});

copyBtn.addEventListener("click", () => {
    copyBtn.classList.add("show");
    //writeText() property writes the specified text string to the system clipboard.
    navigator.clipboard.writeText(quote.textContent);
    setTimeout(function () {
        copyBtn.classList.remove("show");
    }, 4000);
});

shareBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quote.textContent}`;
    window.open(tweetUrl, "_blank")
});

quoteBtn.addEventListener("click", getRandomQuote);
