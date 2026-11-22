import express, { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swagger';
import { errorHandler } from './middlewares/errorMiddleware';

// ============================================================================
// Environment Configuration (Local & Production Support)
// ============================================================================
const nodeEnv = process.env.NODE_ENV || 'development';

// Search locations for env files: CWD, backend directory, and workspace root
const envSearchDirs = [
  process.cwd(),
  path.resolve(__dirname, '..'),
  path.resolve(__dirname, '../..'),
];

// 1. Try loading environment-specific file (.env.development, .env.production, etc.)
let loadedEnvFile: string | null = null;
for (const dir of envSearchDirs) {
  const envSpecificPath = path.resolve(dir, `.env.${nodeEnv}`);
  if (fs.existsSync(envSpecificPath)) {
    dotenv.config({ path: envSpecificPath });
    loadedEnvFile = envSpecificPath;
    break;
  }
}

// 2. Load or fallback to default .env file
for (const dir of envSearchDirs) {
  const defaultEnvPath = path.resolve(dir, '.env');
  if (fs.existsSync(defaultEnvPath)) {
    dotenv.config({ path: defaultEnvPath });
    if (!loadedEnvFile) loadedEnvFile = defaultEnvPath;
    break;
  }
}

// Default NODE_ENV if not explicitly specified
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = nodeEnv;
}

// Connect to Database (auto-creates database and collections as per code)
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

// Swagger API Documentation UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Friendly redirects so /docs or /swagger also open Swagger UI
app.get(['/docs', '/swagger'], (_req, res) => res.redirect('/api-docs'));

// Mounting routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// Central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Swagger API Docs: http://localhost:${PORT}/api-docs`);
  if (loadedEnvFile) {
    console.log(`Environment configuration loaded from: ${loadedEnvFile}`);
  }
});
