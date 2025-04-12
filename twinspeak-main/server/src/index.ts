// src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {origin: "http://localhost:8080"};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define types for request bodies
interface GenerateVideoRequest {
  imageUrl: string;
}

// API Routes
app.post('/api/generate-video', async (req: Request res: Response) => {
  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }
    
    // Make request to 3rd party API
    const response = await axios.post('https://your-third-party-api.com/generate', {
      image_url: imageUrl,
      // Add any other parameters required by the 3rd party API
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`, // If API requires authentication
        'Content-Type': 'application/json'
      }
    });
    
    // Return the video URL or data from the 3rd party API
    res.json({ 
      success: true,
      videoUrl: response.data.video_url, // Adjust based on actual API response structure
      videoData: response.data // Include any other relevant data
    });
    
  } catch (error: any) {
    console.error('Error generating video:', error);
    res.status(500).json({ 
      error: 'Failed to generate video', 
      details: error.message 
    });
  }
});

// If in production, serve the React build files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
  });
}

const options = {
  method: 'POST',
  url: 'https://api.aivideoapi.com/runway/generate/image',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: '15ea159b60e284d72bb08a3e04ca6b543'
  },
  data: {
    img_prompt: 'https://files.aigen.video/imgs/ocean.jpg',
    model: 'gen3',
    image_as_end_frame: false,
    flip: false,
    motion: 5,
    seed: 0,
    callback_url: '',
    time: 5
  }
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});