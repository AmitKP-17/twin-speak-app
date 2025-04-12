const axios = require('axios');

class DIDService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.d-id.com';
  }

  async createTalkingAvatar(text, sourceUrl) {
    try {
      const response = await axios({
        method: 'POST',
        url: `${this.baseUrl}/talks`,
        headers: {
          'Authorization': `Basic ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        data: {
          script: {
            type: 'text',
            input: text
          },
          source_url: sourceUrl || 'https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.jpeg'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating talking avatar:', error.response?.data || error.message);
      throw error;
    }
  }

  async getTalkStatus(talkId) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${this.baseUrl}/talks/${talkId}`,
        headers: {
          'Authorization': `Basic ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting talk status:', error.response?.data || error.message);
      throw error;
    }
  }

  async listPresenters() {
    try {
      const response = await axios({
        method: 'GET',
        url: `${this.baseUrl}/presenters`,
        headers: {
          'Authorization': `Basic ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error listing presenters:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = DIDService;