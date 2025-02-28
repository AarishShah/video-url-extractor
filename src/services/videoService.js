const VideoModel = require('../models/videoModel');
const HttpClient = require('../utils/httpClient');
const cheerio = require('cheerio');

class VideoService {
  async getVideoSource(url) {
    try {
      const httpClient = new HttpClient();
      const html = await httpClient.get(url);
      
      const $ = cheerio.load(html);
      const videoSource = $('video source').attr('src');

      if (!videoSource) {
        throw new Error('Video source not found');
      }

      const videoModel = new VideoModel(videoSource);
      return videoModel.getSource();
    } catch (error) {
      throw new Error(`Failed to extract video source: ${error.message}`);
    }
  }
}

module.exports = VideoService;