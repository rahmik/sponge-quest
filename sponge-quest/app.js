document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedPairs = 0;
    let score = 0;
    let startTime, timerInterval;

    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const clickSound = document.getElementById('clickSound');
    const bgSound = document.getElementById('bg-sound');
    const goofyCardSound = document.getElementById('goofy-cardSound');
    const playButton = document.getElementById('playButton');
    const howToPlayButton = document.getElementById('howToPlayButton');

    bgSound.volume = 0.5;
    clickSound.volume = 0.9;

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = formatTime(elapsedTime);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    bgSound.loop = true;
    bgSound.play();

    setTimeout(() => {
        cards.forEach(card => card.classList.add('flipped'));
    }, 1000);

    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flipped'));
        startTimer();
    }, 2100);

    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        clickSound.play();
        
        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }

    function checkForMatch() {
        let firstCardImage = firstCard.querySelector('.card-back img').src;
        let secondCardImage = secondCard.querySelector('.card-back img').src;

        let isMatch = firstCardImage === secondCardImage;

        if (isMatch) {
            if (firstCardImage === 'https://i.postimg.cc/tJ73dPbP/goofy.webp') {
                goofyCardSound.play();
            }
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;
        score++;
        scoreDisplay.textContent = `Score: ${score}/8`;

        if (matchedPairs === 8) {
            stopTimer();
            setTimeout(() => {
                alert(`Congratulations! You've found all matches in ${timerDisplay.textContent}!`);
            }, 500);
        }

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    if (playButton) {
        playButton.addEventListener('click', function() {
            window.location.href = 'game.html';
        });
    } else {
        console.error('Play button not found');
    }

    if (howToPlayButton) {
        howToPlayButton.addEventListener('click', function() {
            window.location.href = 'howtoplay.html';
        });
    } else {
        console.error('How to Play button not found');
    }
});

