"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ExternalLink } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  results: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "TechVision Rebrand Launch",
    category: "Brand Strategy",
    description: "Complete rebrand and PR campaign for a leading tech innovator, positioning them as an industry thought leader.",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    results: ["200+ media placements", "3M social impressions", "75% increase in brand awareness"],
  },
  {
    id: 2,
    title: "EcoStyle Product Launch",
    category: "Product Launch",
    description: "Strategic product launch campaign for a sustainable fashion brand, emphasizing their eco-friendly practices.",
    image: "https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    results: ["Featured in 15 top-tier publications", "150% website traffic increase", "Sold out initial product run in 48 hours"],
  },
  {
    id: 3,
    title: "HealthPlus Crisis Management",
    category: "Crisis Management",
    description: "Rapid response crisis management for a healthcare provider, protecting their reputation during a data breach.",
    image: "https://images.pexels.com/photos/3957986/pexels-photo-3957986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    results: ["90% positive sentiment recovery", "Minimized customer churn", "Industry recognition for transparency"],
  },
  {
    id: 4,
    title: "Global Finance Summit",
    category: "Event PR",
    description: "Comprehensive PR for an international finance conference, securing high-profile speakers and media coverage.",
    image: "https://images.pexels.com/photos/2504834/pexels-photo-2504834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    results: ["100+ journalists attended", "50M media impressions", "Trended on social media for 48 hours"],
  },
  {
    id: 5,
    title: "FoodDelight Influencer Campaign",
    category: "Influencer Marketing",
    description: "Influencer-led campaign for a food delivery service, focusing on authentic content creation and engagement.",
    image: "https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    results: ["Collaborated with 50+ influencers", "300% increase in app downloads", "5x ROI on campaign investment"],
  },
  {
    id: 6,
    title: "Urban Living Digital PR",
    category: "Digital PR",
    description: "Digital-first PR strategy for a real estate developer, highlighting their innovative urban living concepts.",
    image: "https://images.pexels.com/photos/4458554/pexels-photo-4458554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    results: ["15 backlinks from DA80+ sites", "Featured in major industry publications", "200% increase in qualified leads"],
  },
];

const categories = ["All", "Brand Strategy", "Product Launch", "Crisis Management", "Event PR", "Influencer Marketing", "Digital PR"];

export function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            Explore our portfolio of successful PR campaigns and strategies across various industries.
          </p>
        </FadeIn>

        <FadeIn className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className={filter === category 
                  ? "bg-white text-black hover:bg-white/90" 
                  : "border-white/20 text-white/70 hover:text-white hover:bg-white/10"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </FadeIn>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <FadeIn
                key={project.id}
                className="h-full"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/5 rounded-xl overflow-hidden h-full border border-white/10 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="w-full">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-xs font-medium px-2 py-1 bg-white/10 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-white/70 mb-4">{project.description}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-black border border-white/20 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-white/10 rounded-full">
                      {selectedProject.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{selectedProject.title}</h3>
                  <p className="text-white/80 mb-6">{selectedProject.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Key Results</h4>
                    <ul className="space-y-2">
                      {selectedProject.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-green-400">✓</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-white text-black hover:bg-white/90">
                    View Full Case Study
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}