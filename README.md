📁 TinyFiles – Smart File Processing Web App

TinyFiles is a full-stack web application that provides powerful yet simple tools for image and PDF processing, along with secure user authentication and a history dashboard.
The application is designed to work efficiently in both guest mode and authenticated mode, following real-world production practices.

<img width="1874" height="817" alt="Screenshot 2026-01-02 140125" src="https://github.com/user-attachments/assets/4a38f0aa-cd6a-474f-9ae1-ccb410876055" />
<img width="682" height="626" alt="Screenshot 2026-01-03 182948" src="https://github.com/user-attachments/assets/0e5789af-f6c3-473a-8e68-26ec42351848" />
<img width="617" height="468" alt="Screenshot 2026-01-03 183013" src="https://github.com/user-attachments/assets/07d306fb-9f34-475f-8b0e-42af321a93b0" />
 


🚀 Live Demo

Frontend (Vercel): https://tiny-files-pro.vercel.app/

Backend (Render): https://tinyfilespro.onrender.com

🛠️ Tech Stack
Frontend

React (Vite)

Plain CSS

Axios

React Router

React Toastify

Backend

Node.js

Express.js

MongoDB (Atlas)

Mongoose

JWT Authentication

Multer (memory storage)

Sharp (image processing)

PDF-Lib (PDF operations)

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

✨ Features
🔐 Authentication

User registration & login

JWT-based authentication

Secure protected routes

Guest access for basic features

🖼️ Image Tools

Resize images by width & height

Crop images using GUI (react-easy-crop)

Change image format (JPG / PNG / WEBP)

Adjust image quality using slider

Resize image to a target file size (KB)

Direct image download after processing

📄 PDF Tools

Merge multiple PDF files into one

Compress PDF files

Secure in-memory file handling (cloud safe)

📊 Dashboard

History of user operations (logged-in users)

Tracks original vs processed file size

Operation type tracking

🧠 Project Architecture
Frontend (React + Vite)
        |
        | HTTPS API Requests
        ↓
Backend (Node + Express)
        |
        ↓
MongoDB Atlas


Frontend communicates with backend using REST APIs

Backend handles authentication, validation, and file processing

MongoDB stores users and history data

🔑 Authentication Flow (JWT)

User logs in with email & password

Backend verifies credentials using bcrypt

JWT token is generated and returned

Token is stored in browser (localStorage)

Token is attached to protected API requests

Backend verifies token for secure access

🌍 Environment Variables
Backend (Render)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Frontend (Vercel)
VITE_API_URL=https://tinyfilespro.onrender.com/api


⚠️ .env files are excluded from version control using .gitignore

📦 Installation (Local Setup)
1️⃣ Clone Repository
git clone https://github.com/your-username/tinyfiles.git
cd tinyfiles

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173


Backend runs on:

http://localhost:5000

🧪 Error Handling & Security

Proper HTTP status codes (400, 401, 500)

Backend validation for all inputs

Secure password hashing with bcrypt

JWT secret stored securely in environment variables

CORS configured for production & development

No file system dependency (cloud-safe)

📜 License

This project is created for educational and learning purposes.
