import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [twinSpeakLetters, setTwinSpeakLetters] = useState<string[]>([]);
  const fullText = "Turn Images & Audio into Lifelike Avatars";
  const brandName = "TTwinSpeak";
  const animationStarted = useRef(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (typedText === fullText) return;
    
    const timeout = setTimeout(() => {
      setTypedText(fullText.slice(0, typedText.length + 1));
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [typedText, fullText]);

  useEffect(() => {
    if (!animationStarted.current) {
      animationStarted.current = true;
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < brandName.length) {
          setTwinSpeakLetters(prev => [...prev, brandName[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 170);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Generate stable node positions
  const nodes = useMemo(() => {
    const nodeCount = 50;
    const rows = 5;
    const cols = Math.ceil(nodeCount / rows);
    const horizontalSpacing = 100 / (cols - 1);
    const verticalSpacing = 100 / (rows - 1);
    
    return Array.from({ length: nodeCount }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = col * horizontalSpacing + (Math.random() * 5 - 2.5);
      const y = row * verticalSpacing + (Math.random() * 5 - 2.5);
      
      return {
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
        opacity: Math.random() * 0.4 + 0.6
      };
    });
  }, []);

  // Generate stable connections
  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < nodes.length; i++) {
      conns.push({
        from: nodes[i],
        to: nodes[(i + 1) % nodes.length],
        width: Math.random() * 0.8 + 0.4
      });
      if (i % 2 === 0) {
        const randomIndex = Math.floor(Math.random() * nodes.length);
        if (randomIndex !== i) {
          conns.push({
            from: nodes[i],
            to: nodes[randomIndex],
            width: Math.random() * 0.6 + 0.3
          });
        }
      }
    }
    return conns;
  }, [nodes]);

  return (
    <section className="min-h-screen pt-32 pb-16 relative overflow-hidden">
      {/* Neural Network Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, rgba(63, 81, 181, 0.03) 0%, transparent 70%)',
        transition: 'background 1.5s linear'
      }}>
        {nodes.map((node) => {
          const dx = (mousePosition.x - window.innerWidth/2) / 15;
          const dy = (mousePosition.y - window.innerHeight/2) / 15;
          
          return (
            <div 
              key={node.id}
              style={{
                position: 'absolute',
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.size}px`,
                height: `${node.size}px`,
                borderRadius: '50%',
                backgroundColor: `rgba(156, 39, 176, ${node.opacity})`,
                transform: `translate(${dx}px, ${dy}px)`,
                transition: 'transform 1.8s cubic-bezier(0.16, 0.73, 0.58, 0.99)',
                boxShadow: `0 0 15px rgba(156, 39, 176, ${node.opacity * 0.7})`,
                zIndex: 2
              }}
            />
          );
        })}
        
        <svg style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.45
        }}>
          {connections.map((conn, i) => {
            const dx1 = (mousePosition.x - window.innerWidth/2) / 35;
            const dy1 = (mousePosition.y - window.innerHeight/2) / 35;
            const dx2 = (mousePosition.x - window.innerWidth/2) / 45;
            const dy2 = (mousePosition.y - window.innerHeight/2) / 45;
            
            return (
              <line
                key={i}
                x1={`${conn.from.x}%`}
                y1={`${conn.from.y}%`}
                x2={`${conn.to.x}%`}
                y2={`${conn.to.y}%`}
                stroke="rgba(156, 39, 176, 0.5)"
                strokeWidth={conn.width}
                strokeLinecap="round"
                style={{
                  transform: `translate(${(dx1 + dx2)/2.5}px, ${(dy1 + dy2)/2.5}px)`,
                  transition: 'transform 2s cubic-bezier(0.16, 0.73, 0.58, 0.99)',
                  filter: 'drop-shadow(0 0 2px rgba(156, 39, 176, 0.5))'
                }}
              />
            );
          })}
        </svg>

        <div style={{
          position: 'absolute',
          left: `${(mousePosition.x / window.innerWidth) * 100}%`,
          top: `${(mousePosition.y / window.innerHeight) * 100}%`,
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(156, 39, 176, 0.08) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          transition: 'all 2.5s linear',
          pointerEvents: 'none'
        }} />
      </div>

      <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-1/3 -left-20 w-60 h-60 rounded-full bg-primary/20 filter blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-neon-purple/20 filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span 
              style={{
                display: 'inline-block',
                background: 'linear-gradient(90deg, #3f51b5, #9c27b0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                transition: 'all 0.3s ease',
                textShadow: '0 0 8px rgba(156, 39, 176, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.textShadow = '0 0 10px rgba(156, 39, 176, 0.5), 0 0 20px rgba(156, 39, 176, 0.2)';
                e.currentTarget.style.filter = 'brightness(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.textShadow = '0 0 8px rgba(156, 39, 176, 0.3)';
                e.currentTarget.style.filter = 'brightness(1)';
              }}
            >
              {twinSpeakLetters.join('')}
            </span>
            <br />
            <span className="text-white">AI-Powered Video Avatar Generator</span>
          </h1>
          
          <h2 className="mb-8 text-xl md:text-2xl font-light text-gray-300 h-8">
            {typedText}
            <span className="inline-block w-1 h-6 bg-primary ml-1 animate-pulse"></span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg flex items-center gap-2 px-8 neon-box">
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-lg">
              Watch Demo
            </Button>
          </div>
          
          <div className="relative mx-auto mb-12">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-teal to-neon-blue opacity-50 blur-lg animate-pulse-glow"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full border border-primary/30 overflow-hidden bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-primary/50 font-light text-lg animate-pulse">Your Avatar Here</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "10 sec", label: "Processing Time" },
              { value: "90%+", label: "Realism Score" },
              { value: "1000+", label: "Concurrent Users" },
              { value: "720-1080p", label: "Video Quality" }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-bold text-primary neon-glow mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;