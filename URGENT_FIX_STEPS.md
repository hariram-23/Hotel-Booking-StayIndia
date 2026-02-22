# 🚨 URGENT: Fix "Not Found" Error - Step by Step

## ⚠️ IMPORTANT: You MUST Update Render Settings Manually!

The code is correct, but Render needs you to update the build command in the dashboard.

## 📋 Follow These Exact Steps:

### Step 1: Open Render Dashboard
1. Go to: https://dashboard.render.com/
2. Login if needed

### Step 2: Find Your Frontend Service
1. You should see a list of services
2. Click on the one that shows "Not Found" (probably named `stayindia-frontend` or similar)

### Step 3: Go to Settings
1. On the left sidebar, click **"Settings"**
2. Scroll down to the **"Build & Deploy"** section

### Step 4: Update Build Command
1. Find the field labeled **"Build Command"**
2. It currently says: `npm install && npm run build`
3. **DELETE that and replace with:**
   ```
   npm install && npm run build && echo '/*    /index.html   200' > dist/_redirects
   ```
4. Make sure you copy it EXACTLY as shown above

### Step 5: Verify Publish Directory
1. Find the field labeled **"Publish Directory"**
2. It should say: `frontend/dist`
3. If it says just `dist`, change it to `frontend/dist`

### Step 6: Save Changes
1. Scroll to the bottom
2. Click the **"Save Changes"** button
3. Render will automatically start redeploying

### Step 7: Wait for Deployment
1. Go to the **"Logs"** tab (left sidebar)
2. Watch the deployment progress
3. Wait for "Build successful 🎉"
4. Wait for "Deploy live"
5. This takes about 2-3 minutes

### Step 8: Test Your Site
1. Open: `https://hotel-booking-stayindia-3.onrender.com/admin`
2. You should see the **Admin Login page** ✅
3. NOT "Not Found" ❌

## 🔍 What to Look For in Render Logs

**Good logs (working):**
```
==> Building...
==> npm install
==> npm run build
==> Build successful 🎉
==> Uploading build...
==> Deploy live
```

**If you see errors:**
- Check that the build command is copied correctly
- Make sure there are no extra spaces
- Verify the publish directory is `frontend/dist`

## 📸 Visual Reference

Your Build Command should look EXACTLY like this:
```
npm install && npm run build && echo '/*    /index.html   200' > dist/_redirects
```

Your Publish Directory should be:
```
frontend/dist
```

## ✅ After Successful Deployment

Test these URLs (replace with your actual URL):
- `https://your-url.onrender.com/` → Landing page ✅
- `https://your-url.onrender.com/admin` → Admin Login ✅
- `https://your-url.onrender.com/login` → User Login ✅
- `https://your-url.onrender.com/register` → Register page ✅

All should work without "Not Found" error!

## 🆘 Still Not Working?

### Double-Check These Settings:

1. **Root Directory**: `frontend`
2. **Build Command**: `npm install && npm run build && echo '/*    /index.html   200' > dist/_redirects`
3. **Publish Directory**: `frontend/dist`
4. **Environment Variable**: `VITE_API_URL` = `https://hotel-booking-stayindia-2.onrender.com`

### Try This Alternative Build Command:

If the above doesn't work, try:
```
npm install && npm run build && printf '/*    /index.html   200\n' > dist/_redirects
```

### Or This One:

```
npm install && npm run build && cat > dist/_redirects << 'EOF'
/*    /index.html   200
EOF
```

## 🎯 The Key Point

**The code in GitHub is correct.** You just need to update the Render dashboard settings manually. Render won't automatically pick up the new build command from your code - you have to change it in the dashboard.

Once you update the build command and redeploy, the "Not Found" error will be fixed! 🚀
