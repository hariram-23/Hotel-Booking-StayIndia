const express = require('express');
const router = express.Router();
const { getGfs } = require('../config/gridfs');

router.get('/:filename', async (req, res) => {
  try {
    const gfs = getGfs();
    
    if (!gfs) {
      return res.status(500).json({ message: 'GridFS not initialized' });
    }

    const files = await gfs.find({ filename: req.params.filename }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const file = files[0];
    
    if (file.contentType.startsWith('image/')) {
      const readStream = gfs.openDownloadStreamByName(req.params.filename);
      res.set('Content-Type', file.contentType);
      readStream.pipe(res);
    } else {
      res.status(400).json({ message: 'Not an image' });
    }
  } catch (error) {
    console.error('Error serving image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
