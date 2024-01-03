const drawButton = document.getElementById("draw-button");
const newGameButton = document.getElementById("new-game-button");
const sumContainer = document.getElementById("sum-paragraph");
const cardContainer = document.getElementById("card-container");
const messageParagraph = document.getElementById("message-paragraph");

let sum = 0;

const cardRanks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
const cardValues = [[1, 11], 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

let deck = createDeck();

hideCard();

function createDeck() {
    let deck = [];
    for (let i = 0; i < cardRanks.length; i++) {
        for (let suit of suits) {
            deck.push({ 
                card: cardRanks[i], 
                suit: suit, 
                value: cardValues[i] });
        }
    }
    return deck;
}

drawButton.addEventListener("click", ()=> {
    handleClick();
});

function handleClick(){
    if (deck.length === 0){
        messageParagraph.textContent = "No more cards left in the deck";
        return;
    }

    const newCard = drawFromDeck();
    sum += countCards(newCard);
    displaySum();
    displayCard(newCard);

    if(sum === 21) {
        updateMessage("you won", true);
        disableDrawButton();
    }
    else if(sum > 21) {
        updateMessage("you lost", false);
        disableDrawButton();
    }
}

function updateMessage(text, isWinner) {
    // Remove the animation class
    messageParagraph.classList.remove('zoom-in');
    messageParagraph.classList.remove('red');
    messageParagraph.classList.remove('green');

    // Trigger reflow to restart animation
    void messageParagraph.offsetWidth;

    // Update text
    messageParagraph.textContent = text;

    // Determine the color based on win/loss
    if(isWinner){
        messageParagraph.classList.add('green');
    } else {
        messageParagraph.classList.add('red');
    }

    // Re-add animation class
    messageParagraph.classList.add('zoom-in');
}

newGameButton.addEventListener("click", ()=>{
    reset();
})

function displayCard(card) {
    const {card: name, suit} = card;

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card-box');
    cardDiv.textContent = `${name} ${suit}`;

    cardContainer.appendChild(cardDiv);
}

function hideCard(){
    cardContainer.textContent="";
}

function drawFromDeck() {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];                      
    removeFromDeck(randomIndex);
    return card;
}

function removeFromDeck(cardIndex){
    deck.splice(cardIndex, 1);
}

function countCards(card) {
    if (card.card === 'Ace' && sum <= 10) return 11;
    if (Array.isArray(card.value)) {
        return card.value[0];
    } else {
        return card.value;
    }
}

function displaySum() {
    sumContainer.textContent = sum.toString();
    sumContainer.classList.add('lerp');
    setTimeout(() => { sumContainer.classList.remove('lerp'); }, 300);
}

function disableDrawButton(){
    drawButton.disabled = true;
    drawButton.style.backgroundColor = "#CCCCCC";
    drawButton.style.cursor = "not-allowed";
}

function enableDrawButton(){
    drawButton.disabled = false;
    drawButton.style.backgroundColor = "";
    drawButton.style.cursor = "";
}

function reset() {
    hideCard();
    messageParagraph.textContent="";
    sum = 0;
    displaySum();
    enableDrawButton();
    deck = createDeck();
}