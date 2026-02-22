# 🚀 Deployment Guide - StayIndia

## Pre-Deployment Checklist

✅ All fixes applied:
- Server.js updated with proper error handling
- Package.json updated with license fields
- Environment variables configured
- CORS configured for production
- Health check endpoint added
- Graceful shutdown handlers added

## Environment Variables Required

### Backend (.env)
```env
MONGODB_URI=your-mongodb-connection-string
PORT=5000
SESSION_SECRET=your-super-secret-session-key-change-in-production
NODE_ENV=production
BREVO_API_KEY=your-brevo-api-key-here
EMAIL_FROM=hotetbooking356@gmail.com
EMAIL_FROM_NAME=StayIndia
FRONTEND_URL=https://your-frontend-url.com
```

**Note**: Replace the placeholder values with your actual credentials:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `SESSION_SECRET`: Generate a strong random secret
- `BREVO_API_KEY`: Your Brevo API key from Brevo dashboard
- `FRONTEND_URL`: Your deployed frontend URL

### Frontend
```env
VITE_API_URL=https://your-backend-url.com
```

## Deployment Options

### Option 1: Render (Recommended - Free Tier Available)

#### Backend Deployment:
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: stayindia-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables (from above list)

6. Click "Create Web Service"

#### Frontend Deployment:
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: stayindia-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist
   - **Plan**: Free

4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL from step 1

5. Click "Create Static Site"

### Option 2: Railway

#### Backend:
1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - **Root Directory**: backend
   - **Start Command**: `npm start`
5. Add all environment variables
6. Deploy

#### Frontend:
1. Create new service in same project
2. Configure:
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run preview`
3. Add VITE_API_URL environment variable
4. Deploy

### Option 3: Vercel (Frontend) + Render (Backend)

#### Backend on Render:
Follow Render backend steps above

#### Frontend on Vercel:
1. Go to [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL
5. Deploy

## Post-Deployment Steps

### 1. Update Frontend API URL
After backend is deployed, update the frontend's `VITE_API_URL` to point to your backend URL.

### 2. Update Backend CORS
Update `FRONTEND_URL` in backend environment variables to your frontend URL.

### 3. Test Email Functionality
- Test forgot password flow
- Test booking confirmation emails
- Verify OTP emails are being sent

### 4. Seed Database (Optional)
If you want to populate with sample data:
```bash
# SSH into your backend service or run locally
cd backend
node seed.js
```

### 5. Test Admin Access
- Navigate to `/admin` on your frontend
- Login with: admin@example.com / admin123

## Troubleshooting

### Application Exits Early
✅ **Fixed**: Added proper error handling and graceful shutdown

### MongoDB Connection Issues
- Verify MONGODB_URI is correct
- Check MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Ensure database user has proper permissions

### CORS Errors
- Verify FRONTEND_URL is set correctly in backend
- Check that credentials: true is set in both frontend and backend

### Email Not Sending
- Verify BREVO_API_KEY is correct
- Check Brevo dashboard for email logs
- Ensure sender email is verified in Brevo

### Session Issues
- Verify SESSION_SECRET is set
- Check MongoDB connection for session store
- Ensure cookies are configured correctly for production

## Health Check

Your backend has a health check endpoint at `/health`

Test it:
```bash
curl https://your-backend-url.com/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Monitoring

### Backend Logs
Check your deployment platform's logs for:
- ✅ Server running on port X
- ✅ Environment: production
- ✅ MongoDB: Connected

### Frontend
- Check browser console for API connection errors
- Verify API calls are going to correct backend URL

## Security Notes

⚠️ **Important**: 
- Never commit `.env` files to GitHub
- Use environment variables in deployment platform
- Rotate SESSION_SECRET in production
- Keep API keys secure

## Support

If you encounter issues:
1. Check deployment platform logs
2. Verify all environment variables are set
3. Test health check endpoint
4. Check MongoDB connection
5. Verify Brevo API key is active

## Success Indicators

✅ Backend health check returns 200
✅ Frontend loads without errors
✅ Can register/login users
✅ Can view listings
✅ Can make bookings
✅ Emails are being sent
✅ Admin dashboard accessible

Your application is now deployed and ready to use! 🎉
