const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');
const { sendBookingConfirmationEmail, sendCheckInReminderEmail } = require('../config/email');

router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { listingId, checkIn, checkOut } = req.body;

    // Validation
    if (!listingId || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user is trying to book their own listing
    if (listing.owner.toString() === req.session.userId) {
      return res.status(400).json({ message: 'You cannot book your own listing' });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date validations
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    if (checkInDate < today) {
      return res.status(400).json({ message: 'Check-in date cannot be in the past' });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    const daysDiff = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    if (daysDiff > 365) {
      return res.status(400).json({ message: 'Booking cannot exceed 365 days' });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      listing: listingId,
      $or: [
        { checkIn: { $lte: checkOutDate }, checkOut: { $gte: checkInDate } }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'These dates are not available. Please choose different dates.' });
    }

    const totalPrice = daysDiff * listing.price;

    const booking = new Booking({
      listing: listingId,
      user: req.session.userId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice
    });

    await booking.save();

    // Get user details for email
    const user = await User.findById(req.session.userId);
    
    // Send booking confirmation email
    try {
      await sendBookingConfirmationEmail(user.email, user.username, {
        listingTitle: listing.title,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalPrice,
        nights: daysDiff
      });
      console.log('Booking confirmation email sent to:', user.email);
    } catch (emailError) {
      console.error('Failed to send booking confirmation email:', emailError);
      // Don't fail the booking if email fails
    }

    // Schedule check-in reminder email
    scheduleCheckInReminder(user.email, user.username, {
      listingTitle: listing.title,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Function to schedule check-in reminder
const scheduleCheckInReminder = (userEmail, userName, bookingDetails) => {
  const checkInDate = new Date(bookingDetails.checkIn);
  const now = new Date();
  
  // Calculate time until check-in date (at 8 AM on check-in day)
  checkInDate.setHours(8, 0, 0, 0);
  const timeUntilCheckIn = checkInDate.getTime() - now.getTime();
  
  // If check-in is in the future, schedule the reminder
  if (timeUntilCheckIn > 0) {
    setTimeout(async () => {
      try {
        await sendCheckInReminderEmail(userEmail, userName, bookingDetails);
        console.log('Check-in reminder sent to:', userEmail);
      } catch (error) {
        console.error('Failed to send check-in reminder:', error);
      }
    }, timeUntilCheckIn);
    
    console.log(`Check-in reminder scheduled for ${checkInDate.toLocaleString()}`);
  }
};

router.get('/my-bookings', isAuthenticated, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.session.userId })
      .populate('listing')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
