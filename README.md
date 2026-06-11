# CareDesk — Hospital Management System

A full-stack hospital management web application with a patient-facing portal and a separate admin dashboard. Built with React, Node.js, Express, and MongoDB.

---

## What It Does

**Patient Portal** — allows patients to:
- Register and log in securely
- Book appointments by choosing a department and doctor
- Send messages/inquiries to the hospital
- View available departments (Pediatrics, Cardiology, Neurology, etc.)

**Admin Dashboard** — allows admins to:
- Log in with a secured admin account
- View and manage all appointments (update status: Pending / Accepted / Rejected)
- View all registered doctors with their details
- Add new doctors (with photo upload via Cloudinary)
- Add new admin accounts
- Read messages sent by patients

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend (Patient) | React + Vite |
| Frontend (Admin) | React + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Image Upload | Cloudinary |
| Notifications | Notistack / React Toastify |
| Routing | React Router Dom |

---

## Project Structure

```
CareDesk/
├── Backend/
│   ├── config/          # Environment config
│   ├── controller/      # Route handlers
│   ├── database/        # MongoDB connection
│   ├── middlewares/     # Auth middleware
│   ├── model/           # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper utilities
│   └── server.js
├── Frontend/            # Patient portal
│   └── src/
│       ├── components/  # Hero, Navbar, Footer, Departments, Forms
│       ├── pages/       # Home, Appointment, AboutUs, Login, Register
│       └── App.jsx
└── Dashboard/           # Admin panel
    └── src/
        ├── components/  # Dashboard, Sidebar, Doctors, Messages, Forms
        └── App.jsx
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Cloudinary](https://cloudinary.com/) account (for doctor photo uploads)

### 1. Clone the repo

```bash
git clone https://github.com/ArpitSingh4010/CareDesk.git
cd CareDesk
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create `Backend/config/config.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES=7d
COOKIE_EXPIRE=7
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174
```

```bash
npm run dev
```

### 3. Setup Frontend (Patient Portal)

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:
```env
VITE_BACKEND_URL=http://localhost:5000
```

```bash
npm run dev
# Runs on http://localhost:5173
```

### 4. Setup Dashboard (Admin Panel)

```bash
cd Dashboard
npm install
```

Create `Dashboard/.env`:
```env
VITE_BACKEND_URL=http://localhost:5000
```

```bash
npm run dev
# Runs on http://localhost:5174
```

### 5. Create the first admin account

```bash
cd Backend
node createAdmin.js
```

Then log in at `http://localhost:5174/login`.

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/patient/register` | Register a patient |
| POST | `/api/v1/user/patient/login` | Patient login |
| GET | `/api/v1/user/patient/me` | Get logged-in patient |
| GET | `/api/v1/user/patient/logout` | Patient logout |
| POST | `/api/v1/user/admin/login` | Admin login |
| POST | `/api/v1/user/admin/add` | Add new admin |
| POST | `/api/v1/user/doctor/add` | Add new doctor |
| GET | `/api/v1/user/doctors` | Get all doctors |
| POST | `/api/v1/appointment/book` | Book appointment |
| GET | `/api/v1/appointment/getall` | Get all appointments (admin) |
| PUT | `/api/v1/appointment/update/:id` | Update appointment status |
| POST | `/api/v1/message/send` | Send a message |
| GET | `/api/v1/message/receive` | Get all messages (admin) |

---

## Deployment

The project is configured for deployment on [Vercel](https://vercel.com/). Each of the three parts (Backend, Frontend, Dashboard) has its own `vercel.json`.
