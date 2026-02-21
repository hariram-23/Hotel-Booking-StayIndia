const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Listing = require('../models/Listing');
const { isAuthenticated, isOwner } = require('../middleware/auth');

router.post('/:listingId', isAuthenticated, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { listingId } = req.params;

    // Validation
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    if (!comment || comment.trim().length < 10) {
      return res.status(400).json({ message: 'Comment must be at least 10 characters long' });
    }
    if (comment.trim().length > 500) {
      return res.status(400).json({ message: 'Comment cannot exceed 500 characters' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if user is trying to review their own listing
    if (listing.owner.toString() === req.session.userId) {
      return res.status(400).json({ message: 'You cannot review your own listing' });
    }

    const review = new Review({
      rating: Number(rating),
      comment: comment.trim(),
      author: req.session.userId,
      listing: listingId
    });

    await review.save();
    listing.reviews.push(review._id);
    await listing.save();

    await review.populate('author', 'username');
    res.status(201).json(review);
  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', isAuthenticated, isOwner(Review), async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    await Listing.findByIdAndUpdate(review.listing, {
      $pull: { reviews: req.params.id }
    });
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
