// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

let latestLocation = { latitude: null, longitude: null };

// Endpoint to update location
app.post('/', (req, res) => {
    const { latitude, longitude } = req.body;
    latestLocation = { latitude, longitude };
    res.sendStatus(200);
});

// Serve location data to clients
app.get('/', (req, res) => {
    res.json(latestLocation);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
