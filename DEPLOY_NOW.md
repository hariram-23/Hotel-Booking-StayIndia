# 🚀 Quick Deployment Guide

## Ready to Deploy? Follow These Steps!

### Step 1: Test Locally (Windows)
```bash
test-build.bat
```

This will verify everything builds correctly.

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 3: Deploy Backend to Render

1. Go to https://render.com and sign in with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select your repository: `hariram-23/Hotel-Booking-StayIndia`
4. Configure:
   - **Name**: `stayindia-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   MONGODB_URI = mongodb+srv://hari:hari@cluster0.isork0b.mongodb.net/airbnb-clone?retryWrites=true&w=majority
   SESSION_SECRET = your-super-secret-key-change-this-now-12345
   NODE_ENV = production
   EMAIL_USER = hotetbooking356@gmail.com
   EMAIL_PASS = rygyremqpnjskgnh
   CLIENT_URL = (leave blank for now, will update after frontend deployment)
   PORT = 5000
   ```

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://stayindia-backend.onrender.com`)

### Step 4: Deploy Frontend to Render

1. Click **"New +"** → **"Static Site"**
2. Select your repository again
3. Configure:
   - **Name**: `stayindia-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variable:
   ```
   VITE_API_URL = https://stayindia-backend.onrender.com
   ```
   (Use the backend URL from Step 3)

5. Click **"Create Static Site"**
6. Wait for deployment (3-5 minutes)
7. Copy your frontend URL (e.g., `https://stayindia-frontend.onrender.com`)

### Step 5: Update Backend CLIENT_URL

1. Go back to your backend service in Render
2. Click **"Environment"** tab
3. Update `CLIENT_URL` with your frontend URL
4. Click **"Save Changes"**
5. Service will automatically redeploy

### Step 6: Configure MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Click on your cluster → **"Network Access"**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

### Step 7: Test Your Deployment! 🎉

Visit your frontend URL and test:
- ✅ Landing page loads
- ✅ Register a new account
- ✅ Login
- ✅ Browse listings
- ✅ Make a booking
- ✅ Check email for confirmation
- ✅ Admin login at `/admin`

### Step 8: Seed Database (Optional)

If you want to add sample listings:

1. In Render backend dashboard, go to **"Shell"** tab
2. Run: `node seed.js`
3. This will create 10 sample Indian hotel listings

---

## Alternative: Deploy to Vercel (Frontend Only)

If you prefer Vercel for frontend:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel
   ```

3. Follow prompts and add environment variable:
   ```
   VITE_API_URL = https://stayindia-backend.onrender.com
   ```

---

## 🔧 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB Atlas allows connections from anywhere

**"MongoDB connection failed"**
- Verify MONGODB_URI is correct
- Check MongoDB Atlas network access settings
- Ensure database user has correct permissions

### Frontend Issues

**"Failed to fetch"**
- Verify VITE_API_URL is correct
- Check backend is running
- Verify CORS is configured (already done)

**Build fails**
- Check logs for specific errors
- Ensure all dependencies are in package.json
- Try building locally first

### Email Issues

**OTP not sending**
- Verify EMAIL_USER and EMAIL_PASS are correct
- Check Gmail app password hasn't expired
- Look at backend logs for email errors

---

## 📊 Your Deployment URLs

After deployment, save these:

- **Frontend**: https://stayindia-frontend.onrender.com
- **Backend**: https://stayindia-backend.onrender.com
- **Admin Panel**: https://stayindia-frontend.onrender.com/admin

---

## 🎯 Next Steps After Deployment

1. **Create Admin Account**:
   - Register normally
   - Go to MongoDB Atlas → Browse Collections
   - Find your user in `users` collection
   - Edit and set `isAdmin: true`

2. **Monitor Performance**:
   - Check Render logs regularly
   - Monitor MongoDB Atlas metrics
   - Set up uptime monitoring (optional)

3. **Share Your Project**:
   - Add deployment URLs to README
   - Share on LinkedIn/Portfolio
   - Add to your resume!

---

## 💡 Pro Tips

- **Free Tier Limitations**: Render free tier sleeps after 15 minutes of inactivity. First request after sleep takes ~30 seconds.
- **Keep It Alive**: Use a service like UptimeRobot to ping your backend every 14 minutes.
- **Upgrade When Ready**: Paid tiers ($7/month) keep services running 24/7.

---

## 🆘 Need Help?

Check these resources:
- Render Docs: https://render.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Your GitHub Repo: https://github.com/hariram-23/Hotel-Booking-StayIndia

---

**You're all set! Happy deploying! 🚀**
