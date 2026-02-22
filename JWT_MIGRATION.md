# JWT Authentication Migration - CRITICAL FIX

## Problem Solved
Cross-domain session cookies were being blocked by browsers, causing authentication to fail even though users appeared logged in on the frontend. This happened because:
- Frontend: `hotel-booking-stayindia-3.onrender.com`
- Backend: `hotel-booking-stayindia-2.onrender.com`
- Different subdomains = browsers block third-party cookies

## Solution: JWT Tokens
Switched from session-based authentication to JWT (JSON Web Tokens) which work across domains without cookie issues.

## Changes Made

### Backend Changes

1. **server.js**
   - Removed express-session and connect-mongo
   - Removed session middleware configuration
   - Simplified CORS (no longer need credentials: true for cookies)

2. **middleware/auth.js**
   - Updated `isAuthenticated` to verify JWT tokens from Authorization header
   - Changed `req.session.userId` to `req.userId` throughout
   - Token format: `Bearer <token>`

3. **routes/auth.js**
   - Login now returns JWT token along with user data
   - Token expires in 7 days
   - `/me` endpoint verifies token from Authorization header
   - Logout is now client-side (removes token from localStorage)

4. **routes/bookings.js**
   - Changed `req.session.userId` to `req.userId`

5. **routes/reviews.js**
   - Changed `req.session.userId` to `req.userId`

6. **routes/listings.js**
   - Changed `req.session.userId` to `req.userId`

7. **package.json**
   - Added `jsonwebtoken` dependency

8. **.env**
   - Added `JWT_SECRET` for token signing

### Frontend Changes

1. **context/AuthContext.jsx**
   - Store JWT token in localStorage
   - Pass token to all API requests
   - Clear token on logout or 401 errors

2. **config/axios.js**
   - Removed `withCredentials: true` (no longer needed)
   - Added request interceptor to attach JWT token to all requests
   - Token sent as: `Authorization: Bearer <token>`
   - Response interceptor clears invalid tokens

## How It Works Now

### Login Flow
1. User enters credentials
2. Backend validates and generates JWT token
3. Frontend stores token in localStorage
4. Frontend includes token in all subsequent requests

### Authenticated Requests
1. Frontend reads token from localStorage
2. Axios interceptor adds `Authorization: Bearer <token>` header
3. Backend middleware verifies token
4. Backend extracts userId from token and sets `req.userId`

### Logout Flow
1. User clicks logout
2. Frontend removes token from localStorage
3. User state cleared

## Deployment Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Update Environment Variables on Render
Add to your backend service environment variables:
```
JWT_SECRET=stayindia-jwt-secret-key-2024-change-in-production
```

### 3. Deploy Backend
```bash
git add .
git commit -m "Migrate to JWT authentication"
git push
```

### 4. Deploy Frontend
Frontend changes are already included. Just redeploy:
- Render will automatically rebuild on git push

### 5. Test the Application
1. Clear browser localStorage and cookies
2. Login with credentials: `23211a6765@gmail.com` / `Hariram23@`
3. Try creating a booking - should work now!
4. Try adding a review - should work now!

## Benefits of JWT

✅ Works across different domains/subdomains
✅ No cookie issues with browsers
✅ Stateless - backend doesn't need to store sessions
✅ Scalable - works with multiple backend servers
✅ Mobile-friendly - easier to implement in mobile apps

## Security Notes

- Tokens expire after 7 days
- Tokens are signed with JWT_SECRET (keep this secret!)
- Invalid tokens are automatically rejected
- Tokens stored in localStorage (cleared on logout)
- HTTPS ensures tokens aren't intercepted

## Testing Checklist

- [ ] Login works
- [ ] User stays logged in after page refresh
- [ ] Creating listings works
- [ ] Creating bookings works
- [ ] Adding reviews works
- [ ] My Bookings page shows data
- [ ] Logout works
- [ ] Admin login works
- [ ] Admin dashboard accessible

## Troubleshooting

### "Please login to continue" error
- Check browser console for token
- Verify token is being sent in Authorization header
- Check backend logs for JWT verification errors

### Token expired
- User needs to login again
- Tokens last 7 days

### Still having issues?
1. Clear browser localStorage: `localStorage.clear()`
2. Clear cookies
3. Hard refresh (Ctrl+Shift+R)
4. Login again
