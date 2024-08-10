require('dotenv').config();

const express = require('express');
const path = require('path');
const { createClient } = require('redis');

const app = express();
const client = createClient();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
const cors =  require("cors");
app.use(express.json());
app.options("*", cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { apiKey: process.env.API_KEY });
});

app.post('/update-location', async (req, res) => {
  const { latitude, longitude } = req.body;
  await client.set('location', JSON.stringify({ latitude, longitude }));
  res.sendStatus(200);
});

app.get('/location', async (req, res) => {
  const locationData = await client.get('location');
  latestLocation = JSON.parse(locationData);
  res.json(latestLocation);
});

app.listen(port, async () => {
    await client.connect();
    console.log(`Server running at http://localhost:${port}`);
});

