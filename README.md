# Smart Workforce Attendance Management System Using Barcode Scan

A highly advanced, enterprise-grade web application for managing employee attendance using Barcode/QR Code scanning. Built with Next.js, React, Tailwind CSS, Express, and MongoDB.

## Features

*   **Premium Modern UI/UX**: Built with Tailwind CSS, Framer Motion, and Glassmorphism effects.
*   **Dual Authentication**: Admin and Employee roles.
*   **Barcode Scanning**: 
    *   Supports physical USB barcode scanners.
    *   Supports built-in device cameras via WebRTC.
*   **Intelligent Tracking**: Automatically detects Check-in vs Check-out based on the day's existing records.
*   **Dashboards**:
    *   **Employee**: View own attendance, working hours chart, today's log.
    *   **Admin**: View total stats, live check-ins, heatmap charts, and employee management.
*   **Analytics**: Recharts integration for beautiful, interactive data visualization.
*   **Responsive**: Full mobile, tablet, and desktop support.

## Tech Stack

*   **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, Framer Motion, Recharts, Lucide React, React-Webcam, @zxing/library
*   **Backend**: Node.js, Express.js, MongoDB + Mongoose, JWT Auth, Bcrypt.js
*   **Tools**: ESLint, TypeScript

## Installation & Setup

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update environment variables. A `.env` file has been created. Ensure you add your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *(Ensure you have `nodemon` configured in package.json or simply run `node server.js`)*

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## Demo Credentials (Simulated)

You can use any credentials to explore the UI mockups connected to the routing logic:
*   **Admin**: `admin@test.com` / `password`
*   **Employee**: `emp@test.com` / `password`

## Note on Barcode Scanning
- **USB Scanner**: Click the input field on the Scan page and scan your barcode. The scanner acts as a keyboard and will automatically input and submit the code.
- **Camera Scanner**: Switch to Camera mode and hold the barcode up to the camera. (Mocked in demo mode for instant feedback without needing a real printed barcode).

## License
MIT
