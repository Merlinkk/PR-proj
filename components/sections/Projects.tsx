"use client";

import { useState, useRef, ReactNode } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ExternalLink, Star, ChevronRight } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  results: string[];
};

type FadeInSectionProps = {
  children: ReactNode;
  delay?: number;
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

const FadeInSection = ({ children, delay = 0 }: FadeInSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Generate star particles for cosmic theme
const StarField = () => {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-purple-950/30 to-black">
      <StarField />
      
      {/* Cosmic blur gradient */}
      <div className="absolute top-40 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <FadeInSection>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <Star className="h-8 w-8 text-purple-400 absolute -top-4 -right-6" />
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-400">
                  Our Stellar Work
                </h2>
              </div>
            </motion.div>
            <p className="text-white/70 max-w-3xl mx-auto text-lg">
              Explore our cosmos of successful PR campaigns and strategies across various industries.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-pink-900/10 rounded-2xl blur-sm -z-10" />
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Button
                    variant={filter === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(category)}
                    className={filter === category 
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:from-indigo-600 hover:to-purple-700" 
                      : "border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40"
                    }
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInSection>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <FadeInSection key={project.id} delay={0.1 * index}>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group h-full"
                >
                  <motion.div
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)" 
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300,
                      damping: 20
                    }}
                    className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl overflow-hidden h-full border border-purple-500/20 cursor-pointer relative"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="w-full overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                      </AspectRatio>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="text-xs font-medium px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-purple-500/30 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/70 mb-4 group-hover:text-white/90 transition-colors">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center text-indigo-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View case study <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </FadeInSection>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/30 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full overflow-hidden">
                    <motion.div
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-72 object-cover"
                      />
                    </motion.div>
                    
                    {/* Cosmic overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-purple-900/50 transition-colors border border-white/20"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <div className="mb-4">
                      <span className="text-xs font-medium px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-purple-500/30 rounded-full">
                        {selectedProject.category}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-100">
                      {selectedProject.title}
                    </h3>
                    
                    <p className="text-white/80 text-lg mb-8 leading-relaxed">
                      {selectedProject.description}
                    </p>
                    
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-4 text-purple-200">Key Results</h4>
                      <div className="space-y-4">
                        {selectedProject.results.map((result, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start bg-white/5 p-4 rounded-lg border border-purple-500/20"
                          >
                            <div className="mr-4 bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-full">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <span className="text-white">{result}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 py-6">
                        View Full Case Study
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}