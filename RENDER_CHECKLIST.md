# ✅ Render Frontend Configuration Checklist

## Your Frontend Service Settings Should Be:

### Basic Settings:
- [ ] **Name**: `stayindia-frontend` (or any name)
- [ ] **Branch**: `main`
- [ ] **Root Directory**: `frontend`

### Build & Deploy:
- [ ] **Build Command**: 
  ```
  npm install && npm run build && echo '/*    /index.html   200' > dist/_redirects
  ```
- [ ] **Publish Directory**: `frontend/dist`

### Environment Variables:
- [ ] **VITE_API_URL**: `https://hotel-booking-stayindia-2.onrender.com`

## How to Verify Each Setting:

### 1. Check Root Directory
- Go to Settings
- Look for "Root Directory"
- Should say: `frontend`
- If blank or wrong, update it

### 2. Check Build Command
- Go to Settings
- Look for "Build Command"
- Should be the long command with `echo '/*    /index.html   200' > dist/_redirects`
- Copy-paste it exactly

### 3. Check Publish Directory
- Go to Settings
- Look for "Publish Directory"
- Should say: `frontend/dist`
- NOT just `dist`

### 4. Check Environment Variable
- Go to "Environment" tab
- Should see: `VITE_API_URL`
- Value: `https://hotel-booking-stayindia-2.onrender.com`

## After Updating Settings:

1. Click "Save Changes"
2. Render auto-redeploys
3. Wait 2-3 minutes
4. Check logs for "Build successful"
5. Test: `https://your-url.onrender.com/admin`

## Common Mistakes:

❌ **Wrong**: Publish Directory = `dist`
✅ **Correct**: Publish Directory = `frontend/dist`

❌ **Wrong**: Root Directory = blank
✅ **Correct**: Root Directory = `frontend`

❌ **Wrong**: Build Command = `npm install && npm run build`
✅ **Correct**: Build Command = `npm install && npm run build && echo '/*    /index.html   200' > dist/_redirects`

## Test After Deployment:

```
https://hotel-booking-stayindia-3.onrender.com/
https://hotel-booking-stayindia-3.onrender.com/admin
https://hotel-booking-stayindia-3.onrender.com/login
https://hotel-booking-stayindia-3.onrender.com/register
```

All should work! ✅
