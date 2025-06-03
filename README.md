# 🚀 Bug-Buster: Online Coding Platform

Welcome to **Bug-Buster**, a sleek and interactive online coding platform where users can solve coding problems, track progress, and compete on the leaderboard!

![Bug-Buster Banner](https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format\&fit=crop\&w=1950\&q=80)

---

## 📌 Table of Contents

* [About](#about)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Screenshots](#screenshots)
* [Getting Started](#getting-started)
* [API Endpoints](#api-endpoints)
* [Project Structure](#project-structure)
* [Meet the Creator](#meet-the-creator)
* [License](#license)

---

## 🧠 About

**Bug-Buster** is designed for aspiring programmers to:

* Practice competitive coding
* Track their progress
* View global rankings
* Build a habit of problem solving

This platform is tailored for learners and recruiters to see real-time engagement with code.

---

## ✨ Features

* 🔐 **JWT Authentication** (Login/Register)
* 🧮 **Problem List with Tags & Difficulty**
* 💻 **Online Code Editor** with Output
* 📈 **Live Leaderboard** based on questions solved
* 📝 **Submissions History**
* 🎨 **Fully Responsive UI with Dynamic Effects**
* 🔎 **Meet the Creator** section with portfolio

---

## 🛠️ Tech Stack

### 🔹 Frontend:

* React.js
* Tailwind CSS
* React Router DOM

### 🔹 Backend:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT for auth

### 🔹 DevOps:

* Docker (for containerization)
* AWS EC2 (for hosting backend)
* AWS ECR (for container image storage)

---

## 📸 Screenshots

### 🏠 Home Page

![Home](https://your-screenshot-link)

### 📑 Problem List

![Problems](https://your-screenshot-link)

### 🧑‍💻 Solve Problem Page

![Solve](https://your-screenshot-link)

### 🏆 Leaderboard

![Leaderboard](https://your-screenshot-link)

### 👤 Profile

![Profile](https://your-screenshot-link)

---

## ⚙️ Getting Started

### 🧾 Prerequisites

* Node.js (v20+)
* MongoDB (local or cloud)
* Docker (optional)

### 🔧 Clone the Repository

```bash
git clone https://github.com/PAMBAK-AAT/Bug-Buster.git
cd bug-buster
```

### 🔨 Install Dependencies

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

### ⚙️ Environment Variables

Create `.env` files in both frontend and backend:

#### 📁 `backend/.env`

```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
```

#### 📁 `frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:3000
```

### ▶️ Run the App

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

Visit: `http://localhost:5173`

---

## 📡 API Endpoints (Backend)

| Method | Route              | Description      |
| ------ | ------------------ | ---------------- |
| POST   | `/api/register`    | Register user    |
| POST   | `/api/login`       | Login user       |
| GET    | `/api/profile`     | Fetch user info  |
| GET    | `/api/problemList` | Get all problems |
| POST   | `/api/submit`      | Submit solution  |
| GET    | `/api/submissions` | Get submissions  |
| GET    | `/api/leaderboard` | Get top users    |

---

## 🗂️ Project Structure

```
/bug-buster
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   └── main.jsx
│   └── public
│       └── logo.svg
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   └── server.js
```

---

## 🙋‍♂️ Meet the Creator

> 👨‍💻 **Mohd Arshad**
> Passionate Full Stack Developer and Competitive Programmer.
> [Codeforces](https://codeforces.com/profile/pambak786) | [LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com/yourusername)

---

## 📄 License

This project is licensed under the MIT License. You are free to use, modify, and distribute.

---

> ⭐ **If you like this project, give it a star and share it with your friends!**
