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
    const drunkSound = document.getElementById('drunkSound');
    const bootySound = document.getElementById('bootySound');
    const squadSound = document.getElementById('squadSound');
    const patstripSound = document.getElementById('patstripSound');
    const screamSound = document.getElementById('screamSound');
    const pockSound = document.getElementById('pockSound');
    const playButton = document.getElementById('playButton');
    const howToPlayButton = document.getElementById('howToPlayButton');
    const backgroundAudio = document.getElementById('backgroundAudio');

    if (backgroundAudio) {
        backgroundAudio.volume = 0.2; 
        backgroundAudio.loop = true; 
        backgroundAudio.play().catch(err => console.log('Background audio play error:', err));
    }

    if (bgSound) {
        bgSound.volume = 0.2;
        bgSound.loop = true;
        bgSound.play().catch(err => console.log('Audio play error:', err));
    }

    if (clickSound) {
        clickSound.volume = 0.9;
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = formatTime(elapsedTime);

        if (elapsedTime >= 60) {
            stopTimer();
            window.location.href = 'timesup.html'; 
        }
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

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
        clickSound.play().catch(err => console.log('Click sound error:', err));
        
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
                goofyCardSound.play().catch(err => console.log('Goofy sound error:', err));
            }
            if (firstCardImage === 'https://i.postimg.cc/tJWBnwHw/spongedrunk.webp') {
                drunkSound.play().catch(err => console.log('Drunk sound error:', err));
            }
            if (firstCardImage === 'https://i.postimg.cc/6qPzSKf8/krusty-booty.jpg') {
                bootySound.play().catch(err => console.log('Booty sound error:', err));
            }
            if (firstCardImage === 'https://i.postimg.cc/zBGG2YBZ/squad.webp') {
                squadSound.play().catch(err => console.log('Squad sound error:', err));
            }
            if (firstCardImage === 'https://i.postimg.cc/9MGxrs2S/patricksplits.jpg') {
                patstripSound.play().catch(err => console.log('Patstrip sound error:', err));
            }
            if (firstCardImage === 'https://i.postimg.cc/441Y1wxT/scream.jpg') {
                screamSound.play().catch(err => console.log('Scream sound error:', err));
            }
            if (firstCardImage === 'https://i.postimg.cc/GhWnTnn3/mockery.jpg') {
                pockSound.play().catch(err => console.log('Pock sound error:', err)); 
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

    //CHATP GPT BELOW
        if (matchedPairs === 8) {
            stopTimer();
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000); 
            localStorage.setItem('elapsedTime', elapsedTime); 

            // Retrieve the best time from localStorage
            let bestTime = localStorage.getItem('bestTime');

            if (bestTime === null || elapsedTime < bestTime) {
                // Update the best time if the current time is better
                localStorage.setItem('bestTime', elapsedTime);
            }

            setTimeout(() => {
                window.location.href = 'gameover.html';
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
