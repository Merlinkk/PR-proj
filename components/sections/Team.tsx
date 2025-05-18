"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: "Alexandra Morgan",
    role: "Founder & CEO",
    bio: "Former journalist with 15+ years of experience in media relations and strategic communications for Fortune 500 companies.",
    image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:alexandra@pulsepr.com",
    },
  },
  {
    name: "David Chen",
    role: "Head of Media Relations",
    bio: "Specialized in building long-term relationships with key media outlets and securing high-impact placements.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:david@pulsepr.com",
    },
  },
  {
    name: "Sophia Reynolds",
    role: "Creative Director",
    bio: "Award-winning creative with expertise in developing innovative campaigns that capture audience attention and drive engagement.",
    image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:sophia@pulsepr.com",
    },
  },
  {
    name: "Marcus Johnson",
    role: "Crisis Management Specialist",
    bio: "Expert in navigating complex reputational challenges with strategic communication approaches that protect brand integrity.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:marcus@pulsepr.com",
    },
  },
];

export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="team" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Our diverse team of PR specialists brings unique expertise and perspectives to every client challenge.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <FadeIn
              key={member.name}
              delay={index * 0.1}
              direction="up"
              className="h-full"
            >
              <motion.div
                className="bg-white/5 rounded-xl overflow-hidden h-full relative group"
                onHoverStart={() => setActiveIndex(index)}
                onHoverEnd={() => setActiveIndex(null)}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0 }}
                  />
                  
                  {/* Social links */}
                  <motion.div
                    className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: activeIndex === index ? 0 : 20, 
                      opacity: activeIndex === index ? 1 : 0 
                    }}
                    transition={{ delay: 0.1 }}
                  >
                    <a 
                      href={member.socials.linkedin} 
                      className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href={member.socials.twitter} 
                      className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                    <a 
                      href={member.socials.email} 
                      className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Mail size={18} />
                    </a>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-white/70 mb-4">{member.role}</p>
                  <p className="text-white/80 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}