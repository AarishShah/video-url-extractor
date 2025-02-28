const axios = require('axios');

class httpClient {
  async get(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Cache-Control': 'max-age=0'
        },
        timeout: 5000,
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Accept status codes between 200 and 499
        }
      });

      if (response.status === 403) {
        throw new Error('Access forbidden. The website might be blocking our requests.');
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`Request failed with status code ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`HTTP request failed: ${error.message}`);
      }
    }
  }
}

module.exports = httpClient;