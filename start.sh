#!/bin/bash

echo "🚀 Starting MySQL CRUD Application..."

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "❌ MySQL is not running. Please start MySQL server first."
    echo "   On macOS: brew services start mysql"
    echo "   On Ubuntu: sudo systemctl start mysql"
    exit 1
fi

echo "✅ MySQL is running"

# Create .env file if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating .env file..."
    cat > server/.env << EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mysql_crud
PORT=5000
NODE_ENV=development
EOF
    echo "✅ .env file created"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Terminal 1: cd server && npm run dev"
echo "2. Terminal 2: cd client && npm run dev"
echo ""
echo "Then visit: http://localhost:5173"
