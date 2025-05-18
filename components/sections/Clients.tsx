"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Working with PulsePR transformed our brand positioning. Their strategic approach and media relationships led to coverage in publications we'd been targeting for years.",
    name: "Alex Johnson",
    title: "CMO, TechVision Inc.",
    logoUrl: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    quote: "The PulsePR team handled our product launch flawlessly. Their attention to detail and creative strategy resulted in significant media coverage and social engagement.",
    name: "Sarah Williams",
    title: "Founder, EcoStyle",
    logoUrl: "https://images.pexels.com/photos/2249063/pexels-photo-2249063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    quote: "During our company's crisis, PulsePR's quick response and clear communication strategy helped us maintain trust with our customers and protect our reputation.",
    name: "Michael Chen",
    title: "CEO, Innovate Solutions",
    logoUrl: "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    quote: "PulsePR's influencer strategy connected us with the perfect partners to authentically reach our target audience, resulting in a 200% increase in brand awareness.",
    name: "Emily Rodriguez",
    title: "Marketing Director, Urban Lifestyle",
    logoUrl: "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const brandLogos = [
  "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2249063/pexels-photo-2249063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3075988/pexels-photo-3075988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

export function ClientsSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance carousel
  useEffect(() => {
    intervalRef.current = setInterval(next, 8000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Pause auto-advance on user interaction
  const pauseAutoAdvance = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resumeAutoAdvance = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 8000);
  };

  return (
    <section id="clients" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            We've helped ambitious brands elevate their presence and achieve remarkable results.
          </p>
        </FadeIn>

        {/* Testimonials Carousel */}
        <FadeIn className="mb-20">
          <div 
            className="relative bg-white/5 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/10 overflow-hidden"
            onMouseEnter={pauseAutoAdvance}
            onMouseLeave={resumeAutoAdvance}
          >
            <div className="absolute top-8 right-8 text-white/30">
              <Quote size={60} />
            </div>
            
            <div className="relative">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
              >
                <p className="text-xl md:text-2xl font-medium mb-8 relative z-10">
                  "{testimonials[current].quote}"
                </p>
                <div className="flex items-center">
                  <div className="mr-6">
                    <p className="font-semibold">{testimonials[current].name}</p>
                    <p className="text-white/70">{testimonials[current].title}</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="absolute bottom-8 right-8 flex space-x-2">
              <button 
                onClick={prev}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={next}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="absolute bottom-8 left-8 md:left-12 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    pauseAutoAdvance();
                    setTimeout(resumeAutoAdvance, 100);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current ? "bg-white w-4" : "bg-white/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Brands Logos */}
        <FadeIn>
          <Separator className="mb-12 bg-white/10" />
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-white/70">Brands we've worked with</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {brandLogos.map((logo, index) => (
              <FadeIn key={index} delay={index * 0.1} className="flex justify-center">
                <div 
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/5 flex items-center justify-center p-4 filter grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img 
                    src={logo} 
                    alt="Brand logo" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}