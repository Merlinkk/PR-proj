'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/Header';

const services = [
  {
    id: 'public-relations',
    name: 'Public Relations',
    description: 'Strategic narrative and brand communication'
  },
  {
    id: 'social-media-management',
    name: 'Social Media Management',
    description: 'Content planning, posting & audience engagement'
  },
  {
    id: 'influence-campaigns',
    name: 'Influence Campaigns',
    description: 'Value-aligned influencer strategy and execution'
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    description: 'Creative storytelling through visual media'
  },
  {
    id: 'trend-research',
    name: 'Trend & Audience Research',
    description: 'Emotional, cultural, and behavioral insight mapping'
  },
  {
    id: 'event-management',
    name: 'Event Management',
    description: 'Brand experiences that captivate and resonate'
  }
]

interface ServicesLayoutProps {
  children: ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white antialiased mt-20">
      <div className="max-w-[1400px] mx-auto py-6 px-2 sm:px-4">
        {/* Back button */}
        {/* <button
          onClick={() => router.push('/')}
          className="mb-4 inline-flex items-center gap-1 text-blue-400 hover:text-blue-600 transition-colors text-sm font-medium"
          aria-label="Back to Home"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back</span>
        </button> */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Our Services</h1>
          <p className="mt-2 text-gray-300">Discover what we can do for you</p>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-500 transition"
          >
            {menuOpen ? 'Hide Services Menu' : 'Show Services Menu'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          {(menuOpen || typeof window === 'undefined' || window.innerWidth >= 1024) && (
            <div className="lg:w-1/4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4 sticky top-8">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Services Menu
                </h2>
                <nav className="space-y-2">
                  {services.map((service) => {
                    const isActive = pathname === `/services/${service.id}`
                    return (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        className={`block p-3 rounded-lg transition-all duration-200 ${isActive
                            ? 'bg-blue-600/20 border-l-4 border-blue-400 text-blue-300'
                            : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                          }`}
                        onClick={() => setMenuOpen(false)} // close menu on mobile when clicked
                      >
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          {service.description}
                        </div>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700 p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
