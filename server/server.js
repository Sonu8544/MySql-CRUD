const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { pool, initializeDatabase, testConnection } = require('./config/database');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 7777;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api', contactsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    console.log('🚀 Starting MySQL CRUD Server...');
    
    // Initialize database and tables
    await initializeDatabase();
    
    // Test database connection
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }
    
    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📊 Database: mysql_crud`);
      console.log(`🔗 API Endpoints:`);
      console.log(`   GET    /api/contacts`);
      console.log(`   POST   /api/contacts/create`);
      console.log(`   PUT    /api/contacts/edit/:id`);
      console.log(`   DELETE /api/contacts/:id`);
      console.log(`   GET    /api/contacts/search/:query`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  await pool.end();
  process.exit(0);
});

startServer();
