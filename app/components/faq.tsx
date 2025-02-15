import { useRef, useEffect } from 'react'
import { urlFor } from '~/lib/sanity.image'
import type { FaqItem } from '~/types/sanity'
import gsap from 'gsap'

interface FaqProps {
  items: FaqItem[]
}

export default function Faq({ items }: FaqProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize GSAP animations
    itemRefs.current.forEach((_, index) => {
      const line = lineRefs.current[index]
      const content = contentRefs.current[index]
      const nextItems = itemRefs.current.slice(index + 1)

      if (!line || !content) return

      // Reset initial states
      gsap.set(content, { height: 0, opacity: 0 })
      gsap.set(line, { width: '100%', top: '80px' }) // Position line below title
    })
  }, [])

  const handleMouseEnter = (index: number) => {
    const line = lineRefs.current[index]
    const content = contentRefs.current[index]
    const nextItems = itemRefs.current.slice(index + 1)

    if (!line || !content) return

    const tl = gsap.timeline()

    // First move the line down
    tl.to(line, {
      top: 'auto',
      bottom: 0,
      duration: 0.3,
      ease: 'power2.inOut'
    })

    // Then show the content
    tl.to(content, {
      height: 'auto',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.1')

    // Push down subsequent items
    nextItems.forEach(item => {
      if (item) {
        tl.to(item, {
          y: content.scrollHeight,
          duration: 0.3,
          ease: 'power2.inOut'
        }, '-=0.2')
      }
    })
  }

  const handleMouseLeave = (index: number) => {
    const line = lineRefs.current[index]
    const content = contentRefs.current[index]
    const nextItems = itemRefs.current.slice(index + 1)

    if (!line || !content) return

    const tl = gsap.timeline()

    // First hide the content
    tl.to(content, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })

    // Then move the line back up
    tl.to(line, {
      top: '80px',
      bottom: 'auto',
      duration: 0.3,
      ease: 'power2.inOut'
    }, '-=0.1')

    // Return subsequent items to original position
    nextItems.forEach(item => {
      if (item) {
        tl.to(item, {
          y: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        }, '-=0.2')
      }
    })
  }

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div 
          key={index}
          ref={el => itemRefs.current[index] = el}
          className="relative py-8"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <div className="relative">
            <h3 className="text-[39px] leading-tight text-black mb-4">{item.title}</h3>
            
            {/* Line element */}
            <div 
              ref={el => lineRefs.current[index] = el}
              className="absolute left-0 right-0 border-b border-[#17283D]"
            />

            {/* Content container */}
            <div
              ref={el => contentRefs.current[index] = el}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-8 flex md:flex-row flex-col items-start">
                <p className="text-[18px] leading-normal text-[#17283D] flex-1">{item.description}</p>
                <div className="w-full md:w-[240px] md:ml-8 mt-4 md:mt-0">
                  <img 
                    src={urlFor(item.image).width(240).height(240).fit('crop').url()}
                    alt={item.title}
                    className="w-[240px] h-[240px] object-cover rounded-[30px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
