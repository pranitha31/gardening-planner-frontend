# 🌿 Gardening  Planner

## 📖 Overview

The Gardening  Planner is a responsive web application built to help users manage plants, schedule reminders, and plan seasonal activities with real-time weather insights.

It connects seamlessly with the Weather Planner Backend API and provides a secure, user-friendly interface with protected routes and dynamic weather updates.

This project demonstrates modern frontend development practices using component-based architecture.

---

## 🚀 Features

- 🔐 User Authentication (Login / Register)
- 🌱 Plant Management Dashboard
- 📅 Reminder Scheduling Interface
- 🌤️ Seasonal Planner View
- ⛅ Real-time Weather Display
- 🔒 Protected Routes (Authentication-based Access)
- 📱 Fully Responsive UI

---

## 🛠 Tech Stack

| Category | Technology |
|------------|------------|
| Framework | React.js |
| Routing | React Router DOM |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| API Handling | Fetch / Axios |
| State Management | React Hooks |
| Deployment | Netlify |

---

## 🏗 Application Architecture

The frontend follows a modular structure:

- **Pages** – Major route-based components
- **Components** – Reusable UI elements
- **Services** – API calls
- **Protected Routes** – Authentication guard logic
- **Sidebar Layout** – Dashboard navigation structure

---

## 📂 Project Structure

```
frontend/
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Plants.jsx
│   │   ├── Reminders.jsx
│   │   └── SeasonalPlanner.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── vite.config.js (if using Vite)
```

---

# 🔐 Authentication Flow

1. User logs in or registers
2. JWT token is stored in localStorage
3. ProtectedRoute checks authentication
4. Unauthorized users are redirected to Login page
5. Logout clears token and redirects to Login

---

# 🌦 Weather Integration

- Fetches real-time weather data from backend
- Displays temperature, conditions, and forecast
- Handles loading and error states

---

# ⚙ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/weather-planner-frontend.git
cd weather-planner-frontend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables (if required)

Create `.env` file:

```
VITE_API_BASE_URL=http://localhost:5000
```

---

### 4️⃣ Start Development Server

```bash
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

# 🌍 Deployment

Frontend Deployment Link:

```
https://your-frontend-deployment-link.netlify.app
```

---

# 🔒 Security Considerations

- Token-based authentication
- Protected client-side routing
- Secure API communication
- Environment variable configuration

---

# 📈 Future Enhancements

- Dark Mode
- Toast Notifications
- Improved Weather UI Animations
- State Management with Context API
- API Error Boundary Handling
- Performance Optimization

---

##Check it out Demo
https://jade-alfajores-67b1cd.netlify.app/

---

# 👩‍💻 Developer

Computer Science Engineering Student  
Focused on Full Stack Web Development & UI Architecture  

---

## 📄 License

This project is built for educational and portfolio purposes.
