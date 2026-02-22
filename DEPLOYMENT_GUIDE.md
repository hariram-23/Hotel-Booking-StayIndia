# Deployment Guide - StayIndia Hotel Booking System

This guide covers deploying your full-stack application to production.

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (already configured)
- Email account for nodemailer (already configured)
- Git repository (already set up)

## Deployment Options

### Option 1: Deploy to Render (Recommended - Free Tier Available)

#### Backend Deployment on Render

1. **Create Account**
   - Go to https://render.com
   - Sign up with your GitHub account

2. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `hariram-23/Hotel-Booking-StayIndia`
   - Configure:
     - Name: `stayindia-backend`
     - Root Directory: `backend`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: `Free`

3. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://hari:hari@cluster0.isork0b.mongodb.net/
   SESSION_SECRET=your-super-secret-session-key-change-this-in-production
   NODE_ENV=production
   EMAIL_USER=hotetbooking356@gmail.com
   EMAIL_PASS=rygyremqpnjskgnh
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```

4. **Deploy** - Click "Create Web Service"

#### Frontend Deployment on Render

1. **Deploy Frontend**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - Name: `stayindia-frontend`
     - Root Directory: `frontend`
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`

2. **Add Environment Variable**
   - Go to "Environment" tab
   - Add: `VITE_API_URL=https://your-backend-url.onrender.com`

3. **Update Frontend API URL**
   - After backend is deployed, update the frontend environment variable
   - Redeploy frontend

---

### Option 2: Deploy to Vercel (Frontend) + Render (Backend)

#### Backend on Render (Same as above)

#### Frontend on Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

3. **Add Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add: `VITE_API_URL=https://your-backend-url.onrender.com`

---

### Option 3: Deploy to Railway

#### Deploy Both Backend and Frontend

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   - New Project → Deploy from GitHub
   - Select your repository
   - Add service → Select `backend` folder
   - Add environment variables (same as Render)

3. **Deploy Frontend**
   - Add service → Select `frontend` folder
   - Add build command: `npm install && npm run build`
   - Add start command: `npx serve -s dist -p $PORT`

---

## Pre-Deployment Checklist

### Backend
- ✅ MongoDB URI configured
- ✅ Email credentials set up
- ✅ Session secret configured
- ✅ CORS configured for production
- ✅ Error handling implemented
- ✅ Environment variables ready

### Frontend
- ✅ API URL configured
- ✅ Build command tested
- ✅ Production optimizations enabled
- ✅ Environment variables ready

---

## Post-Deployment Steps

1. **Test Backend API**
   ```bash
   curl https://your-backend-url.onrender.com/api/listings
   ```

2. **Seed Database** (if needed)
   - SSH into backend or run locally:
   ```bash
   node seed.js
   ```

3. **Test Frontend**
   - Visit your frontend URL
   - Test registration, login, and booking flow

4. **Create Admin Account**
   - Register a new account
   - Manually update in MongoDB to set `isAdmin: true`

---

## Environment Variables Reference

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://hari:hari@cluster0.isork0b.mongodb.net/
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
NODE_ENV=production
EMAIL_USER=hotetbooking356@gmail.com
EMAIL_PASS=rygyremqpnjskgnh
CLIENT_URL=https://your-frontend-url.onrender.com
PORT=5000
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for cloud deployments)

**Session Issues**
- Ensure SESSION_SECRET is set
- Check connect-mongo configuration

**Email Not Sending**
- Verify EMAIL_USER and EMAIL_PASS
- Check Gmail app password is correct

### Frontend Issues

**API Calls Failing**
- Check VITE_API_URL is correct
- Verify CORS is configured on backend
- Check browser console for errors

**Build Fails**
- Run `npm run build` locally first
- Check for any TypeScript/ESLint errors

---

## Monitoring & Maintenance

1. **Monitor Logs**
   - Check Render/Vercel/Railway logs regularly
   - Set up error alerts

2. **Database Backups**
   - MongoDB Atlas provides automatic backups
   - Consider manual exports for critical data

3. **Update Dependencies**
   ```bash
   npm audit fix
   npm update
   ```

4. **Performance Monitoring**
   - Monitor response times
   - Check database query performance
   - Optimize images and assets

---

## Security Recommendations

1. **Change Default Credentials**
   - Update SESSION_SECRET
   - Change admin password after first login

2. **Enable HTTPS**
   - Render/Vercel provide automatic HTTPS
   - Ensure secure cookies in production

3. **Rate Limiting**
   - Consider adding rate limiting for API endpoints
   - Protect against brute force attacks

4. **Input Validation**
   - Already implemented with express-validator
   - Keep validation rules updated

---

## Scaling Considerations

1. **Database**
   - MongoDB Atlas auto-scales
   - Consider upgrading tier for better performance

2. **Backend**
   - Render free tier sleeps after inactivity
   - Upgrade to paid tier for 24/7 availability

3. **Frontend**
   - Static sites scale automatically
   - Consider CDN for global distribution

---

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

## Quick Deploy Commands

### Test Locally First
```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run build
npm run preview
```

### Deploy to Render (via Dashboard)
1. Push to GitHub: `git push origin main`
2. Connect repository in Render dashboard
3. Configure environment variables
4. Deploy!

---

**Your application is now ready for deployment! 🚀**
