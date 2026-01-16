const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Import routes
const templateRoutes = require('./routes/templateRoutes');
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const bankInfoRoutes = require('./routes/bankInfoRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'BangZaky Portfolio API',
    version: '1.0.0',
    endpoints: {
      templates: '/api/templates',
      users: '/api/users',
      purchases: '/api/purchases',
      bankInfo: '/api/bank-info'
    }
  });
});

// API Routes
app.use('/api/templates', templateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/bank-info', bankInfoRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;