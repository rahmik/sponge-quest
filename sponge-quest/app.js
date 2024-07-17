document.addEventListener('DOMContentLoaded', function() {
    // JavaScript for handling button clicks
    document.getElementById('playButton').addEventListener('click', function() {
        // Redirect to the game page when the play button is clicked
        window.location.href = 'game.html';
    });

    document.getElementById('howToPlayButton').addEventListener('click', function() {
        // Redirect to the how to play page when the how to play button is clicked
        window.location.href = 'howtoplay.html';
    });
});
