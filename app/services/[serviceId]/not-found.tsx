// app/services/[serviceId]/not-found.js
export default function NotFound() {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Service Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The service you're looking for doesn't exist.
        </p>
        <a
          href="/services"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Services
        </a>
      </div>
    )
  }