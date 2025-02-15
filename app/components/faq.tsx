import { useRef, useEffect, useState } from 'react'
import { urlFor } from '~/lib/sanity.image'
import type { FaqItem } from '~/types/sanity'
import gsap from 'gsap'

interface FaqProps {
  items: FaqItem[]
}

export default function Faq({ items }: FaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Initialize GSAP animations
    itemRefs.current.forEach((_, index) => {
      const line = lineRefs.current[index]
      const content = contentRefs.current[index]

      if (!line || !content) return

      // Reset initial states
      gsap.set(content, { 
        height: 0, 
        opacity: 0
      })
      gsap.set(line, { 
        width: '100%', 
        top: '70px',
        position: 'absolute'
      })
    })
  }, [])

  const handleClick = (index: number) => {
    if (activeIndex === index) {
      // Close current item
      closeItem(index)
      setActiveIndex(null)
    } else {
      // If there's an active item, close it first
      if (activeIndex !== null) {
        const tl = gsap.timeline()
        
        // Close current item
        tl.to(contentRefs.current[activeIndex], {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in'
        })
        .to(contentRefs.current[activeIndex], {
          height: 0,
          duration: 0.25,
          ease: 'power3.inOut'
        })
        .to(lineRefs.current[activeIndex], {
          top: '70px',
          bottom: 'auto',
          duration: 0.25,
          ease: 'power3.inOut',
          onComplete: () => {
            // After previous item is closed, open new item
            openItem(index)
            setActiveIndex(index)
          }
        })

        // Reset position of items between old and new selection
        const start = Math.min(activeIndex, index)
        const end = Math.max(activeIndex, index)
        const itemsToReset = itemRefs.current.slice(start + 1, end + 1)
        if (itemsToReset.length > 0) {
          tl.to(itemsToReset, {
            y: 0,
            duration: 0.25,
            ease: 'power3.inOut'
          }, '-=0.15')
        }
      } else {
        // No active item, just open the new one
        openItem(index)
        setActiveIndex(index)
      }
    }
  }

  const openItem = (index: number) => {
    const line = lineRefs.current[index]
    const content = contentRefs.current[index]
    const nextItems = itemRefs.current.slice(index + 1)

    if (!line || !content) return

    const tl = gsap.timeline()

    // Measure content height
    const contentHeight = content.scrollHeight
    gsap.set(content, { height: 0, opacity: 0 })

    // Create timeline with all animations
    tl.to(line, {
      top: 'auto',
      bottom: 0,
      duration: 0.3,
      ease: 'power3.inOut'
    })
    .to(content, {
      height: contentHeight,
      duration: 0.3,
      ease: 'power3.out'
    }, '-=0.15')
    .to(content, {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out'
    }, '-=0.2')

    // Push down subsequent items
    if (nextItems.length > 0) {
      tl.to(nextItems, {
        y: contentHeight,
        duration: 0.3,
        ease: 'power3.inOut'
      }, '-=0.3')
    }
  }

  const closeItem = (index: number) => {
    const line = lineRefs.current[index]
    const content = contentRefs.current[index]
    const nextItems = itemRefs.current.slice(index + 1)

    if (!line || !content) return

    const tl = gsap.timeline()

    // Return items to original position first
    if (nextItems.length > 0) {
      tl.to(nextItems, {
        y: 0,
        duration: 0.3,
        ease: 'power3.inOut'
      })
    }

    // Then animate content and line
    tl.to(content, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
    .to(content, {
      height: 0,
      duration: 0.3,
      ease: 'power3.inOut'
    })
    .to(line, {
      top: '70px',
      bottom: 'auto',
      duration: 0.3,
      ease: 'power3.inOut'
    }, '-=0.15')
  }

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div 
          key={index}
          ref={el => itemRefs.current[index] = el}
          className="relative py-5 cursor-pointer"
          onClick={() => handleClick(index)}
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
              <div className="pt-5 pb-5 flex md:flex-row flex-col items-start">
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
