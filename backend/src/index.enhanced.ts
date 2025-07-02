import express, { Request, Response, Application } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

// Import configurations and middleware
import connectDB from './config/database';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';
import { generalLimiter, authLimiter, apiLimiter } from './middleware/rateLimiter';

// Import routers
import { productRouter } from "./routers/productRouter";
import { seedRouter } from './routers/seedRouter';
import { userRouter } from './routers/userRouter';
import { orderRouter } from './routers/orderRouter';
import { keyRouter } from './routers/keyRouter';

// Load environment variables
dotenv.config();

const app: Application = express();

// Security Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.paypal.com", "https://www.sandbox.paypal.com"]
    }
  }
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL?.split(',') || ['https://your-domain.com']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', apiLimiter);
app.use('/api/users/signin', authLimiter);
app.use('/api/users/signup', authLimiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/seed', seedRouter);
app.use('/api/key', keyRouter);

// Serve static files from React build (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  // Handle React Router routes
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
} else {
  app.get('/', (req: Request, res: Response) => {
    res.json({
      success: true,
      message: 'E-commerce API is running!',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    });
  });
}

// 404 handler for unknown routes
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

// Start server function
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDB();
    
    // Start server
    const PORT: number = parseInt((process.env.PORT || '5000') as string, 10);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
      if (process.env.NODE_ENV !== 'production') {
        console.log(`🔗 API Docs: http://localhost:${PORT}/api`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('🚨 Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('🚨 Uncaught Exception:', err.message);
  process.exit(1);
});

// Start the server
startServer();

export default app;
