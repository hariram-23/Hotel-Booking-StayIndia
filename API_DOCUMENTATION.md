# API Documentation

Complete API reference for the Airbnb Clone backend.

**Base URL**: `http://localhost:5000/api`

## Authentication

All authentication endpoints use session-based authentication with cookies.

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `username`: min 3 characters
- `email`: valid email format
- `password`: min 6 characters

**Success Response (201):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "message": "User already exists"
}
```

---

### Login User

**POST** `/auth/login`

Authenticate a user and create a session.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

### Logout User

**POST** `/auth/logout`

Destroy the user session.

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

### Get Current User

**GET** `/auth/me`

Get the currently authenticated user.

**Success Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Not authenticated"
}
```

---

## Listings

### Get All Listings

**GET** `/listings`

Retrieve all listings with optional filtering and pagination.

**Query Parameters:**
- `location` (optional): Search by location or country (case-insensitive)
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)

**Example Request:**
```
GET /listings?location=new%20york&minPrice=100&maxPrice=300&page=1&limit=12
```

**Success Response (200):**
```json
{
  "listings": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Modern Downtown Apartment",
      "description": "Stylish apartment in the heart of the city",
      "price": 150,
      "location": "New York",
      "country": "United States",
      "image": {
        "url": "/api/images/1234567890-apartment.jpg",
        "filename": "1234567890-apartment.jpg"
      },
      "owner": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "john_doe"
      },
      "reviews": [],
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "totalPages": 5,
  "currentPage": 1
}
```

---

### Get Single Listing

**GET** `/listings/:id`

Retrieve a single listing with full details including reviews.

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Modern Downtown Apartment",
  "description": "Stylish apartment in the heart of the city",
  "price": 150,
  "location": "New York",
  "country": "United States",
  "image": {
    "url": "/api/images/1234567890-apartment.jpg",
    "filename": "1234567890-apartment.jpg"
  },
  "owner": {
    "_id": "507f1f77bcf86cd799439012",
    "username": "john_doe",
    "email": "john@example.com"
  },
  "reviews": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "rating": 5,
      "comment": "Amazing place!",
      "author": {
        "_id": "507f1f77bcf86cd799439014",
        "username": "jane_smith"
      },
      "createdAt": "2024-01-16T14:20:00.000Z"
    }
  ],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Listing not found"
}
```

---

### Create Listing

**POST** `/listings`

Create a new listing. Requires authentication.

**Content-Type**: `multipart/form-data`

**Form Data:**
- `title` (required): Listing title
- `description` (required): Listing description
- `price` (required): Price per night (number)
- `location` (required): City/location
- `country` (required): Country
- `image` (optional): Image file

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Modern Downtown Apartment",
  "description": "Stylish apartment",
  "price": 150,
  "location": "New York",
  "country": "United States",
  "image": {
    "url": "/api/images/1234567890-apartment.jpg",
    "filename": "1234567890-apartment.jpg"
  },
  "owner": "507f1f77bcf86cd799439012",
  "reviews": [],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (401):**
```json
{
  "message": "Please login to continue"
}
```

---

### Update Listing

**PUT** `/listings/:id`

Update an existing listing. Requires authentication and ownership.

**Content-Type**: `multipart/form-data`

**Form Data:**
- `title` (optional): Updated title
- `description` (optional): Updated description
- `price` (optional): Updated price
- `location` (optional): Updated location
- `country` (optional): Updated country
- `image` (optional): New image file

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated Title",
  "description": "Updated description",
  "price": 200,
  "location": "New York",
  "country": "United States",
  "image": {
    "url": "/api/images/1234567890-new-image.jpg",
    "filename": "1234567890-new-image.jpg"
  },
  "owner": "507f1f77bcf86cd799439012",
  "reviews": [],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Response (403):**
```json
{
  "message": "You do not have permission"
}
```

---

### Delete Listing

**DELETE** `/listings/:id`

Delete a listing. Requires authentication and ownership.

**Success Response (200):**
```json
{
  "message": "Listing deleted successfully"
}
```

**Error Response (403):**
```json
{
  "message": "You do not have permission"
}
```

---

## Reviews

### Add Review

**POST** `/reviews/:listingId`

Add a review to a listing. Requires authentication.

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Amazing place! Highly recommended."
}
```

