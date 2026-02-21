# Admin Dashboard Guide

## ✅ What's New

### 1. Landing Page Behavior
- **Non-logged-in users**: See beautiful landing page with features, destinations, and CTA
- **Logged-in users**: Directly see hotel listings with search functionality
- **Admin users**: See listings + access to Admin Dashboard

### 2. Admin Role System
- Added `role` field to User model (`user` or `admin`)
- Admin middleware for protected routes
- Admin-only dashboard access

### 3. Admin Dashboard Features

#### Overview Tab
- **Statistics Cards**:
  - Total Listings
  - Total Users
  - Total Bookings
  - Total Revenue (in ₹)
  
- **Quick Actions**:
  - Create New Listing
  - Refresh Data

#### Listings Tab
- View all listings with thumbnails
- See owner information
- Quick actions: View, Edit, Delete
- Admin can delete ANY listing (not just their own)

#### Users Tab
- View all registered users
- See username, email, and role
- Delete users (except other admins)

#### Bookings Tab
- View all bookings across the platform
- See guest information
- View booking dates and total price

### 4. Admin Credentials

**Email**: `admin@example.com`
**Password**: `admin123`

**Regular User**:
**Email**: `demo@example.com`
**Password**: `password123`

## 🚀 How to Access Admin Dashboard

1. Login with admin credentials
2. Click the "⚙️ Admin" button in the navbar (only visible to admins)
3. Navigate through tabs to manage the platform

## 📊 Admin Capabilities

### What Admins Can Do:
✅ View all listings, users, and bookings
✅ Create new listings
✅ Edit any listing
✅ Delete any listing
✅ Delete users (except other admins)
✅ View platform statistics
✅ Monitor total revenue

### What Regular Users Can Do:
✅ View listings
✅ Create their own listings
✅ Edit/delete only their own listings
✅ Book properties
✅ Leave reviews
✅ View their bookings

## 🔐 Security Features

1. **Role-Based Access Control**:
   - Admin routes protected by `isAdmin` middleware
   - Regular users cannot access admin endpoints
   - Automatic redirect if non-admin tries to access dashboard

2. **Authorization Checks**:
   - Backend validates user role on every admin request
   - Frontend hides admin UI elements from non-admins
   - Session-based authentication

3. **Protected Actions**:
   - Only admins can delete any listing
   - Only admins can delete users
   - Only admins can view all bookings

## 📱 User Experience Flow

### For Non-Logged-In Users:
1. See landing page with features
2. Click "Get Started" → Login/Register
3. After login → See listings

### For Regular Users:
1. Login → See listings immediately
2. Can create, edit, delete own listings
3. Can book properties and leave reviews

### For Admin Users:
1. Login → See listings immediately
2. See "Admin" button in navbar
3. Access full admin dashboard
4. Manage entire platform

## 🎨 UI Features

### Admin Dashboard Design:
- Clean, modern interface
- Tab-based navigation
- Statistics cards with icons
- Table views for data
- Action buttons for quick access
- Responsive layout

### Color Coding:
- Admin link: Pink/Red (#E61E4D)
- Delete buttons: Red
- Primary actions: Gradient blue/purple
- Stats cards: White with shadows

## 📝 API Endpoints

### Admin Routes (Protected):
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/listings` - Get all listings
- `GET /api/admin/users` - Get all users
- `GET /api/admin/bookings` - Get all bookings
- `POST /api/admin/listings` - Create listing as admin
- `DELETE /api/admin/listings/:id` - Delete any listing
- `DELETE /api/admin/users/:id` - Delete user

## 🔄 Testing the System

### Test as Regular User:
1. Login with: demo@example.com / password123
2. Verify you see listings (no landing page)
3. Verify NO "Admin" button in navbar
4. Try to create/edit/delete your own listings
5. Try to book a property

### Test as Admin:
1. Login with: admin@example.com / admin123
2. Verify you see listings (no landing page)
3. Verify "Admin" button appears in navbar
4. Click Admin → See dashboard
5. Navigate through all tabs
6. Try deleting a listing
7. Try viewing all users and bookings

### Test as Guest (Not Logged In):
1. Visit homepage
2. Verify you see the landing page
3. Verify features, destinations, and CTA sections
4. Click "Get Started" → Should go to login

## 💡 Tips

1. **Admin Dashboard**: Bookmark `/admin` for quick access
2. **Data Refresh**: Use the refresh button to update stats
3. **Bulk Actions**: Delete multiple items by clicking delete on each
4. **User Management**: Be careful when deleting users (action is permanent)
5. **Revenue Tracking**: Total revenue updates automatically with new bookings

## 🎯 Future Enhancements (Optional)

- [ ] Bulk delete operations
- [ ] Export data to CSV
- [ ] Advanced filtering and search
- [ ] User role management (promote users to admin)
- [ ] Activity logs
- [ ] Email notifications for admin actions
- [ ] Analytics charts and graphs
- [ ] Booking approval system
- [ ] Featured listings management
- [ ] Platform settings configuration

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify you're logged in with correct credentials
3. Ensure backend server is running
4. Check that you have admin role in database

---

**Your Airbnb Clone is now complete with full admin capabilities!** 🎉
