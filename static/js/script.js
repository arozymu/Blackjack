let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K':10, 'J': 10, 'Q': 10, 'A': [1, 11]},
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);


document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    let card = randomCard();
    console.log(card);
    showCard(card,YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
}

function randomCard() {
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer) {
if (activePlayer['score'] <= 21) {
   let cardImage = document.createElement('img');
   cardImage.src = 'static/images/*{card}.png';
   document.querySelector(activePlayer['div']).appendChild(cardImage);
   hitSound.play();
 }
}

function blackjackDeal() {
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0; i< yourImages.length; i++) {
        yourImages[i].remove();
    }

    for (i=0; i< dealerImages.length; i++) {
        dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';


}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        // if adding 11 keeps me below 21,add 11. otherwise, add 1
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <=21) {
        activePlayer['score'] + blackjackGame['cardsMap'][card][1];
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
     }
    } else {
    
    activePlayer['score'] += blackjackGame['cardsMap'][card];
 }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).textContent = 'red!';

    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
 }
}

function dealerLogic() {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
}

// compute winner and return who just won

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        // condition: higher score than dealer or when dealer busts but you are
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            console.log('You won!');
            winner =  YOU;
        } else if (YOU['score'] < DEALER['score']) {
            console.log('You lost!');
            winner = DEALER;


        } else if (YOU['score'] === DEALER['score']) {
            console.log('You drew!');
        }
        // condition: when user busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        console.log('You lost!');
        winner = DEALER;

        // condition: when you and the dealer busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        console.log('You drew!');
    }

    return winner;
}
