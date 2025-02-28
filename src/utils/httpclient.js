const axios = require('axios');

class httpClient {
  async get(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`HTTP request failed: ${error.message}`);
    }
  }
}

module.exports = httpClient;