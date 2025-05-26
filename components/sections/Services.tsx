"use client";

import { useState } from 'react';
import {
  Megaphone,
  Globe,
  Users,
  ArrowRight,
  Star,
  Camera,
  Briefcase,
  TrendingUp,
  Eye,
  LineChart,
  Palette,
  Lightbulb,
  Calendar,
  Youtube,
  X,
  Twitter
} from 'lucide-react';
import Link from 'next/link';

const socialPlatforms = [
  {
    name: 'Instagram',
    icon: <Camera className="w-6 h-6" />,
    users: '2.4B+',
    description: 'Visual storytelling and brand engagement through stunning imagery and stories',
    color: 'from-pink-500 to-purple-500',
    brandingBenefit: 'Perfect for lifestyle brands and visual content marketing',
    bgIcon: '📸'
  },
  {
    name: 'LinkedIn',
    icon: <Briefcase className="w-6 h-6" />,
    users: '900M+',
    description: 'Professional networking and B2B thought leadership content',
    color: 'from-blue-600 to-blue-400',
    brandingBenefit: 'Ideal for establishing industry authority and professional credibility',
    bgIcon: '💼'
  },
  {
    name: 'YouTube',
    icon: <Youtube className="w-6 h-6" />,
    users: '1.7B+',
    description: 'Viral video content and reaching younger demographics',
    color: 'from-red-500 to-pink-500',
    brandingBenefit: 'Exceptional for viral marketing and Gen Z engagement',
    bgIcon: '🎵'
  },
  {
    name: 'Twitter/X',
    icon: <Twitter className="w-6 h-6" />,
    users: '450M+',
    description: 'Real-time engagement and thought leadership discussions',
    color: 'from-gray-600 to-gray-800',
    brandingBenefit: 'Great for real-time customer service and brand conversations',
    bgIcon: '🐦'
  }
];

const services = [
  {
    id: 'public-relations',
    icon: <Megaphone className="w-8 h-8" />,
    title: 'Public Relations',
    description: 'We craft thoughtful PR strategies...',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Media Relations', 'Crisis Management', 'Reputation Building']
  },
  {
    id: 'social-media-management',
    icon: <LineChart className="w-8 h-8" />,
    title: 'Social Media Management',
    description: 'Tailored content calendars...',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['Content Strategy', 'Community Engagement', 'Performance Analytics']
  },
  {
    id: 'influence-campaigns',
    icon: <Users className="w-8 h-8" />,
    title: 'Influencer Campaigns',
    description: 'We handpick value-driven influencers...',
    gradient: 'from-red-500 to-orange-500',
    features: ['Influencer Identification', 'Campaign Management', 'Authenticity & Ethics']
  },
  {
    id: 'content-creation',
    icon: <Palette className="w-8 h-8" />,
    title: 'Content Creation',
    description: 'We create visuals, reels...',
    gradient: 'from-green-500 to-teal-500',
    features: ['Visual Storytelling', 'Short-Form Video', 'Brand Narrative Development']
  },
  {
    id: 'trend-research',
    icon: <Lightbulb className="w-8 h-8" />,
    title: 'Trend & Audience Research',
    description: 'Empathy-based, grounded responses...',
    gradient: 'from-yellow-500 to-orange-500',
    features: ['Rapid Response Planning', 'Stakeholder Communication', 'Reputation Recovery']
  },
  {
    id: 'event-management',
    icon: <Calendar className="w-8 h-8" />,
    title: 'Event Management',
    description: 'Curated brand experiences...',
    gradient: 'from-orange-500 to-pink-500',
    features: ['Complete Event Planning', 'Sponsorship & Partnerships', 'Media Coverage & Publicity']
  }
]


export function ServicesSection() {
  // Fixed type definitions to accept either null or number
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredPlatform, setHoveredPlatform] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/80">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            We deliver comprehensive PR solutions tailored to meet your unique challenges and objectives with cutting-edge strategies.
          </p>
        </div>

        {/* Social Media Platforms Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Platform Expertise
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Maximize your brand's potential across all major social media platforms with our targeted strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPlatforms.map((platform, index) => (
              <div
                key={platform.name}
                className="group relative"
                onMouseEnter={() => setHoveredPlatform(index)}
                onMouseLeave={() => setHoveredPlatform(null)}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${platform.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300`} />

                {/* Card */}
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 h-full border border-gray-800 overflow-hidden group-hover:border-gray-700 transition-all duration-300">
                  {/* Background emoji */}
                  <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">
                    {platform.bgIcon}
                  </div>

                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${platform.color}`} />

                  {/* Platform icon and name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} text-white`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{platform.name}</h4>
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-400">{platform.users} users</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {platform.description}
                  </p>

                  {/* Branding benefit */}
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {platform.brandingBenefit}
                      </p>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${platform.color} transition-all duration-300 ${hoveredPlatform === index ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Platform stats summary */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">5.5B+ Total Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Multi-Platform Strategy</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Data-Driven Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Complete PR Solutions
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From strategy to execution, we provide end-to-end PR services that drive real results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300`} />

                {/* Card */}
                <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 h-full border border-gray-800 overflow-hidden group-hover:border-gray-700 transition-all duration-300">
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient}`} />

                  {/* Icon container */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-0.5 mb-6`}>
                    <div className="flex items-center justify-center w-full h-full bg-gray-900 rounded-2xl text-white">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gray-100 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/services/${service.id}`}
                      className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all duration-300"
                    >
                      <span>Learn More</span>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>

                    {/* Hover indicator */}
                    <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${service.gradient} transition-all duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />
                  </div>


                  {/* Bottom decoration */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                    <div className={`w-full h-full rounded-tl-full bg-gradient-to-r ${service.gradient}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 p-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-r ${i === 1 ? 'from-purple-500 to-pink-500' : i === 2 ? 'from-blue-500 to-cyan-500' : i === 3 ? 'from-green-500 to-teal-500' : 'from-yellow-500 to-orange-500'} border-2 border-gray-900`} />
                ))}
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg">Join many satisfied clients</div>
                <div className="text-gray-400 text-sm">Trusted by leading brands worldwide</div>
              </div>
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
              Start Your PR Journey
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}