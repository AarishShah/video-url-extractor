const axios = require('axios');

class httpClient {
  async get(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Referer': 'https://web.magmail.eu.org/',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-user': '?1',
          'Origin': 'https://web.magmail.eu.org',
        },
        withCredentials: true,
        maxRedirects: 5,
        timeout: 5000
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`Request failed with status code ${error.response.status}`);
      } else if (error.request) {
        throw new Error('No response received from the server');
      } else {
        throw new Error(`HTTP request failed: ${error.message}`);
      }
    }
  }
}

module.exports = httpClient;