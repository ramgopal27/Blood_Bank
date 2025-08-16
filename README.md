# Mini Project: Blood Bank Management System

This project is a full-stack web application for managing blood bank operations, including donor and recipient management, blood stock tracking, requests, alerts, and admin/user dashboards.

## Project Structure

```
mini-project/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
```

## Features

- User authentication (admin, donor, recipient)
- Donor and recipient management
- Blood stock management
- Request handling and alerts
- Dashboards for admin and users
- Modern React frontend with Vite
- RESTful API backend with Node.js and Express

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
   ```powershell
   cd backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the backend server:
   ```powershell
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the frontend development server:
   ```powershell
   npm run dev
   ```

### Accessing the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8080](http://localhost:8080)

## Technologies Used

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Folder Details

- `backend/controllers/` - Express route handlers
- `backend/models/` - Mongoose models (if using MongoDB)
- `backend/routes/` - API route definitions
- `frontend/src/Components/` - React components
- `frontend/src/css/` - CSS files for components

## Customization

- Update database connection in `backend/server.js`
- Add environment variables as needed


## Author

- Maddula Ramgopal
