
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does TwinSpeak create realistic avatars?",
    answer: "TwinSpeak uses advanced AI models including Wav2Lip for lip-syncing, Resemble.AI for voice cloning, and GANs for facial animations to create ultra-realistic avatars from a single image and audio file."
  },
  {
    question: "What file formats are supported?",
    answer: "For images, we support PNG and JPG formats with a minimum resolution of 512x512 pixels. For audio, we support MP3 and WAV files with durations between 5-30 seconds."
  },
  {
    question: "How long does it take to generate an avatar?",
    answer: "Processing time is typically less than 10 seconds for a 30-second clip. Longer videos or batch processing may take additional time."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take security seriously. All uploaded files are encrypted and securely stored. We offer GDPR compliance and provide options for data retention controls."
  },
  {
    question: "Can I create avatars in languages other than English?",
    answer: "Absolutely! TwinSpeak supports multiple languages including Hindi and other Indian languages (coming soon). Our avatars can speak naturally in various accents and languages."
  },
  {
    question: "What video quality is available?",
    answer: "Our standard tier provides 720p video quality, while the Pro tier offers 1080p resolution. Both ensure clear, professional results suitable for business applications."
  },
  {
    question: "Can I customize my avatar's appearance?",
    answer: "Yes, we offer several options including neutral, smiling, and professional expressions. Future updates will include more customization options for clothing and backgrounds."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-gray-300">
            Find answers to common questions about TwinSpeak's avatar technology.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-black/30 border border-white/10 rounded-xl backdrop-blur-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="px-6 py-4 hover:text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-1 text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="inline-flex items-center justify-center bg-primary/10 rounded-full px-6 py-2 text-primary hover:bg-primary/20 transition-colors">
            contact@twinspeak.ai
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
