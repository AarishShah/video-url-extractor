const VideoService = require('../services/videoService');

class VideoController {
  static async extractVideoSource(req, res) {
    try {
      const { url } = req.query;
      
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const videoService = new VideoService();
      const videoSource = await videoService.getVideoSource(url);
      
      res.json({ videoSource });
    } catch (error) {
      console.error('Error in VideoController:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VideoController;