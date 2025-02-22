const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple song mapping based on emotions
const songMap = {
    "happy": {
        name: "Happy - Pharrell Williams",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with actual song URL
    },
    "sad": {
        name: "Abhi Na Jao - Asha Bhosle and Mohammed Rafi", // Update with the artist's name if known
        url: "http://localhost:5000/music/Abhi%20Na%20Jao.mp3" // Local path to the song
    },
    "angry": {
        name: "Break Stuff - Limp Bizkit",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" // Replace with actual song URL
    },
    "love": {
        name: "Perfect - Ed Sheeran",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" // Replace with actual song URL
    }
};

// Endpoint to get song based on emotion
app.post('/getSong', (req, res) => {
    const emotion = req.body.emotion.toLowerCase();
    const song = songMap[emotion];

    if (song) {
        res.json(song);
    } else {
        res.status(404).json({ message: "No song found for this emotion." });
    }
});

// Serve static files (like mp3)
app.use('/music', express.static(path.join(__dirname)));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});