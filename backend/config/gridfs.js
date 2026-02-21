const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'uploads'
    };
  }
});

let gfs;
mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});

const getGfs = () => gfs;

module.exports = { storage, getGfs };
