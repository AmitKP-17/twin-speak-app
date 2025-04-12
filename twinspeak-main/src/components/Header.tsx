import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 md:px-8 border-b",
        scrolled ? "bg-black/70 backdrop-blur-lg border-border" : "bg-transparent border-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 group transform transition-all duration-300 hover:scale-[1.02]">
              <div className="relative w-8 h-8">
                <div className="absolute w-8 h-8 bg-teal-500 rounded-full opacity-30"></div>
                <div className="absolute w-6 h-6 bg-teal-500 rounded-full top-1 left-1"></div>
              </div>
              <span className="font-semibold text-xl text-foreground">
                Twin<span className="text-primary group-hover:text-primary/90 group-hover:drop-shadow-[0_0_8px_rgba(20,184,166,0.7)] transition-all duration-300">Speak</span>
              </span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8 h-full">
            <a 
              href="#features" 
              className="relative text-foreground group h-full flex items-center"
              onClick={() => handleLinkClick('features')}
            >
              <span className={cn(
                "transition-all duration-300",
                activeLink === 'features' ? "scale-105 text-primary drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]" : 
                "group-hover:scale-105 group-hover:text-primary group-hover:drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]"
              )}>
                Features
              </span>
              <span className={cn(
                "absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300",
                activeLink === 'features' ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </a>
            <a 
              href="#how-it-works" 
              className="relative text-foreground group h-full flex items-center"
              onClick={() => handleLinkClick('how-it-works')}
            >
              <span className={cn(
                "transition-all duration-300",
                activeLink === 'how-it-works' ? "scale-105 text-primary drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]" : 
                "group-hover:scale-105 group-hover:text-primary group-hover:drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]"
              )}>
                How It Works
              </span>
              <span className={cn(
                "absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300",
                activeLink === 'how-it-works' ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </a>
            <a 
              href="#use-cases" 
              className="relative text-foreground group h-full flex items-center"
              onClick={() => handleLinkClick('use-cases')}
            >
              <span className={cn(
                "transition-all duration-300",
                activeLink === 'use-cases' ? "scale-105 text-primary drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]" : 
                "group-hover:scale-105 group-hover:text-primary group-hover:drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]"
              )}>
                Use Cases
              </span>
              <span className={cn(
                "absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300",
                activeLink === 'use-cases' ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </a>
            <a 
              href="#pricing" 
              className="relative text-foreground group h-full flex items-center"
              onClick={() => handleLinkClick('pricing')}
            >
              <span className={cn(
                "transition-all duration-300",
                activeLink === 'pricing' ? "scale-105 text-primary drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]" : 
                "group-hover:scale-105 group-hover:text-primary group-hover:drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]"
              )}>
                Pricing
              </span>
              <span className={cn(
                "absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300",
                activeLink === 'pricing' ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </a>
            <a 
              href="#faq" 
              className="relative text-foreground group h-full flex items-center"
              onClick={() => handleLinkClick('faq')}
            >
              <span className={cn(
                "transition-all duration-300",
                activeLink === 'faq' ? "scale-105 text-primary drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]" : 
                "group-hover:scale-105 group-hover:text-primary group-hover:drop-shadow-[0_0_5px_rgba(20,184,166,0.4)]"
              )}>
                FAQ
              </span>
              <span className={cn(
                "absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300",
                activeLink === 'faq' ? "w-full" : "w-0 group-hover:w-full"
              )}></span>
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary/10">
              Sign In
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create Avatar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;