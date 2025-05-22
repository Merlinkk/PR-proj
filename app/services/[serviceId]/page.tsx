'use client'

import { useMemo } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import serviceContent from '@/app/services/data.json'

interface Service {
  id: string;
  name: string;
}

interface ServicePageProps {
  params: {
    serviceId: string;
  };
}

interface ServiceContent {
  [key: string]: string;
}

const services: Service[] = [
  { id: 'public-relations', name: 'Public Relations' },
  { id: 'social-media-management', name: 'Social Media Management' },
  { id: 'influence-campaigns', name: 'Influence Campaigns' },
  { id: 'content-creation', name: 'Content Creation' },
  { id: 'trend-research', name: 'Trend & Audience Research' },
  { id: 'event-management', name: 'Event Management' }
]

const markdownComponents: Components = {
  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2" {...props} />,
  h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-blue-400 mt-10 mb-4" {...props} />,
  h3: ({ node, ...props }) => <h3 className="text-xl font-medium text-gray-300 mt-8 mb-3" {...props} />,
  p: ({ node, ...props }) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />,
  li: ({ node, ...props }) => <li className="text-gray-300" {...props} />,
  strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
  code: ({ node, ...props }: any) => {
    const { inline, children, className } = props
    return inline ? (
      <code className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-sm" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-blue-900/40 text-blue-300 p-4 rounded overflow-x-auto text-sm">
        <code {...props}>{children}</code>
      </pre>
    )
  },
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-blue-400 bg-blue-900/30 p-4 rounded-r text-blue-100" {...props} />
  ),
  a: ({ node, ...props }) => <a className="text-blue-300 hover:underline" {...props} />
}

export default function ServicePage({ params }: ServicePageProps) {
  const { serviceId } = params

  // Use useMemo to compute these values consistently
  const { service, content } = useMemo(() => {
    const foundService = services.find(s => s.id === serviceId)
    const serviceContentData = (serviceContent as ServiceContent)[serviceId]
    return { service: foundService, content: serviceContentData }
  }, [serviceId])

  // If service or content is not found, render a not found page
  if (!service || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <p className="text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
          <Link 
            href="/#services" 
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.name}
            </h1>
            <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl shadow-lg border border-gray-700">
          <div className="p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white
              prose-h1:text-3xl prose-h1:mb-8 prose-h1:pb-4 prose-h1:border-b prose-h1:border-gray-700
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-blue-400
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-300
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:my-6 prose-li:my-2 prose-li:text-gray-300
              prose-ol:my-6 prose-ol:list-decimal
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-blue-300 prose-code:bg-blue-900/50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-900/30 prose-blockquote:p-4 prose-blockquote:rounded-r
              prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl p-8 text-white shadow-md">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Let's discuss your project and how we can help bring your vision to life.
            </p>
            <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-blue-100 transition-colors duration-200 shadow-lg">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}