const express = require('express');
const VideoController = require('../controllers/videoController');

const router = express.Router();

router.get('/extract-video', VideoController.extractVideoSource);

module.exports = router;