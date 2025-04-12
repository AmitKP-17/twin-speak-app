const axios = require('axios');

class ElevenLabsService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.elevenlabs.io/v1';
  }

  async getVoices() {
    try {
      const response = await axios({
        method: 'GET',
        url: `${this.baseUrl}/voices`,
        headers: {
          'xi-api-key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching voices:', error.response?.data || error.message);
      throw error;
    }
  }

  async textToSpeech(text, voiceId = 'EXAVITQu4vr4xnSDxMaL', modelId = 'eleven_monolingual_v1') {
    try {
      const response = await axios({
        method: 'POST',
        url: `${this.baseUrl}/text-to-speech/${voiceId}`,
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        data: {
          text,
          model_id: modelId,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        },
        responseType: 'arraybuffer'
      });
      
      return response.data;
    } catch (error) {
      console.error('Error generating speech:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = ElevenLabsService;