# ⚡ QUICK FIX - Do This NOW in Render

## The Problem
Your app shows "Application exited early" because **NODE_ENV is wrong**

## The Solution (2 minutes)

### Step 1: Go to Render Dashboard
1. Open https://dashboard.render.com/
2. Click on your **stayindia-backend** service

### Step 2: Fix NODE_ENV
1. Click "Environment" tab on the left
2. Find the variable **NODE_ENV**
3. Current value: `development`
4. **Change it to:** `production`
5. Click "Save Changes"

### Step 3: Wait for Redeploy
- Render will automatically redeploy (takes 2-3 minutes)
- Watch the logs

### Step 4: Verify It Works
Open this URL in your browser:
```
https://your-backend-url.onrender.com/health
```

You should see:
```json
{
  "status": "ok",
  "message": "Server is running",
  "environment": "production"
}
```

## ✅ That's It!

If you see the above response, your backend is working!

## 🔍 If Still Not Working

### Check MongoDB Atlas:
1. Go to https://cloud.mongodb.com/
2. Click "Network Access" (left sidebar)
3. Make sure you see `0.0.0.0/0` in the IP list
4. If not, click "Add IP Address" → "Allow Access from Anywhere" → Confirm

### Then in Render:
1. Go back to your service
2. Click "Manual Deploy" → "Deploy latest commit"
3. Wait and check logs

## 📊 What to Look For in Logs

**Good logs (working):**
```
✅ Server running on port 5000
✅ Environment: production
✅ MongoDB connected successfully
✅ Server is ready to accept connections
```

**Bad logs (not working):**
```
❌ MongoDB connection error
❌ Application exited early
```

If you see bad logs, check MongoDB Atlas IP whitelist!

---

**The main fix is just changing NODE_ENV from `development` to `production` in Render!**
