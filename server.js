const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const socketIo = require('socket.io');
const http = require('http');

// Load environment variables
dotenv.config();

// Import services
const ElevenLabsService = require('./services/elevenlabs');
const DIDService = require('./services/did');
const HeyGenService = require('./services/heygen');

// Initialize services
const elevenLabsService = new ElevenLabsService(process.env.ELEVENLABS_API_KEY);
const didService = new DIDService(process.env.DID_API_KEY);
const heyGenService = new HeyGenService(process.env.HEYGEN_API_KEY);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Eleven Labs API endpoints
app.get('/api/elevenlabs/voices', async (req, res) => {
  try {
    const voices = await elevenLabsService.getVoices();
    res.json(voices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch voices' });
  }
});

app.post('/api/elevenlabs/tts', async (req, res) => {
  try {
    const { text, voice_id } = req.body;
    const audioData = await elevenLabsService.textToSpeech(text, voice_id);
    
    res.set('Content-Type', 'audio/mpeg');
    res.send(audioData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate speech' });
  }
});

// D-ID API endpoints
app.get('/api/did/presenters', async (req, res) => {
  try {
    const presenters = await didService.listPresenters();
    res.json(presenters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch presenters' });
  }
});

app.post('/api/did/talk', async (req, res) => {
  try {
    const { text, source_url } = req.body;
    const talkData = await didService.createTalkingAvatar(text, source_url);
    
    // Start polling for status updates
    if (talkData.id) {
      pollTalkStatus(talkData.id);
    }
    
    res.json(talkData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate talking avatar' });
  }
});

app.get('/api/did/talks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkStatus = await didService.getTalkStatus(id);
    res.json(talkStatus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check talk status' });
  }
});

// HeyGen API endpoints
app.get('/api/heygen/avatars', async (req, res) => {
  try {
    const avatars = await heyGenService.listAvatars();
    res.json(avatars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch avatars' });
  }
});

app.post('/api/heygen/generate', async (req, res) => {
  try {
    const { text, avatar_id } = req.body;
    const videoData = await heyGenService.generateVideo(text, avatar_id);
    
    // Start polling for status updates
    if (videoData.video_id) {
      pollVideoStatus(videoData.video_id);
    }
    
    res.json(videoData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

app.get('/api/heygen/videos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const videoStatus = await heyGenService.getVideoStatus(id);
    res.json(videoStatus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to check video status' });
  }
});

// Helper functions for polling status
function pollTalkStatus(talkId) {
  const checkStatus = async () => {
    try {
      const status = await didService.getTalkStatus(talkId);
      
      if (status.status === 'done') {
        io.emit('talk_completed', { id: talkId, result_url: status.result_url });
        return;
      } else if (status.status === 'error') {
        io.emit('talk_error', { id: talkId, error: status.error });
        return;
      }
      
      // Continue polling
      setTimeout(checkStatus, 5000);
    } catch (error) {
      io.emit('talk_error', { id: talkId, error: error.message });
    }
  };
  
  // Start polling
  checkStatus();
}

function pollVideoStatus(videoId) {
  const checkStatus = async () => {
    try {
      const status = await heyGenService.getVideoStatus(videoId);
      
      if (status.status === 'completed') {
        io.emit('video_completed', { id: videoId, video_url: status.video_url });
        return;
      } else if (status.status === 'failed') {
        io.emit('video_error', { id: videoId, error: status.error });
        return;
      }
      
      // Continue polling
      setTimeout(checkStatus, 5000);
    } catch (error) {
      io.emit('video_error', { id: videoId, error: error.message });
    }
  };
  
  // Start polling
  checkStatus();
}

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    server.listen(PORT + 1, () => {
      console.log(`Server running on http://localhost:${PORT + 1}`);
    });
  } else {
    console.error('Server error:', e);
  }
});