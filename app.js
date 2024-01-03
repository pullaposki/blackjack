const ANIMATION_DURATION = 350;
const NEW_GAME_FADE_IN_DURATION = 2000;

const drawButton = document.getElementById("draw-button");
const newGameButton = document.getElementById("new-game-button");
const sumContainer = document.getElementById("sum-paragraph");
const cardContainer = document.getElementById("card-container");
const messageParagraph = document.getElementById("message-paragraph");

newGameButton.addEventListener("click", resetGame);
drawButton.addEventListener("click", handleDrawClick);

let sum = 0;
const cardRanks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
const cardValues = [[1, 11], 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

hideCard();
hideNewGameButton();

let deck = createDeck();
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

function handleDrawClick(){
    if (isDeckEmpty()){
        messageParagraph.textContent = "No more cards left in the deck";
        return;
    }

    doNewCardOperations();
    checkWinningConditions();
}

function isDeckEmpty(){
    return deck.length === 0;
}

function doNewCardOperations(){
    const newCard = drawFromDeck();
    sum += countCards(newCard);
    displaySum();
    displayCard(newCard);
}

function checkWinningConditions(){
    if(sum === 21) {
        handleGameOverMessage("you won", true);
        showNewGameButton();
        disableDrawButton();
    }
    else if(sum > 21) {
        handleGameOverMessage("you lost", false);
        showNewGameButton();
        disableDrawButton();
    }
}

function handleGameOverMessage(text, isWinner) {
    setTimeout(()=>{
        removeAnimationClasses();
        void messageParagraph.offsetWidth;
        messageParagraph.textContent = text;
        const color = determineColor(isWinner);
        messageParagraph.classList.add(color);
        messageParagraph.classList.add('zoom-in');
    }, ANIMATION_DURATION)
}

function removeAnimationClasses(){
    messageParagraph.classList.remove('zoom-in');
    messageParagraph.classList.remove('red');
    messageParagraph.classList.remove('green');
}

function determineColor(isWinner){
    return isWinner ? 'green' : 'red';
}

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
    setTimeout(()=>{
        sumContainer.textContent = sum.toString();
        sumContainer.classList.add('lerp');
        setTimeout(() => { sumContainer.classList.remove('lerp'); }, ANIMATION_DURATION);
    }, ANIMATION_DURATION)
    
}

function hideNewGameButton(){
    newGameButton.style.display = "none";
}

function showNewGameButton() {
    setTimeout(()=>{
        newGameButton.style.display = "block";
        newGameButton.classList.add('fade-in');    
    }, NEW_GAME_FADE_IN_DURATION)
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

function resetGame() {
    hideNewGameButton();
    hideCard();
    messageParagraph.textContent="";
    sum = 0;
    displaySum();
    enableDrawButton();
    deck = createDeck();
}