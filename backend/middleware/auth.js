const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Please login to continue' });
};

const isAdmin = async (req, res, next) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.session.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const isOwner = (model) => async (req, res, next) => {
  try {
    const doc = await model.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Not found' });
    }
    if (doc.owner && doc.owner.toString() !== req.session.userId) {
      return res.status(403).json({ message: 'You do not have permission' });
    }
    if (doc.author && doc.author.toString() !== req.session.userId) {
      return res.status(403).json({ message: 'You do not have permission' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { isAuthenticated, isAdmin, isOwner };
