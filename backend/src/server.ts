import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import carExpenseRoutes from './routes/carExpenseRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app: Application = express();

// Body Parser Middleware
app.use(express.json());

// CORS Middleware
app.use(cors());

// HTTP Request Logging Middleware (Morgan) in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Car Expenses API is running (TS)' });
});

// Mounting routes
app.use('/api/expenses', carExpenseRoutes);
app.use('/api/auth', authRoutes);

// Central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
