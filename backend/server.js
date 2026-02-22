require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listings');
const reviewRoutes = require('./routes/reviews');
const bookingRoutes = require('./routes/bookings');
const imageRoutes = require('./routes/images');
const adminRoutes = require('./routes/admin');

const app = express();

console.log('🚀 Starting StayIndia Backend...');
console.log('📍 Environment:', process.env.NODE_ENV || 'development');
console.log('📍 Port:', process.env.PORT || 5000);

// Connect to MongoDB
connectDB();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://hotel-booking-stayindia.onrender.com',
  'https://hotel-booking-stayindia-2.onrender.com',
  'https://hotel-booking-stayindia-3.onrender.com',
  process.env.FRONTEND_URL
].filter(Boolean);

console.log('🔐 Allowed CORS origins:', allowedOrigins);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman, curl, mobile apps)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(null, true); // Allow all origins for now
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true, // Always true for production
    sameSite: 'none', // Required for cross-domain cookies
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
  },
  proxy: true // Trust proxy for secure cookies
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (_req, res) => {
  res.json({ 
    message: 'StayIndia API',
    version: '1.0.0',
    status: 'running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Server running on port', PORT);
  console.log('✅ Environment:', process.env.NODE_ENV || 'development');
  console.log('✅ Server is ready to accept connections');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

// Keep the process alive
process.on('SIGINT', () => {
  console.log('⚠️  SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;
