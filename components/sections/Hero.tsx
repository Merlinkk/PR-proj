"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TextReveal } from '@/components/animations/TextReveal';
import { ArrowDownCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import type { ComponentType } from 'react';

export function HeroSection() {
  const [SplineComponent, setSplineComponent] = useState<ComponentType<any> | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import Spline only on client side
    const loadSpline = async () => {
      try {
        const SplineModule = await import('@splinetool/react-spline');
        setSplineComponent(() => SplineModule.default);
      } catch (error) {
        console.error('Failed to load Spline:', error);
      }
    };

    loadSpline();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
    
      {/* Floating circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-white/5"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{ 
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            transition={{ 
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content and logo */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left content */}
        <div className="max-w-3xl text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 font-medium text-lg md:text-xl text-white/70"
          >
            Modern PR Agency
          </motion.div>

          <div className="mb-8">
            <TextReveal
              text="Elevating brands through strategic communications and storytelling."
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              delay={0.1}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/70 text-lg md:text-xl max-w-xl mb-8"
          >
            We connect brands with their audiences through powerful storytelling and strategic PR campaigns that deliver measurable results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="text-black bg-white hover:bg-white/90 px-8"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10"
            >
              Our Services
            </Button>
          </motion.div>
        </div>

        <div className="w-full md:w-[700px] h-[600px] mt-10 md:mt-0">
          {isClient && SplineComponent ? (
            <SplineComponent 
              scene="https://prod.spline.design/thUbGSqyi-grDZKO/scene.splinecode"
              style={{ 
                background: 'transparent',
                width: '100%',
                height: '100%'
              }}
            />
          ) : (
            <div className="w-full h-full bg-white/5 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-white/50">Loading 3D Scene...</div>
            </div>
          )}
        </div>
      </div>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a href="#services">
            <ArrowDownCircle className="w-10 h-10 text-white/50 hover:text-white transition-colors" />
          </a>
        </motion.div>
      </motion.div> */}
    </section>
  );
}