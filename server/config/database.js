const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mysql_crud',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Function to initialize database and tables
const initializeDatabase = async () => {
  let connection;
  try {
    // First connect without specifying database to create it if it doesn't exist
    const tempConfig = { ...dbConfig };
    delete tempConfig.database;
    
    connection = await mysql.createConnection(tempConfig);
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'mysql_crud'}`);
    console.log(`✅ Database '${process.env.DB_NAME || 'mysql_crud'}' is ready`);
    
    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || 'mysql_crud'}`);
    
    // Create contacts table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        age INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;
    
    await connection.query(createTableQuery);
    console.log('✅ Contacts table created/verified successfully');
    
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connection successful');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  initializeDatabase,
  testConnection
};
