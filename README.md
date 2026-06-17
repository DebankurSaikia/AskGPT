# 🤖 AskGPT – Full Stack AI Chat Application

AskGPT is a modern, full-stack AI chatbot application inspired by ChatGPT. It provides a clean conversational interface, secure user authentication, persistent chat history, and AI-powered responses using Google's Gemini API.

The project is built using the MERN stack and follows a monorepo architecture with separate frontend and backend applications. Users can create accounts, manage conversations, revisit previous chats, and interact with an AI assistant in real time.


## 🌐 Live Demo

🔗 **Live Application:** https://askgpt-mu.vercel.app

---

## ✨ Features

### 🔐 Authentication & Security
- User Registration and Login
- JWT-based Authentication
- Protected Routes
- Persistent User Sessions
- Secure Password Hashing using bcrypt

### 💬 AI Chat Experience
- ChatGPT-inspired user interface
- Google Gemini API integration
- Real-time AI responses
- Create unlimited chat conversations
- Thread-based conversation management

### 📚 Chat History
- Persistent chat storage in MongoDB Atlas
- View previous conversations
- Open old chat threads anytime
- Delete conversations
- Automatic thread organization

### 🎨 Modern UI/UX
- Responsive dark theme
- Collapsible ChatGPT-style sidebar
- User profile dropdown
- User initials avatar
- Interactive tooltips
- Auto-growing chat input
- Loading indicators

### ☁️ Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- MongoDB Atlas cloud database
- Environment-based configuration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API
- Vite
- Fetch API
- CSS3
- Font Awesome

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- CORS
- dotenv

### AI Integration
- Google Gemini API

### Database
- MongoDB Atlas

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```text
AskGPT/
│
├── Backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── chatController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Thread.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── chat.js
│   │
│   ├── utils/
│   │   └── geminiai.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Key Functionalities

### User Authentication
- Register a new account
- Login securely
- Logout functionality
- JWT token management
- Protected chat routes

### Chat Management
- Start new chats
- Continue existing conversations
- Save chat history
- Delete conversations
- Load previous messages

### AI Integration
- Gemini API-powered responses
- Context-aware conversations
- Fast response generation

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=8080

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Production (Vercel)

```env
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
```

---

## 🏃‍♂️ Running Locally

### 1. Clone Repository

```bash
git clone https://github.com/DebankurSaikia/AskGPT.git

cd AskGPT
```

### 2. Setup Backend

```bash
cd Backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:8080
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd Frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---


## 🚧 Future Improvements

- File Upload Support
- Voice Input Integration
- Light/Dark Theme Toggle
- Chat Search Functionality
- Message Streaming
- Markdown Rendering
- Code Syntax Highlighting
- Chat Export Feature
- AI Model Switching
- User Profile Settings

---

## 📈 Learning Outcomes

This project helped explore:

- Full Stack MERN Development
- REST API Design
- JWT Authentication
- MongoDB Data Modeling
- React Context API
- Protected Routes
- Deployment & DevOps
- Environment Variables
- CORS Configuration
- AI API Integration
