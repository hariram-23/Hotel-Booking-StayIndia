# Airbnb Clone - Full Stack Application

A full-featured Airbnb clone built with React, Node.js, Express, and MongoDB.

## Features

### Authentication & Authorization
- User registration with encrypted password (bcrypt)
- User login/logout with session-based authentication
- Protected routes (only logged-in users can create/edit/delete listings)
- Owner-only permissions for editing/deleting listings
- Author-only permissions for deleting reviews

### Core Functionality
- **Listings**: Create, read, update, delete listings with image uploads
- **Reviews**: Add and delete reviews with 1-5 star ratings
- **Bookings**: Book listings with date validation and overlap prevention
- **Search & Filter**: Search by location and filter by price range
- **Pagination**: Efficient listing browsing

### UI Features
- Modern Airbnb-style design
- Responsive layout
- Image preview before upload
- Flash messages for user feedback
- Rating stars display
- Clean navigation with user context

## Tech Stack

**Frontend:**
- React 18
- React Router v6
- Axios
- Vite

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- Session-based auth with express-session
- Multer for file uploads
- GridFS for image storage in MongoDB
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb+srv://hari:hari@cluster0.isork0b.mongodb.net/airbnb-clone
PORT=5000
SESSION_SECRET=your-super-secret-session-key
NODE_ENV=development
```

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
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

Frontend will run on `http://localhost:5173`

## Demo Credentials

After running the seed script:
- **Email**: demo@example.com
- **Password**: password123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Listings
- `GET /api/listings` - Get all listings (with search/filter)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (auth required)
- `PUT /api/listings/:id` - Update listing (owner only)
- `DELETE /api/listings/:id` - Delete listing (owner only)

### Reviews
- `POST /api/reviews/:listingId` - Add review (auth required)
- `DELETE /api/reviews/:id` - Delete review (author only)

### Bookings
- `POST /api/bookings` - Create booking (auth required)
- `GET /api/bookings/my-bookings` - Get user's bookings (auth required)

### Images
- `GET /api/images/:filename` - Serve image from GridFS

## Database Schema

### User
- username (unique)
- email (unique)
- password (hashed)
- createdAt

### Listing
- title
- description
- image (url, filename)
- price
- location
- country
- owner (ref: User)
- reviews (ref: Review[])
- createdAt

### Review
- rating (1-5)
- comment
- author (ref: User)
- listing (ref: Listing)
- createdAt

### Booking
- listing (ref: Listing)
- user (ref: User)
- checkIn
- checkOut
- totalPrice
- createdAt

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- Protected API routes
- Input validation
- Error handling middleware
- CORS configuration
- Environment variables for secrets

## Image Storage

This project uses MongoDB GridFS to store images directly in the database:
- No external storage service required
- Images stored in `uploads.files` and `uploads.chunks` collections
- Automatic file chunking for large images
- Images served via `/api/images/:filename` endpoint
- Works out of the box with no additional configuration

## Project Structure

```
├── backend/
│   ├── config/          # Database & GridFS config
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│   └── seed.js          # Database seeding
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── index.html
│
└── README.md
```

## Deployment

### Backend
1. Set `NODE_ENV=production` in environment variables
2. Update CORS origin to your frontend URL
3. Deploy to platforms like Heroku, Railway, or Render

### Frontend
1. Build the production bundle: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Update API base URL if needed

## License

MIT License - feel free to use this project for learning or personal use.
