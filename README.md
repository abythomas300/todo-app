# 📝 Todo App

A full-stack task management application built with a **Vite + React** frontend and an **Express.js + PostgreSQL** backend. Deployed on **Render**, **Railway**, and **NeonDB**.

---

## 🚀 Live Demo

### 🔹 Frontend  
https://todo-app-frontend-qylu.onrender.com/

### 🔹 Backend API  
https://todo-app-production-a911.up.railway.app/tasks

---

## 📸 Screenshot

<img width="1211" height="879" alt="Screenshot 2025-12-05 152406" src="https://github.com/user-attachments/assets/57058092-2e5c-4487-a957-2dc3318c6d06" />

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Responsive UI

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon)
- pg library
- REST API architecture

### Deployment
- Frontend: Render
- Backend: Railway
- Database: Neon PostgreSQL Cloud

---

## ✨ Features

- Add new tasks  
- View tasks  
- Mark tasks as completed  
- Edit tasks  
- Delete tasks  
- Fully functional REST API  
- Simple and clean UI  
- Responsive design  

---

## 📁 Project Structure

```
todo-app/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── app.js
|   ├── db.js
|   ├── .gitignore
|   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── src/
    ├── .gitignore
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── package-lock.json
```


---

## 📡 API Endpoints

### Base URL
https://todo-app-production-a911.up.railway.app


### Endpoints

| Method | Endpoint      | Description              |
|--------|----------------|-------------------------|
| GET    | /tasks         | Fetch all tasks         |
| POST   | /tasks         | Create a new task       |
| PUT    | /tasks/:id     | Mark task as completed  |
| PUT    | /tasks         | Update a task           |
| DELETE | /tasks/:id     | Delete a task           |

---

## 🛠️ Installation & Setup (Local Development)

###  Clone the Repository
```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Backend Setup

```
cd backend
npm install
```

### Create .env

```
DATABASE_URL=your_neon_postgres_url
PORT=your_port
```

### Run backend
```
npm start

```

### Frontend Setup
```
cd ../frontend
npm install

```
run frontend
```
npm run client
```


### Build for production
Frontend
```
npm run build
```

Backend
Deployed automatically on Railway.


### Deployment Notes
- Frontend build output: frontend/dist
- Render publish directory: frontend/dist
- Backend auto-deploy via Railway on git push
- CORS configured for frontend domain
