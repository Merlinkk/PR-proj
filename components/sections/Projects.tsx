"use client";

import { useState, useRef, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ExternalLink, Star, ChevronRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client
// Replace with your actual Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          // Parse the results field if it's stored as a JSON string
          const formattedProjects = data.map(project => ({
            ...project,
            results: Array.isArray(project.results)
              ? project.results
              : typeof project.results === 'string'
                ? JSON.parse(project.results)
                : []
          }));
          localStorage.setItem("projects",JSON.stringify(formattedProjects));
          setProjects(formattedProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on selected category
  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(project => project.category === filter);

  // Dynamically generate categories based on available project categories
  const dynamicCategories = ["All", ...Array.from(new Set(projects.map(project => project.category)))];

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
              {dynamicCategories.map((category, index) => (
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

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center min-h-64">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-purple-500 border-r-indigo-500 border-b-blue-500 border-l-transparent animate-spin"></div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
            <p className="text-red-200 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600">
              Retry
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-purple-200 mb-2">No projects found</h3>
            <p className="text-white/70 mb-4">
              {filter === "All"
                ? "There are no projects available at the moment."
                : `There are no projects in the "${filter}" category.`}
            </p>
            {filter !== "All" && (
              <Button onClick={() => setFilter("All")} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                View All Projects
              </Button>
            )}
          </div>
        )}

        {/* Projects grid */}
        {!loading && !error && filteredProjects.length > 0 && (
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
                          Learn More <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </FadeInSection>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

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
                  className="bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/30 rounded-xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col lg:flex-row"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Image Section */}
                  <div className="relative lg:w-2/5 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="h-48 sm:h-64 lg:h-full"
                    >
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/20 via-transparent to-transparent" />

                    {/* Close button */}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-full hover:bg-purple-900/60 transition-colors border border-white/20 z-10"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="mb-3">
                      <span className="text-xs font-medium px-2.5 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-purple-500/30 rounded-full">
                        {selectedProject.category}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-100">
                      {selectedProject.title}
                    </h3>

                    <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-purple-200">Key Results</h4>
                      <div className="space-y-2.5">
                        {selectedProject.results.map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start bg-white/5 p-3 rounded-lg border border-purple-500/20"
                          >
                            <div className="mr-3 bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-full flex-shrink-0 mt-0.5">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <span className="text-white text-sm sm:text-base">{result}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
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