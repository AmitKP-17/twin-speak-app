
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute w-8 h-8 bg-neon-teal rounded-full opacity-30"></div>
                <div className="absolute w-6 h-6 bg-neon-teal rounded-full top-1 left-1"></div>
              </div>
              <span className="font-semibold text-xl text-foreground">
                Twin<span className="text-primary">Speak</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm mb-4">
              AI-Powered Video Avatar Generator with ultra-realistic lip-syncing and voice cloning.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'github', 'youtube'].map(platform => (
                <a 
                  key={platform} 
                  href={`#${platform}`}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <span className="sr-only">{platform}</span>
                  <div className="w-4 h-4 bg-gray-400 mask-icon-${platform}"></div>
                </a>
              ))}
            </div>
          </div>
          
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Testimonials", "API", "Security"]
            },
            {
              title: "Resources",
              links: ["Documentation", "Tutorials", "Blog", "Support", "Status"]
            },
            {
              title: "Company",
              links: ["About", "Careers", "Contact", "Privacy Policy", "Terms of Service"]
            }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-medium text-lg mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} TwinSpeak. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="hidden md:inline">•</span>
            <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
            <span className="hidden md:inline">•</span>
            <a href="#cookies" className="hover:text-primary transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
