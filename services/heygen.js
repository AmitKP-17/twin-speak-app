const axios = require('axios');

class HeyGenService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.heygen.com/v1';
  }

  async generateVideo(text, avatarId = 'avatar_0') {
    try {
      const response = await axios({
        method: 'POST',
        url: `${this.baseUrl}/video/generate`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        data: {
          avatar: {
            avatar_id: avatarId
          },
          text: {
            content: text
          }
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error generating video:', error.response?.data || error.message);
      throw error;
    }
  }

  async getVideoStatus(videoId) {
    try {
      const response = await axios({
        method: 'GET',
        url: `${this.baseUrl}/video/status/${videoId}`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting video status:', error.response?.data || error.message);
      throw error;
    }
  }

  async listAvatars() {
    try {
      const response = await axios({
        method: 'GET',
        url: `${this.baseUrl}/avatars`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error listing avatars:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = HeyGenService;