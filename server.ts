import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import { createClient, RedisClientType } from 'redis';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const client = createClient();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
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

app.get('/', (req: Request, res: Response) => {
  res.render('index', { apiKey: process.env.API_KEY });
});

app.post('/update-location', async (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;
  await client.set('location', JSON.stringify({ latitude, longitude }));
  res.sendStatus(200);
});

app.get('/location', async (req: Request, res: Response) => {
  const locationData = await client.get('location');
  const latestLocation = locationData ? JSON.parse(locationData) : null;
  res.json(latestLocation);
});

app.listen(port, async () => {
  await client.connect();
  console.log(`Server running at http://localhost:${port}`);
});
