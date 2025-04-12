
import React from 'react';
import { CirclePlay } from "lucide-react";

interface VideoPreviewProps {
  videoUrl: string | null;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl }) => {
  // Mock video preview for demo purposes
  const placeholderVideo = '/placeholder.svg';
  
  return (
    <div className="relative rounded-xl overflow-hidden bg-black border border-white/10">
      <div className="aspect-video flex items-center justify-center">
        {videoUrl ? (
          <video 
            controls 
            className="w-full h-full"
            poster={placeholderVideo}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CirclePlay className="w-12 h-12 text-primary" />
            </div>
            <p className="text-gray-400">Video preview unavailable</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-white/10 flex justify-between items-center">
        <div>
          <h4 className="font-medium">TwinSpeak Avatar</h4>
          <p className="text-sm text-gray-400">30 seconds • 1080p</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
            AI Generated
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
