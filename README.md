# Business Finances Management System

A full-stack **Business Finances Management System** designed to help businesses track transactions, manage employees, analyze financial data, and gain actionable insights through a modern admin dashboard.

This project consists of a **FastAPI backend** and a **Next.js admin dashboard**, built with scalability, security, and real-world usage in mind.

---

## 🚀 Features

### Backend (FastAPI)
- Authentication & authorization
- Admin and employee role management
- Transaction processing & storage
- OCR-based receipt/text extraction
- Language detection & processing
- Supabase integration for database & storage
- Modular service-based architecture

### Admin Dashboard (Next.js)
- Secure admin login
- Financial summaries & reports
- Store management
- Employee management
- Monthly analytics views
- Clean, responsive UI

---

## 🧱 Tech Stack

### Backend
- **Python**
- **FastAPI**
- **Supabase**
- **JWT Authentication**
- **OCR & text extraction services**

### Frontend
- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **ESLint**
- **Modern component architecture**

---

## 📁 Project Structure

business-finances-management-system/
│
├── Store_FastAPI/
│ └── backend/
│ └── app/
│ ├── core/ # Auth, guards, Supabase clients
│ ├── models/ # Data models
│ ├── routers/ # API routes
│ ├── services/ # Business logic
│ ├── config.py # App configuration
│ └── main.py # FastAPI entry point
│
├── admin-dashboard/
│ ├── src/
│ │ ├── app/ # Next.js app routes
│ │ └── components/ # UI components
│ ├── public/
│ └── package.json
│
├── .gitignore
└── README.md

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/MassMamudu64/business-finances-management-system.git
cd business-finances-management-system
cd Store_FastAPI/backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt


