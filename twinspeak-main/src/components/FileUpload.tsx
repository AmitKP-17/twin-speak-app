
import React, { useRef, useState } from 'react';
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  title: string;
  description: string;
  accept: string;
  onFileSelected: (file: File) => void;
  preview?: string | null;
  isAudio?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  title,
  description,
  accept,
  onFileSelected,
  preview = null,
  isAudio = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelected(new File([], ''));
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 transition-all duration-300", 
        isDragging 
          ? "border-primary border-dashed bg-primary/5" 
          : preview 
            ? "border-white/20 bg-white/5" 
            : "border-white/10 hover:border-white/20"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {!preview ? (
        <div 
          className="flex flex-col items-center justify-center py-8 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="w-7 h-7 text-primary" />
          </div>
          <h4 className="text-lg font-medium mb-2">{title}</h4>
          <p className="text-sm text-gray-400">{description}</p>
          <Button 
            variant="ghost"
            size="sm" 
            className="mt-4 text-primary"
          >
            Browse Files
          </Button>
        </div>
      ) : (
        <div className="relative">
          <Button 
            size="icon" 
            variant="destructive" 
            className="absolute top-2 right-2 w-8 h-8 rounded-full z-10"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
          </Button>
          
          {isAudio ? (
            <div className="py-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-1 bg-primary" 
                      style={{
                        height: `${8 + Math.random() * 16}px`,
                        animation: `pulse-glow ${1 + Math.random()}s ease-in-out infinite`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <audio controls className="w-full max-w-[250px]">
                <source src={preview} />
                Your browser does not support the audio element.
              </audio>
              <p className="mt-3 text-sm text-gray-400">Audio file uploaded successfully</p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border border-white/20">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="text-sm text-gray-400">Image uploaded successfully</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
