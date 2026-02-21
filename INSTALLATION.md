# Complete Installation Guide

## Overview
This Airbnb clone uses MongoDB GridFS to store images directly in the database, eliminating the need for external storage services like Cloudinary.

## System Requirements
- Node.js v16 or higher
- npm or yarn
- MongoDB Atlas account (free tier works)
- Modern web browser

## Installation Steps

### 1. Install Backend Dependencies

Open a terminal and navigate to the backend folder:

```bash
cd backend
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- express-session (session management)
- connect-mongo (MongoDB session store)
- multer (file upload handling)
- multer-gridfs-storage (GridFS storage for Multer)
- express-validator (input validation)
- cors (cross-origin resource sharing)
- dotenv (environment variables)

### 2. Verify Environment Configuration

The `.env` file is already configured with:
```
MONGODB_URI=mongodb+srv://hari:hari@cluster0.isork0b.mongodb.net/airbnb-clone
PORT=5000
SESSION_SECRET=your-super-secret-session-key-change-in-production
NODE_ENV=development
```

**Important:** For production, change the SESSION_SECRET to a strong random string.

### 3. Seed the Database

Run the seed script to populate the database with sample data:

```bash
npm run seed
```

This creates:
- 1 demo user (email: demo@example.com, password: password123)
- 6 sample listings with images

### 4. Start the Backend Server

```bash
npm run dev
```

You should see:
```
MongoDB connected successfully
Server running on port 5000
```

The backend API is now running at `http://localhost:5000`

### 5. Install Frontend Dependencies

Open a NEW terminal window and navigate to the frontend folder:

```bash
cd frontend
npm install
```

This will install:
- react (UI library)
- react-dom (React DOM renderer)
- react-router-dom (routing)
- axios (HTTP client)
- vite (build tool)

### 6. Start the Frontend Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

The frontend is now running at `http://localhost:5173`

### 7. Access the Application

Open your browser and go to: `http://localhost:5173`

## Testing the Application

### Login with Demo Account
- Email: `demo@example.com`
- Password: `password123`

### Create a New Account
1. Click "Sign Up" in the navbar
2. Fill in username, email, and password
3. Submit the form

### Test Features
1. **Browse Listings**: View all listings on the home page
2. **Search**: Use the search bar to filter by location or price
3. **View Details**: Click on any listing to see full details
4. **Create Listing**: Click "Create Listing" (must be logged in)
5. **Upload Image**: Select an image file when creating a listing
6. **Add Review**: Leave a review on any listing (except your own)
7. **Book Listing**: Select dates and book a listing
8. **View Bookings**: Click "My Bookings" to see your reservations

## How Image Storage Works

### GridFS Overview
- Images are stored directly in MongoDB using GridFS
- GridFS splits large files into chunks (255KB each)
- Files are stored in two collections: `uploads.files` and `uploads.chunks`
- Images are served via the `/api/images/:filename` endpoint

### Image Upload Flow
1. User selects an image file
2. Multer processes the upload
3. GridFS storage engine saves to MongoDB
4. Filename is stored in the listing document
5. Images are retrieved via the image serving route

### Benefits
- No external dependencies (no Cloudinary needed)
- All data in one place (MongoDB)
- No additional API keys or configuration
- Works out of the box

## Troubleshooting

### Backend won't start
**Error:** `MongoDB connection error`
- Check if MongoDB URI is correct
- Verify your IP is whitelisted in MongoDB Atlas
- Ensure network connectivity

**Error:** `Port 5000 already in use`
- Change PORT in backend/.env to another port (e.g., 5001)
- Update frontend proxy in vite.config.js accordingly

### Frontend won't start
**Error:** `Port 5173 already in use`
- Change port in frontend/vite.config.js
- Or stop the process using port 5173

### Images not displaying
- Ensure backend is running
- Check browser console for errors
- Verify image route: `http://localhost:5000/api/images/[filename]`

### CORS errors
- Ensure backend is running on port 5000
- Check CORS configuration in backend/server.js
- Verify frontend origin matches CORS settings

### Session/Authentication issues
- Clear browser cookies
- Check if MongoDB session store is connected
- Verify SESSION_SECRET is set in .env

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: nodemon restarts server on file changes

### API Testing
Test API endpoints using:
- Browser (for GET requests)
- Postman or Insomnia (for all request types)
- curl commands

Example:
```bash
curl http://localhost:5000/api/listings
```

### Database Inspection
View your MongoDB data:
1. Go to MongoDB Atlas dashboard
2. Click "Browse Collections"
3. Select your database (airbnb-clone)
4. View collections: users, listings, reviews, bookings, uploads.files

## Production Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables:
   - MONGODB_URI
   - SESSION_SECRET (use strong random string)
   - NODE_ENV=production
2. Update CORS origin to your frontend URL
3. Deploy using platform-specific instructions

### Frontend Deployment (Vercel/Netlify)
1. Build production bundle: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable for API URL if needed

## Additional Resources

- MongoDB GridFS Documentation: https://docs.mongodb.com/manual/core/gridfs/
- Multer Documentation: https://github.com/expressjs/multer
- React Router Documentation: https://reactrouter.com/
- Express Documentation: https://expressjs.com/

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB connection is working
4. Check that both servers are running
5. Clear browser cache and cookies

Happy coding! 🚀
