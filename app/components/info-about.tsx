import { useState } from 'react'

interface InfoItem {
  title: string
  description: string
}

interface InfoAboutProps {
  items: InfoItem[]
}

export default function InfoAbout({ items }: InfoAboutProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div 
          key={index}
          className="relative border-b border-[#17283D] py-8"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex flex-col md:flex-row items-start justify-between overflow-hidden">
            <h3 className="text-[39px] leading-tight text-black mb-4 md:mb-0">{item.title}</h3>
            <div 
              className="w-full md:ml-16 md:flex-1 md:max-w-[45%]"
              style={{
                maxHeight: hoveredIndex === index ? '1000px' : '0',
                opacity: hoveredIndex === index ? 1 : 0,
                transition: `
                  max-height 0.5s cubic-bezier(0.33, 1, 0.68, 1),
                  opacity 0.3s ease-in-out
                `
              }}
            >
              <p className="text-[18px] leading-normal text-[#17283D]">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
