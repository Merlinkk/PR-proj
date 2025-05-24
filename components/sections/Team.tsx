"use client";

import { useState, useEffect, memo, useMemo } from 'react';
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowUpRight,
  Star,
  Zap,
  Code,
  Target,
  Users,
  Brain
} from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  gradient: string;
  specialties: string[];
}

const teamMembers = [
  {
    name: "Mannat Patyal",
    role: "Strategic Director",
    specialties: ["Strategic Planning", "Brand Vision", "Leadership"],
    bio: "The visionary force behind NEST, Mannat transforms ideas into clear, strategic plans. With a solid background in management and a passion for meaningful communication, she leads with insight, clarity, and foresight—guiding the brand from intention to flawless execution.",
    image: "https://firebasestorage.googleapis.com/v0/b/start-it-up-421905.appspot.com/o/WhatsApp%20Image%202025-05-20%20at%2023.28.32_73da70c7.jpg?alt=media&token=aae78d5f-4378-4c1f-9add-f79bc34c32f7",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    icon: <Brain className="w-5 h-5" />,
    experience: "5+ Years",
    projects: "150+",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:mannat@nest.com",
    },
  },
  {
    name: "Uday Thakur",
    role: "Communication & Client Experience Lead",
    specialties: ["Client Relations", "Communication", "Project Management"],
    bio: "The connection between ideas and execution, Uday brings structure, clarity, and warmth to every client interaction. With deep expertise in communication and a sharp sense for client needs, he ensures that projects move seamlessly from planning to delivery.",
    image:"https://firebasestorage.googleapis.com/v0/b/start-it-up-421905.appspot.com/o/Image_20250520_204257_507.jpeg?alt=media&token=5f3b6f44-e39a-4a03-8c51-c6a16dceb1b0",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: <Users className="w-5 h-5" />,
    experience: "4+ Years",
    projects: "200+",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:uday@nest.com",
    },
  },
  {
    name: "Satyam Sharma",
    role: "SEO Specialist",
    specialties: ["Technical SEO", "Analytics", "Content Strategy"],
    bio: "SEO specialist with hands-on industry experience. Skilled in developing and implementing data-driven SEO strategies that improve search rankings, increase organic traffic, and enhance online visibility across various domains.",
    image: "https://media.licdn.com/dms/image/v2/D5603AQEGd7dEr_LTew/profile-displayphoto-shrink_800_800/B56ZZWq5M2GoAc-/0/1745210807848?e=1753315200&v=beta&t=TTzwISw9toWGjMsDABUST7jY8eDh99CAfVg6cOhOtY8",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    icon: <Target className="w-5 h-5" />,
    experience: "3+ Years",
    projects: "100+",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:satyam@nest.com",
    },
  },
  {
    name: "Anshul Kashyap",
    role: "Tech Lead",
    specialties: ["Full-Stack Development", "Team Leadership", "Architecture"],
    bio: "Tech Lead with strong experience in building and managing scalable web applications. Focused on writing clean, maintainable code and driving projects from planning to production with a strategic approach.",
    image: "https://media.licdn.com/dms/image/v2/D5603AQE1HgVB4uFB4g/profile-displayphoto-shrink_800_800/B56ZZM.n3eHoAc-/0/1745048208002?e=1753315200&v=beta&t=zjj02tY7Z_NQPG4w91NInBKDqvCFEGtYebljLwbjMrw",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    icon: <Code className="w-5 h-5" />,
    experience: "6+ Years",
    projects: "80+",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "mailto:anshul@nest.com",
    },
  },
];

