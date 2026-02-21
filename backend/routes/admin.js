const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const multer = require('multer');
const { storage } = require('../config/gridfs');

const upload = multer({ storage });

// Get all listings (admin view)
router.get('/listings', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate('owner', 'username email')
      .populate('reviews')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings
router.get('/bookings', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'username email')
      .populate('listing', 'title location price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats
router.get('/stats', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const totalListings = await Listing.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalReviews = await Review.countDocuments();
    
    const totalRevenue = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      totalListings,
      totalUsers,
      totalBookings,
      totalReviews,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin create listing
router.post('/listings', isAuthenticated, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, location, country } = req.body;
    
    const listing = new Listing({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      location: location.trim(),
      country: country.trim(),
      owner: req.session.userId,
      image: req.file ? { 
        url: `/api/images/${req.file.filename}`, 
        filename: req.file.filename 
      } : {}
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin delete any listing
router.delete('/listings/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin delete any user
router.delete('/users/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
