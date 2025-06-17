# Platformatory-Labs

## 🔹 Full-Stack Profile App with Temporal, OIDC, MongoDB, and React

---

## 🌟 Overview

This project demonstrates a **full-stack application** where:

- **Users authenticate** with **OpenID Connect (OIDC)**.
- **View and edit their profile** (First Name, Last Name, Phone, City, Pincode).
- **Profile updates are processed by a Temporal workflow**, first saving to **MongoDB**, then after **10-second delay**, syncing to **crudcrud.com API**.
- **React + TypeScript** for the frontend UI.
- **Node.js + Express + TypeScript** for the backend API.
- **Docker Compose** to spin up services quickly.

---

## 🔹 Tech Stack

✅ **OpenID Connect (Auth)**  
✅ **Temporal (Workflow orchestration)**  
✅ **React + TypeScript (Client)**  
✅ **Node.js + Express + TypeScript (API)**  
✅ **MongoDB (Primary datastore)**  
✅ **crudcrud.com (External API)**  
✅ **Docker Compose (Orchestrate services)**  

---

## 🔹 Prerequisites

- Docker and Docker Compose installed
- Node.js v16+ installed
- Access to a **OpenID Provider** (Auth0, Google, etc.)
- CRUDCRUD API endpoint (https://crudcrud.com/) — Signup to get your API key
- A **running or Cloud** MongoDB

---

## 🔹 Installation & Run (Locally)

### 1️⃣ Clone the repository:

```bash
git clone https://github.com/ravithejagolla/Platformatory-Labs
cd Platformatory-Labs

Platformatory-Labs/
├── backend/
│  ├─ app.js
│  │─ activities/
│  ├─ database/
│  ├─ dist/
│  ├─ worker/
│  └─ workflows/
|  |-.dockerignore
│ ├─ package.json
│ └─ Dockerfile
│
├── frontend/
│ ├─ tempor/
│ │ ├─ components/
│ │ ├─ pages/
│ │ └─ App.jsx
| | |-Profile.jsx
│ ├─ package.json
│ └─ Dockerfile
├── .gitignore
├── README.md

# Backend
 cd backend
npm install
npm run dev

# Frontend
cd frontend/temporal.io
npm install
npm start




