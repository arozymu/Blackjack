let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#blackjack-hit-botton') .addEventListener('click', blackjackHit);

function blackjackHit() {
   let cardImage = document.createElement('img');
   cardImage.src = 'static/images/Q.png';
   document.querySelector(YOU['div']).appendChild(cardImage);
   hitSound.play();
}