# Airbnb Clone - Project Summary

## 🎯 Project Overview

A full-stack Airbnb clone with complete authentication, listing management, reviews, and booking functionality. Images are stored directly in MongoDB using GridFS.

## ✨ Key Features

### Authentication System
- User registration with bcrypt password hashing (12 rounds)
- Session-based authentication using express-session
- MongoDB session store for persistence
- Protected routes and authorization middleware
- Owner-only and author-only permissions

### Listings Management
- Full CRUD operations (Create, Read, Update, Delete)
- Image upload with Multer and GridFS storage
- Search by location (city or country)
- Filter by price range (min/max)
- Pagination support
- Owner-only edit/delete permissions

### Reviews System
- 1-5 star ratings
- Text comments
- Author attribution
- Delete own reviews
- Average rating calculation
- Review count display

### Booking System
- Date selection (check-in/check-out)
- Automatic price calculation
- Overlap prevention
- Date validation
- Booking history page

### UI/UX
- Modern Airbnb-inspired design
- Gradient hero section
- Responsive grid layouts
- Image preview before upload
- Flash messages for feedback
- Smooth transitions and hover effects
- Mobile-friendly responsive design

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP requests
- **Vite** - Build tool and dev server
- **CSS-in-JS** - Inline styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload handling
- **GridFS** - MongoDB file storage
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-mongo** - Session store
- **express-validator** - Input validation
- **CORS** - Cross-origin support

## 📁 Project Structure

```
airbnb-clone/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── gridfs.js            # GridFS configuration
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── errorHandler.js     # Error handling
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Listing.js           # Listing schema
│   │   ├── Review.js            # Review schema
│   │   └── Booking.js           # Booking schema
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── listings.js          # Listing endpoints
│   │   ├── reviews.js           # Review endpoints
│   │   ├── bookings.js          # Booking endpoints
│   │   └── images.js            # Image serving
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server
│   ├── seed.js                  # Database seeding
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   ├── ListingCard.jsx  # Listing card
│   │   │   └── SearchBar.jsx    # Search component
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state management
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Home page
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Register.jsx     # Registration page
│   │   │   ├── CreateListing.jsx
│   │   │   ├── EditListing.jsx
│   │   │   ├── ListingDetail.jsx
│   │   │   └── MyBookings.jsx
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── README.md                    # Main documentation
├── SETUP.md                     # Quick setup guide
├── INSTALLATION.md              # Detailed installation
├── FEATURES.md                  # Feature checklist
└── PROJECT_SUMMARY.md           # This file
```

## 🗄️ Database Schema

### Collections

1. **users**
   - username, email, password (hashed), createdAt

2. **listings**
   - title, description, image, price, location, country
   - owner (ref: User), reviews (ref: Review[]), createdAt

3. **reviews**
   - rating, comment, author (ref: User)
   - listing (ref: Listing), createdAt

4. **bookings**
   - listing (ref: Listing), user (ref: User)
   - checkIn, checkOut, totalPrice, createdAt

5. **uploads.files** (GridFS)
   - filename, contentType, length, uploadDate

6. **uploads.chunks** (GridFS)
   - files_id, n, data

## 🔐 Security Features

- Password hashing with bcrypt (12 rounds)
- Session-based authentication
- HTTP-only session cookies
- CSRF protection via session
- Input validation and sanitization
- Protected API routes
- Owner/author authorization checks
- Environment variable secrets
- Error handling without exposing internals

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Listings
- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (auth required)
- `PUT /api/listings/:id` - Update listing (owner only)
- `DELETE /api/listings/:id` - Delete listing (owner only)

### Reviews
- `POST /api/reviews/:listingId` - Add review (auth required)
- `DELETE /api/reviews/:id` - Delete review (author only)

### Bookings
- `POST /api/bookings` - Create booking (auth required)
- `GET /api/bookings/my-bookings` - Get user bookings

### Images
- `GET /api/images/:filename` - Serve image from GridFS

## 📊 Image Storage with GridFS

### Why GridFS?
- No external dependencies
- All data in MongoDB
- No API keys needed
- Automatic chunking for large files
- Built-in file metadata

### How It Works
1. User uploads image via form
2. Multer intercepts the file
3. GridFS storage engine saves to MongoDB
4. Filename stored in listing document
5. Images served via `/api/images/:filename`

### Storage Details
- Bucket name: `uploads`
- Chunk size: 255KB (default)
- Supported formats: jpg, jpeg, png, webp
- Files stored in: `uploads.files` and `uploads.chunks`

## 🎨 UI Design Principles

- Clean, modern Airbnb-inspired aesthetic
- Gradient accents (purple to pink)
- Card-based layouts
- Smooth hover transitions
- Responsive grid systems
- Mobile-first approach
- Consistent spacing and typography
- Accessible color contrasts

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://hari:hari@cluster0.isork0b.mongodb.net/airbnb-clone
PORT=5000
SESSION_SECRET=your-super-secret-session-key-change-in-production
NODE_ENV=development
```

## 🧪 Testing the Application

### Demo Credentials
- Email: `demo@example.com`
- Password: `password123`

### Test Scenarios
1. Register new account
2. Login/logout
3. Browse listings
4. Search by location
5. Filter by price
6. View listing details
7. Create new listing with image
8. Edit own listing
9. Delete own listing
10. Add review to listing
11. Delete own review
12. Book a listing
13. View booking history

## 🚀 Quick Start

```bash
# Backend
cd backend
npm install
npm run seed
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

## 📦 Deployment Checklist

### Backend
- [ ] Set strong SESSION_SECRET
- [ ] Set NODE_ENV=production
- [ ] Update CORS origin to frontend URL
- [ ] Whitelist deployment IP in MongoDB Atlas
- [ ] Test all API endpoints

### Frontend
- [ ] Build production bundle (`npm run build`)
- [ ] Update API base URL if needed
- [ ] Test on multiple browsers
- [ ] Verify responsive design
- [ ] Check image loading

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack JavaScript development
- RESTful API design
- MongoDB database modeling
- File upload handling
- Session-based authentication
- React component architecture
- State management with Context API
- Responsive CSS design
- Error handling patterns
- Security best practices

## 📈 Future Enhancements

Potential features to add:
- User profiles with avatars
- Listing favorites/wishlist
- Advanced search filters
- Map integration
- Email notifications
- Payment integration
- Host dashboard
- Guest messaging
- Multi-image uploads
- Image optimization
- Social authentication
- Password reset
- Email verification

## 🤝 Contributing

This is a learning project. Feel free to:
- Fork and experiment
- Add new features
- Improve the UI
- Optimize performance
- Fix bugs
- Enhance security

## 📄 License

MIT License - Free to use for learning and personal projects.

---

**Built with ❤️ using React, Node.js, Express, and MongoDB**
