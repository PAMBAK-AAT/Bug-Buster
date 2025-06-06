# 🚀 Bug-Buster: Online Coding Platform

Welcome to **Bug-Buster**, an interactive online coding platform where users can solve 50+ top interview DSA problems and compete on a global leaderboard! Whether you're a student, job-seeker, or coding enthusiast, Bug-Buster is designed to level up your skills with real-time problem solving.

---

## 📌 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Planned Features](#planned-features)
- [Meet the Creator](#meet-the-creator)
- [License](#license)

---

## 🧠 About

**Bug-Buster** is an online platform that enables:

- 👨‍💻 Practice of 50+ curated DSA problems  
- 🏆 Leaderboard-based competition  
- 📊 Real-time coding engagement  
- 📚 Helpful UI to track problem-solving progress  

Perfect for both learners and recruiters who want to see coding consistency and problem-solving skills in action.

---

## ✨ Features

- 🔐 JWT-based **Authentication** (Register/Login)  
- 🧮 **DSA Problem List** with tags, difficulty, and description  
- 💻 **Online Code Editor** with instant output  
- 📈 **Live Leaderboard** based on problem submissions    
- 🧑‍💻 **User Profile** with stats and history  
- 🎨 **Responsive & Animated UI** using Tailwind  
- 🔍 **Meet the Creator** section with direct links  
- 🧪 Tested with 20+ edge cases per problem  

---

## 🛠️ Tech Stack

### 🔹 Frontend:
- React.js  
- Tailwind CSS  
- React Router DOM  

### 🔹 Backend:
- Node.js  
- Express.js  

### 🔹 Database:
- MongoDB Atlas  
- Mongoose  

### 🔹 DevOps:
- Docker (for containerization)  
- AWS EC2 (for backend hosting)  
- AWS ECR (for Docker image storage)  

---

## 📸 Screenshots

![Home Page](https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1950&q=80)

---

## ⚙️ Getting Started

### 📋 Prerequisites

- Node.js (v20+)  
- MongoDB (Cloud/Local)  
- Docker (Optional for deployment)  

### 🚀 Clone the Repository

```bash
git clone https://github.com/PAMBAK-AAT/Bug-Buster.git
cd Bug-Buster
```

### 📦 Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 🧩 Environment Setup

Create `.env` files in both `frontend/` and `backend/`.

#### backend/.env

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### frontend/.env

```env
VITE_BACKEND_URL=http://localhost:3000
```

### ▶️ Run Locally

```bash
# Start backend
cd backend
node index.js

# Start frontend
cd ../frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📡 API Endpoints (Backend)

| Method | Route              | Description        |
|--------|--------------------|--------------------|
| POST   | `/api/register`    | Register user      |
| POST   | `/api/login`       | Login user         |
| GET    | `/api/profile`     | Get user info      |
| GET    | `/api/problemList` | Fetch all problems |
| POST   | `/api/submit`      | Submit a solution  |
| GET    | `/api/leaderboard` | Global leaderboard |

---

## 🗂️ Project Structure

```
/Bug-Buster
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── utils
│   │   └── main.jsx
│   └── public
│       └── logo.svg
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   └── index.js
```

---

## 🚀 Planned Features

- ✅ Submission History
- ✅ Add solved in the problem that has been already solved.
- ✅ Admin Dashboard (Add/Edit Problems)   
- ✅ Multi-language Support (Python, Java, etc.)  

---

## 🙋‍♂️ Meet the Creator

> 👨‍💻 **Mohd Arshad**  
> Passionate Full Stack Developer | Problem Solver  
>  
> 🔗 [Leetcode](https://leetcode.com/u/Pam_Bak_786/)  
> 🔗 [LinkedIn](https://www.linkedin.com/in/mohd-arshad-292a47278/)  
> 🔗 [GitHub](https://github.com/PAMBAK-AAT?tab=repositories)  

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute for personal or commercial purposes.

---

> ⭐ If you liked this project, **star** it, **fork** it, and share it with your developer friends!