export function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('team');
    if (element) {
      observer.observe(element);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (isMobile) {
      setHoveredIndex(hoveredIndex === index ? null : index);
    }
  };

  return (
    <section 
      id="team"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/80">Meet the Innovators</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Our Team
          </h2>
          <p className={`text-gray-400 max-w-3xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Visionaries, strategists, and creators working together to build the future of brand communication
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group relative transition-all duration-500 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              onClick={() => handleCardClick(index)}
            >
              {/* Main card */}
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-1 group-hover:bg-gray-900/90 transition-all duration-500">
                {/* Animated border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10 blur-sm ${hoveredIndex === index ? 'opacity-60' : ''}`} />
                
                <div className="relative bg-gray-900/95 rounded-3xl overflow-hidden">
                  
                  {/* Image section */}
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Hover/Active overlay with details */}
                    <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-500 flex flex-col justify-center items-center p-4 ${
                      (hoveredIndex === index) ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}>
                      
                      {/* Role */}
                      <div className={`mb-4 px-4 py-2 bg-gradient-to-r ${member.gradient} rounded-full text-white text-sm font-semibold flex items-center gap-2 shadow-xl border border-white/20 transform transition-all duration-500 delay-100 ${
                        hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                        {member.icon}
                        <span className="text-center">{member.role}</span>
                      </div>

                      {/* Stats */}
                      <div className="space-y-3">
                        <div className={`bg-black/70 backdrop-blur-md rounded-lg px-4 py-3 border border-white/10 text-center transform transition-all duration-500 delay-200 ${
                          hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                          <div className="text-xs text-white/70 mb-1">Experience</div>
                          <div className="text-lg font-bold text-white">{member.experience}</div>
                        </div>
                        <div className={`bg-black/70 backdrop-blur-md rounded-lg px-4 py-3 border border-white/10 text-center transform transition-all duration-500 delay-300 ${
                          hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                          <div className="text-xs text-white/70 mb-1">Projects</div>
                          <div className="text-lg font-bold text-white">{member.projects}</div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom info overlay - Always visible */}
                    <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 transition-opacity duration-500 ${
                      hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                    }`}>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                        {member.name}
                      </h3>
                      <p className="text-gray-300 text-xs md:text-sm font-medium">
                        {isMobile ? member.role.split(' ').slice(0, 2).join(' ') : member.role}
                      </p>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="p-4 md:p-6">
                    {/* Bio text */}
                    <div className="mb-4 md:mb-6">
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 md:line-clamp-4 group-hover:text-white transition-colors duration-300">
                        {member.bio}
                      </p>
                    </div>

                    {/* Specialties - Show on hover/active */}
                    <div className={`mb-4 md:mb-6 transition-all duration-500 ${
                      hoveredIndex === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, idx) => (
                          <div 
                            key={idx}
                            className={`px-2 md:px-3 py-1 bg-gradient-to-r ${member.gradient} bg-opacity-20 rounded-full text-xs text-white border border-white/20 transform transition-all duration-300`}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                          >
                            {specialty}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social links and action */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2 md:space-x-3">
                        <a 
                          href={member.socials.linkedin} 
                          className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin size={14} className="text-white md:w-4 md:h-4" />
                        </a>
                        <a 
                          href={member.socials.twitter} 
                          className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Twitter size={14} className="text-white md:w-4 md:h-4" />
                        </a>
                        <a 
                          href={member.socials.email} 
                          className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail size={14} className="text-white md:w-4 md:h-4" />
                        </a>
                      </div>

                      {/* View profile button */}
                      <button 
                        className={`inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r ${member.gradient} rounded-xl text-white text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                          hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Connect</span>
                        <ArrowUpRight size={12} className="md:w-3.5 md:h-3.5" />
                      </button>
                    </div>

                    {/* Animated accent line */}
                    <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${member.gradient} transition-all duration-700 ${
                      hoveredIndex === index ? 'w-full' : 'w-0'
                    }`} />
                  </div>
                </div>
              </div>

              {/* Enhanced floating particles - Desktop only */}
              {!isMobile && hoveredIndex === index && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-r ${member.gradient} rounded-full animate-float opacity-70`}
                      style={{
                        left: `${15 + (i % 3) * 30}%`,
                        top: `${10 + Math.floor(i / 3) * 40}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: `${2 + (i % 3) * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile instruction */}
        {isMobile && (
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Tap on team cards to see more details
            </p>
          </div>
        )}

        {/* Team stats */}
        <div className={`mt-16 md:mt-20 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: <Users className="w-5 h-5 md:w-6 md:h-6" />, label: "Team Members", value: "4", gradient: "from-purple-500 to-pink-500" },
              { icon: <Target className="w-5 h-5 md:w-6 md:h-6" />, label: "Projects", value: "500+", gradient: "from-blue-500 to-cyan-500" },
              { icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />, label: "Years Experience", value: "15+", gradient: "from-green-500 to-teal-500" },
              { icon: <Star className="w-5 h-5 md:w-6 md:h-6" />, label: "Client Satisfaction", value: "99%", gradient: "from-yellow-500 to-orange-500" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${stat.gradient} mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{stat.value}</div>
                <div className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg) scale(1.2); 
            opacity: 1;
          }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}