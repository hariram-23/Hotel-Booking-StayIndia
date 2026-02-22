# 🚀 Frontend Deployment Guide

## Backend URL
Your backend is deployed at: **https://hotel-booking-stayindia-2.onrender.com**

## ✅ Frontend Configuration Complete

I've configured the frontend to connect to your deployed backend:

### Changes Made:
1. ✅ Created `frontend/.env.production` with backend URL
2. ✅ Created `frontend/.env.development` for local development
3. ✅ Created `frontend/src/config/axios.js` for centralized API configuration
4. ✅ Updated all pages to use configured axios
5. ✅ Updated backend CORS to allow frontend URL

## 📦 Deploy Frontend to Render

### Step 1: Create New Static Site

1. Go to https://dashboard.render.com/
2. Click "New +" → "Static Site"
3. Connect your GitHub repository: `Hotel-Booking-StayIndia`

### Step 2: Configure Build Settings

Fill in these values:

- **Name**: `stayindia-frontend` (or any name you prefer)
- **Branch**: `main`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `frontend/dist`

### Step 3: Add Environment Variable

Click "Advanced" and add:

- **Key**: `VITE_API_URL`
- **Value**: `https://hotel-booking-stayindia-2.onrender.com`

### Step 4: Deploy

1. Click "Create Static Site"
2. Wait for deployment (2-3 minutes)
3. You'll get a URL like: `https://stayindia-frontend.onrender.com`

## 🔄 After Frontend Deploys

### Update Backend CORS:

1. Go to your backend service in Render
2. Go to "Environment" tab
3. Add/Update the `FRONTEND_URL` variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-frontend-url.onrender.com` (your actual frontend URL)
4. Save and redeploy

## 🧪 Test Your Deployment

### 1. Test Backend Health:
```
https://hotel-booking-stayindia-2.onrender.com/health
```

Should return:
```json
{
  "status": "ok",
  "message": "Server is running",
  "environment": "production"
}
```

### 2. Test Frontend:
Open your frontend URL and:
- ✅ Landing page loads
- ✅ Can register new user
- ✅ Can login
- ✅ Can view listings
- ✅ Can make bookings
- ✅ Forgot password sends OTP email

## 📝 Quick Reference

### Backend URL:
```
https://hotel-booking-stayindia-2.onrender.com
```

### Frontend Build Settings:
```
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: frontend/dist
Environment Variable: VITE_API_URL=https://hotel-booking-stayindia-2.onrender.com
```

## 🔧 Troubleshooting

### CORS Errors:
- Make sure `FRONTEND_URL` is set in backend environment variables
- Check that your frontend URL is in the backend's allowed origins list

### API Connection Errors:
- Verify `VITE_API_URL` is set correctly in frontend
- Check browser console for error messages
- Verify backend is running at the health endpoint

### Session/Cookie Issues:
- Backend has `credentials: true` in CORS ✅
- Frontend axios has `withCredentials: true` ✅
- Cookies are set to `sameSite: 'none'` for production ✅

## 🎉 Success!

Once both are deployed:
1. Users can access your app via the frontend URL
2. All API calls go to the backend
3. Emails are sent via Brevo
4. Sessions work across domains
5. Admin panel accessible at `/admin`

Your full-stack hotel booking system is now live! 🚀
