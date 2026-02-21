# Quick Setup Guide

## Step-by-Step Installation

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure Backend Environment
The `.env` file is already created in the backend folder with the correct MongoDB URI.

### 3. Seed Database with Sample Data
```bash
npm run seed
```

This creates:
- Demo user (email: demo@example.com, password: password123)
- 6 sample listings

### 4. Start Backend Server
```bash
npm run dev
```

Backend runs on: http://localhost:5000

### 5. Install Frontend Dependencies (New Terminal)
```bash
cd frontend
npm install
```

### 6. Start Frontend Development Server
```bash
npm run dev
```

Frontend runs on: http://localhost:5173

## Test the Application

1. Open http://localhost:5173 in your browser
2. Login with demo credentials:
   - Email: demo@example.com
   - Password: password123
3. Browse listings, create new ones, add reviews, and make bookings!

Images are stored directly in MongoDB using GridFS.

## Troubleshooting

**MongoDB Connection Error:**
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas

**Port Already in Use:**
- Backend: Change PORT in backend/.env
- Frontend: Change port in frontend/vite.config.js

**CORS Errors:**
- Ensure backend is running on port 5000
- Check frontend proxy configuration in vite.config.js

## Next Steps

- Create your own account
- Add new listings
- Test the booking system
- Leave reviews on listings
- Explore search and filter features
