import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from './FileUpload';
import VideoPreview from './VideoPreview';
import { Settings, Download, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AvatarStyle = 'neutral' | 'smiling' | 'professional';
type VoiceOption = 'original' | 'synthetic';
type UploadedFile = { file: File; preview: string } | null;

const AvatarCreator = () => {
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState<UploadedFile>(null);
  const [audioFile, setAudioFile] = useState<UploadedFile>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>('neutral');
  const [voiceOption, setVoiceOption] = useState<VoiceOption>('original');
  
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageFile({
        file,
        preview: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAudioUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAudioFile({
        file,
        preview: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateAvatar = () => {
    if (!imageFile || !audioFile) {
      toast({
        title: "Missing files",
        description: "Please upload both an image and audio file.",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    setProgress(0);
    
    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setStep(3);
          // Mock video URL - in a real app, this would come from the backend
          setVideoUrl('https://example.com/sample-avatar.mp4');
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const resetCreator = () => {
    setStep(1);
    setImageFile(null);
    setAudioFile(null);
    setVideoUrl(null);
    setProgress(0);
  };

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Create Your AI Avatar</span>
          </h2>
          <p className="text-gray-300">
            Upload an image and audio to generate your lifelike AI avatar in three simple steps.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Step Indicator */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2 z-0"></div>
            <div className={`w-10 h-10 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-gray-700'} flex items-center justify-center relative z-10`}>
              <span>1</span>
            </div>
            <div className={`w-10 h-10 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-700'} flex items-center justify-center relative z-10`}>
              <span>2</span>
            </div>
            <div className={`w-10 h-10 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-gray-700'} flex items-center justify-center relative z-10`}>
              <span>3</span>
            </div>
          </div>
          
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            {step === 1 && (
              <>
                <h3 className="text-2xl font-semibold mb-6">Upload Files</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                  <div className="border-2 border-primary/30 rounded-xl p-6 bg-black/30 flex flex-col justify-center items-center h-full">
                    <FileUpload 
                      title="Upload Image" 
                      description="PNG/JPG, min. 512x512px" 
                      accept="image/*"
                      onFileSelected={handleImageUpload}
                      preview={imageFile?.preview}
                    />
                  </div>
                  
                  <div className="border-2 border-primary/30 rounded-xl p-6 bg-black/30 flex flex-col justify-center items-center h-full">
                    <FileUpload 
                      title="Upload Audio" 
                      description="MP3/WAV, 5-30 seconds"
                      accept="audio/*"
                      onFileSelected={handleAudioUpload}
                      preview={audioFile?.preview}
                      isAudio
                    />
                  </div>
                  
                  {/* Enhanced Result Preview Section */}
                  <div className="border-2 border-primary/30 rounded-xl p-6 bg-black/30 flex flex-col justify-center items-center h-full">
                    <h4 className="font-medium text-xl mb-6 text-center">Avatar Preview</h4>
                    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                      {imageFile ? (
                        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/50">
                          <img 
                            src={imageFile.preview} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : (
                        <div className="w-64 h-64 rounded-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-500 text-center p-4">Your talking avatar will appear here after generation</span>
                        </div>
                      )}
                      
                      <div className="w-full">
                        {audioFile ? (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-center">Audio Preview</h5>
                            <audio controls className="w-full">
                              <source src={audioFile.preview} type={audioFile.file.type} />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        ) : (
                          <div className="w-full h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Audio preview will appear here</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={resetCreator}>Clear</Button>
                  <Button 
                    className="bg-primary text-primary-foreground"
                    disabled={!imageFile || !audioFile}
                    onClick={() => setStep(2)}
                  >
                    Next: Configure
                  </Button>
                </div>
              </>
            )}
            
            {step === 2 && (
              <>
                <h3 className="text-2xl font-semibold mb-6">Configure Avatar</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Avatar Style</h4>
                      <Tabs defaultValue="neutral" value={avatarStyle} onValueChange={(v) => setAvatarStyle(v as AvatarStyle)}>
                        <TabsList className="w-full bg-black/60 border border-white/10">
                          <TabsTrigger value="neutral" className="flex-1">Neutral</TabsTrigger>
                          <TabsTrigger value="smiling" className="flex-1">Smiling</TabsTrigger>
                          <TabsTrigger value="professional" className="flex-1">Professional</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Voice Options</h4>
                      <Tabs defaultValue="original" value={voiceOption} onValueChange={(v) => setVoiceOption(v as VoiceOption)}>
                        <TabsList className="w-full bg-black/60 border border-white/10">
                          <TabsTrigger value="original" className="flex-1">Original (Cloned)</TabsTrigger>
                          <TabsTrigger value="synthetic" className="flex-1">Synthetic (TTS)</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      <h4 className="font-medium">Advanced Settings</h4>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-lg">
                      <p className="text-gray-400 text-sm">Background locked to Pure Black (#000000) for optimal visual experience.</p>
                    </div>
                  </div>
                  
                  {/* Enhanced Preview Section */}
                  <div className="border-2 border-primary/30 rounded-xl p-6 bg-black/30 flex flex-col justify-center items-center h-full">
                    <h4 className="font-medium text-xl mb-6 text-center">Preview</h4>
                    <div className="flex flex-col items-center justify-center space-y-6">
                      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/50">
                        {imageFile && (
                          <img 
                            src={imageFile.preview} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                      
                      {audioFile && (
                        <div className="w-full space-y-2">
                          <h5 className="text-sm font-medium text-center">Audio Preview</h5>
                          <audio controls className="w-full">
                            <source src={audioFile.preview} type={audioFile.file.type} />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button 
                    className="bg-primary text-primary-foreground"
                    onClick={handleGenerateAvatar}
                  >
                    Generate Avatar
                  </Button>
                </div>
              </>
            )}
            
            {processing && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-black/80 border border-white/10 rounded-xl p-8 max-w-md w-full">
                  <h3 className="text-2xl font-semibold mb-6 text-center">Generating your AI Avatar...</h3>
                  
                  <div className="mb-8">
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-gray-400 mt-2">{progress}%</p>
                  </div>
                  
                  <div className="flex justify-center animate-pulse">
                    <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-primary animate-spin"></div>
                  </div>
                  
                  <p className="text-center text-gray-300 mt-6">
                    This may take up to 10 seconds for a 30-second clip.
                  </p>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <>
                <h3 className="text-2xl font-semibold mb-6">Your Avatar is Ready!</h3>
                
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-2/3">
                    <VideoPreview videoUrl={videoUrl} />
                  </div>
                  <div className="lg:w-1/3 border-2 border-primary/30 rounded-xl p-6 bg-black/30 flex flex-col justify-center items-center">
                    <h4 className="font-medium text-xl mb-4 text-center">Share Your Creation</h4>
                    <div className="space-y-4 w-full">
                      <div className="space-y-2 flex flex-col items-center">
                        <h5 className="font-medium">Original Image</h5>
                        {imageFile && (
                          <img 
                            src={imageFile.preview} 
                            alt="Original" 
                            className="w-32 h-32 rounded-lg object-cover" 
                          />
                        )}
                      </div>
                      <div className="space-y-2 w-full">
                        <h5 className="font-medium text-center">Audio Used</h5>
                        {audioFile && (
                          <audio controls className="w-full">
                            <source src={audioFile.preview} type={audioFile.file.type} />
                            Your browser does not support the audio element.
                          </audio>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <Button className="bg-primary text-primary-foreground flex items-center gap-2">
                    <Download className="w-5 h-5" /> Download MP4
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share className="w-5 h-5" /> Share Link
                  </Button>
                  <Button variant="outline" onClick={resetCreator}>
                    Create Another
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvatarCreator;