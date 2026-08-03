# NilePixel Agency Platform

Welcome to the NilePixel Agency repository! This project consists of a React frontend and a Node.js/Express backend.

## Project Structure

- `frontend/`: Contains the React application (built with Vite, Tailwind CSS v4, Lucide React, Framer Motion, TypeScript).
- `backend/`: Contains the Node.js API server (built with Express, SQLite, JWT, bcryptjs, Multer for uploads, TypeScript).

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Setup Instructions

This project is separated into two distinct directories. You will need to install dependencies and run the servers for both the frontend and backend independently.

### 1. Backend Setup

The backend serves the API and handles database connections, authentication, and file uploads.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables. Create a `.env` file in the `backend` directory (you can use the provided example if there is one) and configure variables like `PORT`, `JWT_SECRET`, etc.
   ```bash
   PORT=3000
   JWT_SECRET="your_super_secret_jwt_key"
   CLIENT_URL="http://localhost:5173"
   UPLOAD_PATH="uploads"
   NODE_ENV="development"
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The backend will typically run on `http://localhost:3000`.*

### 2. Frontend Setup

The frontend is the client-facing application and admin dashboard.

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will typically run on `http://localhost:5173`.*

## Deployment

To deploy for production:
- **Backend**: Run `npm run build` to bundle the server using esbuild, and then run `npm start` to execute the bundled file.
- **Frontend**: Run `npm run build` to compile the TypeScript and generate static files in the `dist/` directory via Vite. These files can be hosted on any static hosting provider (e.g., Vercel, Netlify, or Nginx).

## Additional Information

- **Database**: The backend uses SQLite (`sqlite3`) for lightweight, local data storage.
- **Uploads**: Images and media uploaded through the CMS are handled by Multer and stored locally in the backend's `uploads/` directory. Ensure this directory exists or is configured correctly for production.
