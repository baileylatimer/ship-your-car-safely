import { Link } from '@remix-run/react'
import { Footer as FooterType, SanityImage } from '~/types/sanity'
import Button from './button'
import { urlFor } from '~/lib/sanity.image'

interface FooterProps {
  footer: FooterType
  phoneNumber: string
  phoneIcon: SanityImage
}

export default function Footer({ footer, phoneNumber, phoneIcon }: FooterProps) {
  console.log('Footer Props:', { footer, phoneNumber, phoneIcon }); // Debug log
  return (
    <footer className="relative bg-primary-blue text-light-blue-bg py-16 rounded-t-[30px]">
      {/* Wing element */}
      <div className="absolute right-0 top-12 w-full hidden md:block">
        <div className="relative flex flex-col items-end">
          <div className="w-[270px] h-16 border-0 bg-light-blue-bg rounded-bl-[82px] mb-6" />
          <div className="w-[210px] h-16 border-0 bg-light-blue-bg rounded-bl-[82px] mb-6" />
          <div className="w-[150px] h-16 border-0 bg-light-blue-bg rounded-bl-[82px]" />
        </div>
      </div>

      <div className="w-full ml-auto px-10 relative z-10 flex flex-col md:gap-14 sm:gap-3">
        {/* Main content */}
        <div className="text-center mb-12 md:mr-auto md:ml-0 sm:mx-auto">
          <h1 className="text-5xl font-medium mb-6">{footer.heading}</h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <Button variant="light" className="text-lg" onClick={() => window.location.href = '#quote'}>
              {footer.buttonText}
              <svg className="ml-2 w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
            <div className="flex items-center gap-2">
              <p className="text-xl max-w-2xl md:mx-0">{footer.paragraph}</p>
              <div className="flex items-center gap-2">
                <img 
                  src={phoneIcon ? urlFor(phoneIcon).url() : ''} 
                  alt="Phone" 
                  className="w-6 h-6 [filter:brightness(0)_saturate(100%)_invert(89%)_sepia(8%)_saturate(754%)_hue-rotate(183deg)_brightness(96%)_contrast(88%)]" 
                />
                <a href={`tel:${phoneNumber}`} className="text-xl">
                  {phoneNumber}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="mb-4 md:mb-0">&copy; 2025 Ship Your Car Safely</p>
          
          {/* Navigation links */}
          <div className="flex gap-12 mb-4 md:mb-0 text-lg">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/support" className="hover:text-white transition-colors">Support</Link>
          </div>

          {/* Social links */}
          <div className="flex gap-6">
            {footer.socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src={urlFor(link.icon).url()}
                  alt="Social media"
                  className="w-6 h-6"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
