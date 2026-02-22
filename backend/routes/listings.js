const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const { isAuthenticated, isOwner } = require('../middleware/auth');
const multer = require('multer');
const { storage } = require('../config/gridfs');

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const { location, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    
    const query = {};
    if (location) {
      query.$or = [
        { location: { $regex: location, $options: 'i' } },
        { country: { $regex: location, $options: 'i' } }
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const listings = await Listing.find(query)
      .populate('owner', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Listing.countDocuments(query);

    res.json({
      listings,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('owner', 'username email')
      .populate({
        path: 'reviews',
        populate: { path: 'author', select: 'username' }
      });
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, location, country } = req.body;
    
    // Validation
    if (!title || title.trim().length < 5) {
      return res.status(400).json({ message: 'Title must be at least 5 characters long' });
    }
    if (!description || description.trim().length < 20) {
      return res.status(400).json({ message: 'Description must be at least 20 characters long' });
    }
    if (!price || isNaN(price) || Number(price) < 100) {
      return res.status(400).json({ message: 'Price must be at least ₹100 per night' });
    }
    if (Number(price) > 1000000) {
      return res.status(400).json({ message: 'Price cannot exceed ₹10,00,000 per night' });
    }
    if (!location || location.trim().length < 2) {
      return res.status(400).json({ message: 'Location is required' });
    }
    if (!country || country.trim().length < 2) {
      return res.status(400).json({ message: 'Country is required' });
    }
    
    const listing = new Listing({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      location: location.trim(),
      country: country.trim(),
      owner: req.userId,
      image: req.file ? { 
        url: `/api/images/${req.file.filename}`, 
        filename: req.file.filename 
      } : {}
    });

    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', isAuthenticated, isOwner(Listing), upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, location, country } = req.body;
    
    // Validation
    if (title && title.trim().length < 5) {
      return res.status(400).json({ message: 'Title must be at least 5 characters long' });
    }
    if (description && description.trim().length < 20) {
      return res.status(400).json({ message: 'Description must be at least 20 characters long' });
    }
    if (price && (isNaN(price) || Number(price) < 100)) {
      return res.status(400).json({ message: 'Price must be at least ₹100 per night' });
    }
    if (price && Number(price) > 1000000) {
      return res.status(400).json({ message: 'Price cannot exceed ₹10,00,000 per night' });
    }
    
    const updateData = {};
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (price) updateData.price = Number(price);
    if (location) updateData.location = location.trim();
    if (country) updateData.country = country.trim();
    
    if (req.file) {
      updateData.image = { 
        url: `/api/images/${req.file.filename}`, 
        filename: req.file.filename 
      };
    }

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(listing);
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', isAuthenticated, isOwner(Listing), async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
