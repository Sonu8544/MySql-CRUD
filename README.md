# MySQL CRUD Application

A full-stack contact management application built with React, Node.js, Express, and MySQL. Features automatic database creation, comprehensive CRUD operations, and a modern responsive UI.

## 🚀 Features

- **Automatic Database Creation**: Database and tables are created automatically on first run
- **Complete CRUD Operations**: Create, Read, Update, Delete contacts
- **Advanced Search**: Search contacts by name, email, or phone number
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Validation**: Form validation with error handling
- **Professional Error Handling**: Comprehensive error management
- **Statistics Dashboard**: Contact statistics and analytics
- **Confirmation Dialogs**: Safe delete operations with confirmation

## 📋 Contact Fields

- **Name**: Full name (required)
- **Email**: Email address with validation (required, unique)
- **Phone**: Phone number (required)
- **Age**: Age with validation (required, 0-150)

## 🛠️ Tech Stack

### Backend
- Node.js & Express
- MySQL with mysql2 driver
- Automatic database initialization
- RESTful API design
- CORS enabled
- Environment configuration

### Frontend
- React 19
- Tailwind CSS for styling
- Axios for API calls
- Modern component architecture
- Responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd /Users/sonukumar12031995/Documents/MySql-CRUD
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the server directory:
   ```bash
   cd ../server
   touch .env
   ```
   
   Add the following content to `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=mysql_crud
   PORT=5000
   ```

5. **Start the application**

   **Terminal 1 - Start the server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start the client:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:7777

## 📊 Database Schema

The application automatically creates the following database structure:

### Database: `mysql_crud`
### Table: `contacts`

| Field | Type | Constraints |
|-------|------|-------------|
| id | INT | AUTO_INCREMENT PRIMARY KEY |
| name | VARCHAR(255) | NOT NULL |
| email | VARCHAR(255) | UNIQUE NOT NULL |
| phone | VARCHAR(20) | NOT NULL |
| age | INT | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Get all contacts |
| GET | `/api/contacts/:id` | Get single contact |
| POST | `/api/contacts/create` | Create new contact |
| PUT | `/api/contacts/edit/:id` | Update contact |
| DELETE | `/api/contacts/:id` | Delete contact |
| GET | `/api/contacts/search/:query` | Search contacts |
| GET | `/api/health` | Health check |

## 🎯 Usage

### Adding a Contact
1. Click the "Add Contact" button
2. Fill in the required fields (name, email, phone, age)
3. Click "Add Contact" to save

### Editing a Contact
1. Click the "Edit" button on any contact card
2. Modify the fields as needed
3. Click "Update Contact" to save changes

### Deleting a Contact
1. Click the "Delete" button on any contact card
2. Confirm the deletion in the modal dialog

### Searching Contacts
1. Use the search bar to find contacts by name, email, or phone
2. Click "Clear" to reset the search

## 🔒 Security Features

- Input validation and sanitization
- SQL injection prevention with parameterized queries
- Email format validation
- Age range validation
- Unique email constraint
- Error handling without exposing sensitive information

## 🚀 Production Deployment

### Environment Variables
```env
NODE_ENV=production
DB_HOST=your_production_host
DB_USER=your_production_user
DB_PASSWORD=your_production_password
DB_NAME=mysql_crud
PORT=7777
```

### Build Commands
```bash
# Build client for production
cd client
npm run build

# Start server in production
cd server
npm start
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL server is running
   - Check database credentials in `.env`
   - Verify database user has proper permissions

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing processes on the port

3. **CORS Issues**
   - Ensure server is running on correct port
   - Check API base URL in client configuration

## 📝 Development Notes

- Database is automatically created on first run
- Tables are created with proper indexes for performance
- All API responses follow consistent format
- Error handling provides user-friendly messages
- Component architecture follows React best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ by Sonu Kumar**
