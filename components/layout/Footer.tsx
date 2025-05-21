"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Facebook, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      // Here you would typically send the email to your API
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <footer className="pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 inline-block">
              NE<span className="text-white/70">ST</span>
            </Link>
            <p className="text-white/70 mt-4 max-w-md">
              A modern PR agency dedicated to elevating brands through strategic communication and innovative storytelling.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a 
                whileHover={{ y: -3 }} 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-md hover:bg-white/20 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }} 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 p-2 rounded-md hover:bg-white/20 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }} 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 p-2 rounded-md hover:bg-white/20 transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }} 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 p-2 rounded-md hover:bg-white/20 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {['PR Strategy', 'Media Relations', 'Crisis Management', 'Digital PR', 'Influencer Marketing'].map((item) => (
                <li key={item}>
                  <Link href="#services" className="text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Team', 'Careers', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to receive industry insights and our latest news.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white rounded-r-none focus-visible:ring-white/30"
                />
                <Button 
                  type="submit" 
                  className="rounded-l-none"
                >
                  <ArrowRight size={18} />
                </Button>
              </div>
              {isSubmitted && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-green-400"
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} NEST. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-white/50 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/50 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/50 text-sm hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}