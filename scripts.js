const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard; 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch(); 
}

checkForMatch = () => {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

unflipCards = () => {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 450);
}

resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

shuffle = () => {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
} 
shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));


// ADDED FEATURES

// 1. Add button to reset game without refreshing browser
const playAgain = document.querySelector('#play-again');

playAgain.addEventListener('click', () => {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    })
    shuffle();
    lockboard = false;

// 2. Add Countdown timer (till game end)
    let barWidth = 640;
    let time_left = "";

        startCountdown = (seconds) => {
            let interval = setInterval (() => {

                time_left = seconds--;
                let progressBar = document.querySelector('.progress-bar');
                progressBar.innerText = time_left + " seconds left!";

                let reduceBarBy = 640 - ( time_left * (640/60)) ;

                console.log(reduceBarBy)

                let newBarWidth = barWidth - reduceBarBy;
                progressBar.style.width = newBarWidth + 'px';
                
                console.log(barWidth);
                
                // 2a. Stop game once time is up, reset board.

                if (time_left === 0) {
                    clearInterval(interval);
                    cards.forEach(card => {
                        card.classList.remove('flip');
                    })
                shuffle();
                lockboard = true;
                }
            }, 1000);
        };
    startCountdown(60);
});