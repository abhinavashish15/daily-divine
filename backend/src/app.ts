import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { sendError } from './utils/response';
import { MESSAGES } from './constants';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Routes
app.use('/api', routes);

// Ping Route for Keep-Awake
app.get('/api/ping', (req, res) => {
  res.status(200).send('pong');
});

// 404 Handler
app.use((req, res) => {
  sendError(res, 'Route not found', 404);
});

// Global Error Handler
app.use(errorHandler);

export default app;
