
const drawButton = document.getElementById("draw-button");
const sumParagraph = document.getElementById("sum-paragraph");

let cards = [];
let sum = 0;

console.log(sum);

function generateRandomCard() {
    return Math.floor(Math.random() * 14) + 1;
}

function drawNewCard(currentCards){
    if(sum>0) return generateRandomCard();
    
    let newCard = generateRandomCard();
    while(currentCards.includes(newCard)) {
        newCard = generateRandomCard();
    }

    return newCard
}

function displaySum(){
    sumParagraph.textContent = sum.toString();
}

drawButton.addEventListener("click", ()=> {
    const newCard = drawNewCard(cards);
    cards.push(newCard);
    sum += newCard;
    displaySum();    
})