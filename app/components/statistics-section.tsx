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
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2-mobile md:text-h2 font-medium mb-16 text-[#17283D]">
          {heading}
        </h2>
        
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr,auto] lg:gap-[100px] lg:items-start">
          <div className="max-w-xl lg:max-w-none w-full relative">
            {/* Decorative bars */}
            <p className="text-base-p font-book text-[#17283D]/80 mb-8">
              {description}
            </p>
            <a 
              href="/about" 
              className="inline-flex items-center px-10 py-3 border border-transparent text-base-p font-medium rounded-[20px] text-[#C8D6E6] bg-[#17283D] hover:bg-[#17283D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#17283D] mb-16"
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

            {/* Decorative bars */}
            <div className="hidden lg:block -ml-40">
              <div className="relative">
                <div className="w-[320px] h-14 border border-[#17283D] rounded-br-[82px] mb-4" />
                <div className="w-[260px] h-14 border border-[#17283D] rounded-br-[82px] mb-4" />
                <div className="w-[200px] h-14 border border-[#17283D] rounded-br-[82px]" />
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-0 grid grid-cols-2 gap-[10px] w-full lg:grid lg:grid-cols-2 lg:gap-[8px] lg:gap-y-2">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`bg-light-blue-bg rounded-[30px] px-[12px] py-5 lg:px-[30px] lg:pt-10 lg:pb-5 border border-[#17283D] w-full lg:w-[320px]`}
              >
                <div className="flex items-start font-medium text-[#17283D] mb-2 whitespace-nowrap">
                  <span className="text-stat-mobile lg:text-stat leading-none">{stat.value.replace(/[+%]/g, '')}</span>
                  <span className="text-symbol-mobile lg:text-symbol leading-none mt-1">{stat.value.match(/[+%]/)?.[0] || ''}</span>
                </div>
                <p className="text-base-p font-book text-[#17283D]/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
