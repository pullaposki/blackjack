const drawButton = document.getElementById("draw-button");
const sumParagraph = document.getElementById("sum-paragraph");

let sum = 0;

const cardRanks = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
const cardValues = [[1, 11], 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

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

drawButton.addEventListener("click", ()=> {
    handleClick();
});

function handleClick(){
    if (deck.length === 0){
        alert("No more cards left in the deck");
        return;
    }

    const newCard = drawFromDeck();
    sum += countCards(newCard);
    displaySum();

    if(sum === 21) {
        alert("you won: "+sum);
        reset();
    }
    else if(sum > 21) {
        alert("you lost: "+ sum);
        reset();
    }
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

function displaySum(){
    sumParagraph.textContent = sum.toString();
}

function reset() {
    sum = 0;
    displaySum();
}