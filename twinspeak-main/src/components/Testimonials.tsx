
import React from 'react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Head of L&D, TechCorp",
    content: "TwinSpeak has revolutionized our corporate training. We've created over 200 training videos in just one month, saving thousands in production costs.",
    image: "https://i.pravatar.cc/100?img=1"
  },
  {
    name: "Rahul Sharma",
    role: "E-Learning Director",
    content: "The quality of avatars is remarkable. Our students can't tell the difference between our AI instructors and real faculty members.",
    image: "https://i.pravatar.cc/100?img=2"
  },
  {
    name: "Michael Chen",
    role: "Customer Experience Lead",
    content: "We've integrated TwinSpeak into our customer service portal. The avatars handle thousands of inquiries daily with perfect consistency.",
    image: "https://i.pravatar.cc/100?img=3"
  }
];

const useCases = [
  {
    title: "Corporate Training",
    description: "Generate consistent training materials across departments with the same presenter, regardless of location or availability.",
    icon: "🎓"
  },
  {
    title: "E-Learning",
    description: "Create engaging educational content with virtual instructors that deliver lessons in multiple languages.",
    icon: "📚"
  },
  {
    title: "Customer Service",
    description: "Deploy virtual representatives that maintain consistent brand voice and appearance 24/7.",
    icon: "💬"
  },
  {
    title: "Multilingual Content",
    description: "Repurpose existing content for global audiences with perfect lip-syncing in any language.",
    icon: "🌐"
  }
];

const Testimonials = () => {
  return (
    <section id="use-cases" className="py-20 relative">
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-gray-300">
            See how organizations are using TwinSpeak to transform their content creation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((item, i) => (
            <div 
              key={i}
              className="bg-black/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-primary"
                />
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-400">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{item.content}"</p>
            </div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">Use Cases</span>
          </h2>
          <p className="text-gray-300">
            TwinSpeak is versatile and can be applied across various industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((item, i) => (
            <div 
              key={i}
              className="bg-black/30 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="text-lg font-medium mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
