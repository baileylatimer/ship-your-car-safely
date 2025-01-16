interface Stat {
  value: string;
  label: string;
}

interface StatisticsSectionProps {
  heading: string;
  description: string;
  stats: Stat[];
}

export default function StatisticsSection({ heading, description, stats }: StatisticsSectionProps) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {heading}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {description}
          </p>
          <a 
            href="/about" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Our story
            <svg 
              className="ml-2 -mr-1 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-100"
            >
              <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              <p className="text-base text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
