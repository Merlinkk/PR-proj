"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { 
  Megaphone, 
  BarChart3, 
  ShieldAlert, 
  Globe, 
  Users, 
  PenTool
} from 'lucide-react';

const services = [
  {
    icon: <Megaphone className="w-10 h-10" />,
    title: 'PR Strategy',
    description: 'Develop comprehensive PR strategies aligned with your business goals and target audience needs.',
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    title: 'Media Relations',
    description: 'Build and maintain relationships with key media outlets to secure valuable coverage for your brand.',
  },
  {
    icon: <ShieldAlert className="w-10 h-10" />,
    title: 'Crisis Management',
    description: 'Navigate challenging situations with strategic communication plans that protect your reputation.',
  },
  {
    icon: <Globe className="w-10 h-10" />,
    title: 'Digital PR',
    description: 'Extend your reach online through digital PR tactics that improve visibility and engagement.',
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: 'Influencer Marketing',
    description: 'Connect with relevant influencers to amplify your message and reach new audiences authentically.',
  },
  {
    icon: <PenTool className="w-10 h-10" />,
    title: 'Content Creation',
    description: 'Craft compelling stories and content that resonates with your audience and drives engagement.',
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            We deliver comprehensive PR solutions tailored to meet your unique challenges and objectives.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeIn 
              key={service.title} 
              delay={index * 0.1}
              direction="up"
              className="h-full"
            >
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 h-full border border-white/10 relative overflow-hidden"
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0"
                  animate={{
                    opacity: activeIndex === index ? 0.15 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <div className="text-white mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/70">{service.description}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}