**Validation:**
- `rating`: Number between 1 and 5
- `comment`: Required string

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Amazing place! Highly recommended.",
  "author": {
    "_id": "507f1f77bcf86cd799439014",
    "username": "jane_smith"
  },
  "listing": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-16T14:20:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Listing not found"
}
```

---

### Delete Review

**DELETE** `/reviews/:id`

Delete a review. Requires authentication and authorship.

**Success Response (200):**
```json
{
  "message": "Review deleted successfully"
}
```

**Error Response (403):**
```json
{
  "message": "You do not have permission"
}
```

---

## Bookings

### Create Booking

**POST** `/bookings`

Create a new booking. Requires authentication.

**Request Body:**
```json
{
  "listingId": "507f1f77bcf86cd799439011",
  "checkIn": "2024-02-01",
  "checkOut": "2024-02-05"
}
```

**Validation:**
- `checkIn`: Valid date (ISO format)
- `checkOut`: Valid date after checkIn
- Dates must not overlap with existing bookings

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "listing": "507f1f77bcf86cd799439011",
  "user": "507f1f77bcf86cd799439014",
  "checkIn": "2024-02-01T00:00:00.000Z",
  "checkOut": "2024-02-05T00:00:00.000Z",
  "totalPrice": 600,
  "createdAt": "2024-01-20T10:00:00.000Z"
}
```

**Error Response (400):**
```json
{
  "message": "Dates are not available"
}
```

---

### Get User Bookings

**GET** `/bookings/my-bookings`

Get all bookings for the authenticated user.

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439015",
    "listing": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Modern Downtown Apartment",
      "location": "New York",
      "country": "United States",
      "price": 150,
      "image": {
        "url": "/api/images/1234567890-apartment.jpg"
      }
    },
    "user": "507f1f77bcf86cd799439014",
    "checkIn": "2024-02-01T00:00:00.000Z",
    "checkOut": "2024-02-05T00:00:00.000Z",
    "totalPrice": 600,
    "createdAt": "2024-01-20T10:00:00.000Z"
  }
]
```

---

## Images

### Get Image

**GET** `/images/:filename`

Retrieve an image from GridFS storage.

**Example:**
```
GET /images/1234567890-apartment.jpg
```

**Success Response (200):**
- Content-Type: image/jpeg (or appropriate image type)
- Binary image data

**Error Response (404):**
```json
{
  "message": "Image not found"
}
```

---

## Error Responses

### Common Error Codes

- **400 Bad Request**: Invalid input or validation error
- **401 Unauthorized**: Not authenticated
- **403 Forbidden**: Not authorized (wrong user)
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

### Error Format

All errors follow this format:
```json
{
  "message": "Error description"
}
```

---

## Authentication Flow

1. **Register** or **Login** to receive a session cookie
2. Session cookie is automatically sent with subsequent requests
3. Backend validates session on protected routes
4. **Logout** destroys the session

## Rate Limiting

Currently no rate limiting is implemented. Consider adding for production.

## CORS

CORS is configured to allow requests from `http://localhost:5173` (frontend).

For production, update the CORS origin in `backend/server.js`.

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt
```

### Get Listings
```bash
curl http://localhost:5000/api/listings
```

### Create Listing (with session)
```bash
curl -X POST http://localhost:5000/api/listings \
  -b cookies.txt \
  -F "title=Test Listing" \
  -F "description=Test Description" \
  -F "price=100" \
  -F "location=Test City" \
  -F "country=Test Country" \
  -F "image=@/path/to/image.jpg"
```

---

**Last Updated**: 2024
**API Version**: 1.0
