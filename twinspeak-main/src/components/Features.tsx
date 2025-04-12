
import React from 'react';
import { cn } from "@/lib/utils";
import { Check, Image, Mic, FileVideo, Calendar, Bell, Settings } from "lucide-react";

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className,
  iconClassName 
}: { 
  title: string; 
  description: string; 
  icon: any;
  className?: string;
  iconClassName?: string;
}) => (
  <div className={cn(
    "relative p-6 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group",
    className
  )}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
    <div className={cn(
      "w-12 h-12 rounded-full flex items-center justify-center mb-4 text-primary bg-primary/10",
      iconClassName
    )}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="py-20 relative">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-gray-300">
            TwinSpeak combines cutting-edge AI technologies to deliver ultra-realistic avatars with perfect lip-sync, 
            voice cloning, and natural facial expressions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <FeatureCard 
            title="Pure Black UI" 
            description="Minimalist, distraction-free interface designed for a sleek, immersive experience."
            icon={Settings}
            className="bg-black/40"
            iconClassName="bg-primary/10"
          />
          <FeatureCard 
            title="Ultra-Realistic Avatars" 
            description="AI-driven facial micro-expressions for lifelike video presentations."
            icon={FileVideo}
            className="bg-black/40"
            iconClassName="bg-primary/10"
          />
          <FeatureCard 
            title="Voice Cloning" 
            description="Preserve tone, accent, and emotion with advanced voice synthesis."
            icon={Mic}
            className="bg-black/40"
            iconClassName="bg-primary/10"
          />
          <FeatureCard 
            title="Low Latency" 
            description="Less than 10 second processing time for 30-second video clips."
            icon={Calendar}
            className="bg-black/40"
            iconClassName="bg-primary/10"
          />
          <FeatureCard 
            title="Scalable Processing" 
            description="Enterprise-grade batch processing for high-volume needs."
            icon={Bell}
            className="bg-black/40"
            iconClassName="bg-primary/10"
          />
          <FeatureCard 
            title="High Resolution" 
            description="Download avatars in high quality 720p and 1080p formats."
            icon={Image}
            className="bg-black/40"
            iconClassName="bg-primary/10"
          />
        </div>
        
        <div className="max-w-4xl mx-auto bg-black/40 border border-white/10 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">Enterprise-Ready Solutions</h3>
              <p className="text-gray-300 mb-6">
                TwinSpeak scales to meet the needs of organizations of all sizes. Our enterprise solutions offer:
              </p>
              <ul className="space-y-3">
                {[
                  "Batch processing for multiple avatars",
                  "Custom integration via API",
                  "Dedicated support team",
                  "Enhanced security & compliance",
                  "Future-proof for Indian languages"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-teal to-neon-blue opacity-30 blur-lg"></div>
                <div className="relative w-64 h-64 rounded-full border border-primary/30 overflow-hidden bg-black flex items-center justify-center">
                  <div className="text-xl text-primary/70 font-light">Enterprise</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
