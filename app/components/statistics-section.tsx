import { useTextAnimation } from "~/hooks/useTextAnimation";
import Button from './button';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

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
  const [isMounted, setIsMounted] = useState(false);
  const { ref: statsRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="sm:py-10 py-5">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          ref={useTextAnimation(heading)}
          className="text-h2-mobile md:text-h2 font-medium mb-16 text-[#17283D]"
        >
          {heading}
        </h2>
        
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr,auto] lg:gap-[100px] lg:items-start">
          <div className="max-w-xl lg:max-w-none w-full relative">
            {/* Decorative bars */}
            <p className="text-base-p font-book text-[#17283D]/80 mb-8">
              {description}
            </p>
            <Button 
              variant="dark" 
              className="group mb-16 w-auto"
              to="/about"
            >
              Our story
              <svg className="ml-2 w-4 h-4 -rotate-45 transition-transform group-hover:rotate-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>

            {/* Decorative bars */}
            <div className="hidden lg:block -ml-40">
              <div className="relative">
                <div className="w-[320px] h-14 border border-[#17283D] rounded-br-[82px] mb-4" />
                <div className="w-[260px] h-14 border border-[#17283D] rounded-br-[82px] mb-4" />
                <div className="w-[200px] h-14 border border-[#17283D] rounded-br-[82px]" />
              </div>
            </div>
          </div>

          <div ref={statsRef} className="mt-16 lg:mt-0 grid grid-cols-2 gap-[10px] w-full lg:grid lg:grid-cols-2 lg:gap-[8px] lg:gap-y-2">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`bg-light-blue-bg rounded-[30px] px-[12px] py-5 lg:px-[30px] lg:pt-10 lg:pb-5 border border-[#17283D] w-full lg:w-[320px]`}
              >
                <div className="flex items-center font-medium text-[#17283D] mb-2 whitespace-nowrap">
                  <span className="text-stat-mobile lg:text-stat leading-none">
                    {(inView && isMounted) ? (
                      <CountUp
                        start={0}
                        end={Number(stat.value.replace(/[^0-9]/g, ''))}
                        duration={2}
                        separator=","
                      >
                        {({ countUpRef }) => (
                          <span ref={countUpRef} />
                        )}
                      </CountUp>
                    ) : (
                      <span>0</span>
                    )}
                    {stat.value.includes('K') && 'K'}
                    {stat.value.includes('hrs') && 'hrs'}
                  </span>
                  {(stat.value.includes('+') || stat.value.includes('%')) && (
                    <span className="text-symbol-mobile lg:text-symbol leading-none mt-1">
                      {stat.value.includes('+') ? '+' : '%'}
                    </span>
                  )}
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
