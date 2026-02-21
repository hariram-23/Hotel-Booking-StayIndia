# ⚡ Quick Start Guide

Get the Airbnb clone running in 5 minutes!

## 🚀 Installation

### Terminal 1 - Backend

```bash
cd backend
npm install
npm run seed
npm run dev
```

✅ Backend running on http://localhost:5000

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on http://localhost:5173

## 🎯 Access the App

Open your browser: **http://localhost:5173**

## 🔑 Demo Login

- **Email**: demo@example.com
- **Password**: password123

## ✨ What You Can Do

1. **Browse** - View 6 sample listings
2. **Search** - Filter by location or price
3. **Create** - Add your own listing with image
4. **Review** - Rate and comment on listings
5. **Book** - Reserve dates for a listing
6. **Manage** - Edit/delete your own listings

## 📸 Image Uploads

Images are stored in MongoDB using GridFS:
- ✅ No external service needed
- ✅ No API keys required
- ✅ Works immediately after setup

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Storage**: GridFS (MongoDB)
- **Auth**: Sessions + bcrypt

## 📝 Environment

Already configured in `backend/.env`:
```
MONGODB_URI=mongodb+srv://hari:hari@cluster0.isork0b.mongodb.net/airbnb-clone
PORT=5000
SESSION_SECRET=your-super-secret-session-key-change-in-production
```

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB connection
- Verify port 5000 is free

**Frontend won't start?**
- Check port 5173 is free
- Ensure backend is running first

**Can't login?**
- Run `npm run seed` in backend folder
- Clear browser cookies

## 📚 Documentation

- **README.md** - Full documentation
- **INSTALLATION.md** - Detailed setup guide
- **FEATURES.md** - Complete feature list
- **PROJECT_SUMMARY.md** - Technical overview

## 🎉 You're Ready!

Start exploring the app and building your own features!
