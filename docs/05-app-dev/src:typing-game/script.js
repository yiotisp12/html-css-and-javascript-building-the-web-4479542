// inside script.js
// all of our quotes
const quotes = [
    'Good soldiers follow orders. We do what needs to be done.',
    'We are not droids we are men and we must be trusted to make the right decisions.',
    'When have we ever followed orders.',
    'THE CAVALRY HAS ARRIVED!',
    'This is a delicate operation.',
    'For the honor of our brothers! For the Republic!',
    'Stop firing! We are shooting at our own men! They are clones!',
    'Dont worry Wrecker you will beat him next time.',
    'Lets finish what we started.',
    'Dont even think about plan 99, Crosshair. We do this together.',
    'If this is how soldiers are rewards for heroic acts, then every man in this battalion may face a similar fate.',
    'I get to blow it up? The whole stinking thing? This is the happiest day of my life.',
    'Wake up Wrecker. Clone Force 99 died with Tech. We are not that squad anymore.',
    'Bad Batch, plan 72. Shockwave.',
    'We dont normally work with regs.',
];


// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;

// the starting time
let startTime = Date.now();

// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

// at the end of script.js
document.getElementById('start').addEventListener('click', () => {
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Put the quote into an array of words
  words = quote.split(' ');
  // reset the word index for tracking
  wordIndex = 0;

  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join('');
  // Highlight the first word
  quoteElement.childNodes[0].className = 'highlight';
  // Clear any prior messages
  messageElement.innerText = '';

  // Setup the textbox
  // Clear the textbox
  typedValueElement.value = '';
  // set focus
  typedValueElement.focus();
  // set the event handler

  // Start the timer
  startTime = new Date().getTime();
});

// at the end of script.js
typedValueElement.addEventListener('input', () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = '';
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = '';
  } else {
    // error state
    typedValueElement.className = 'error';
  }
});