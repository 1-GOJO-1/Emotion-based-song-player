document.getElementById('submitEmotion').addEventListener('click', function () {
    const emotionInput = document.getElementById('emotionInput').value;
    const songSuggestion = document.getElementById('songSuggestion');
    const audioPlayer = document.getElementById('audioPlayer');

    fetch('http://localhost:5000/getSong', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emotion: emotionInput })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('No song found for this emotion.');
            }
            return response.json();
        })
        .then(song => {
            songSuggestion.innerHTML = `<p>🎵 Suggested Song: <strong>${song.name}</strong></p>`;
            audioPlayer.src = song.url;
            audioPlayer.style.display = 'block';
            audioPlayer.play();
        })
        .catch(error => {
            songSuggestion.innerHTML = `<p>${error.message}</p>`;
            audioPlayer.style.display = 'none';
        });
});