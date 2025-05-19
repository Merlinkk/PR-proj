"use client";

import { useState, useEffect } from 'react';
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

const teamMembers = [
  {
    name: "Mannat Patyal",
    role: "Strategic Director",
    specialties: ["Strategic Planning", "Brand Vision", "Leadership"],
    bio: "The visionary force behind NEST, Mannat transforms ideas into clear, strategic plans. With a solid background in management and a passion for meaningful communication, she leads with insight, clarity, and foresight—guiding the brand from intention to flawless execution.",
    image: "/api/placeholder/400/500",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    icon: <Brain className="w-6 h-6" />,
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
    image: "/api/placeholder/400/500",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: <Users className="w-6 h-6" />,
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
    icon: <Target className="w-6 h-6" />,
    experience: "3+ Years",
    projects: "100+",
    socials: {
      linkedin: "https://www.linkedin.com/in/satyam-sharma-a21041289/",
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
    icon: <Code className="w-6 h-6" />,
    experience: "6+ Years",
    projects: "80+",
    socials: {
      linkedin: "https://www.linkedin.com/in/anshul-kashyap-60930012b/",
      twitter: "#",
      email: "mailto:anshul@nest.com",
    },
  },
];

export function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('team-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section 
      id="team-section"
      className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/80">Meet the Innovators</span>
          </div>
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Our Team
          </h2>
          <p className={`text-gray-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Visionaries, strategists, and creators working together to build the future of brand communication
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Floating elements */}
              <div className={`absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 z-10`}>
                <div className="w-full h-full rounded-full bg-white/20 blur-sm animate-ping" />
              </div>

              {/* Main card */}
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-1 group-hover:bg-gray-900/90 transition-all duration-500">
                {/* Animated border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />
                <div className="relative bg-gray-900/95 rounded-3xl overflow-hidden">
                  
                  {/* Image section */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
                    
                    {/* Role badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${member.gradient} rounded-full text-white text-xs font-medium transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500`}>
                      <div className="flex items-center gap-1">
                        {member.icon}
                        <span>{member.role}</span>
                      </div>
                    </div>

                    {/* Stats overlay */}
                    <div className="absolute top-4 right-4 space-y-2 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                        <div className="text-xs text-white/80">Experience</div>
                        <div className="text-sm font-bold text-white">{member.experience}</div>
                      </div>
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                        <div className="text-xs text-white/80">Projects</div>
                        <div className="text-sm font-bold text-white">{member.projects}</div>
                      </div>
                    </div>
                    
                    {/* Social links */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <a 
                        href={member.socials.linkedin} 
                        className="bg-white/10 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                      >
                        <Linkedin size={16} className="text-white" />
                      </a>
                      <a 
                        href={member.socials.twitter} 
                        className="bg-white/10 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                      >
                        <Twitter size={16} className="text-white" />
                      </a>
                      <a 
                        href={member.socials.email} 
                        className="bg-white/10 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
                      >
                        <Mail size={16} className="text-white" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 text-sm font-medium">{member.role}</p>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4 space-y-2">
                      {member.specialties.map((specialty, idx) => (
                        <div 
                          key={idx}
                          className={`inline-block mr-2 mb-1 px-2 py-1 bg-gradient-to-r ${member.gradient} bg-opacity-10 rounded-md text-xs text-white/80 border border-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-300`}
                          style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                          {specialty}
                        </div>
                      ))}
                    </div>
                    
                    {/* Bio - shown on hover */}
                    <div className={`text-gray-300 text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 delay-100`}>
                      {member.bio}
                    </div>

                    {/* View profile button */}
                    <div className="mt-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                      <button className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${member.gradient} rounded-xl text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300`}>
                        <span>View Profile</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </div>

                    {/* Animated accent line */}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${member.gradient} w-0 group-hover:w-full transition-all duration-700 delay-200`} />
                  </div>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${member.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                      animation: hoveredIndex === index ? 'float 3s ease-in-out infinite' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Team stats */}
        <div className={`mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Users className="w-6 h-6" />, label: "Team Members", value: "4", gradient: "from-purple-500 to-pink-500" },
              { icon: <Target className="w-6 h-6" />, label: "Projects Completed", value: "500+", gradient: "from-blue-500 to-cyan-500" },
              { icon: <Zap className="w-6 h-6" />, label: "Years Experience", value: "15+", gradient: "from-green-500 to-teal-500" },
              { icon: <Star className="w-6 h-6" />, label: "Client Satisfaction", value: "99%", gradient: "from-yellow-500 to-orange-500" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
}