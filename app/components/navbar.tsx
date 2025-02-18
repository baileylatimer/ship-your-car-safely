import { useState, useEffect, useRef } from 'react'
import type { NavLink } from '~/types/sanity'
import type { SanityImage } from '~/types/sanity'
import { Link, useLocation } from '@remix-run/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { urlFor } from '~/lib/sanity.image'
import Button from './button'
import TransitionLink from './TransitionLink'
import '../styles/navbar.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function MobileMenu({ isOpen, onClose, phoneNumber, navLinks, logo, phoneIcon }: {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
  navLinks: NavLink[]
  logo: SanityImage
  phoneIcon: SanityImage
}) {
  return (
    <>
      {/* Menu */}
      <div className={`mobile-menu-panel ${isOpen ? 'open' : ''}`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="close-button"
          aria-label="Close menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="mobile-menu-logo">
          <TransitionLink to="/" className="block" onClick={onClose}>
            {logo?.asset?._ref && (
              <img
                className="h-12 w-auto"
                src={urlFor(logo).url()}
                alt="Company logo"
              />
            )}
          </TransitionLink>
        </div>
        <div className="flex flex-col h-full justify-between p-20 pt-0">
          {/* Navigation Links */}
          <div className="mobile-menu-links">
            <TransitionLink
              to="/about"
              className="mobile-nav-link"
              onClick={onClose}
            >
              About
            </TransitionLink>
            <TransitionLink
              to="/support"
              className="mobile-nav-link"
              onClick={onClose}
            >
              Support
            </TransitionLink>
          </div>
          <div className="flex flex-col items-center">
            {/* Get a Quote Button */}
            <Button 
              isQuoteButton 
              variant="light" 
              className="mobile-quote-btn"
              onClick={onClose}
            >
              Get a quote
              <svg 
                className="arrow-icon" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>

            {/* Phone Number */}
            <a href={`tel:${phoneNumber}`} className="mobile-phone-number">
              {phoneIcon?.asset?._ref && (
                <img
                  className="h-5 w-5 mr-2"
                  src={urlFor(phoneIcon).url()}
                  alt="Phone icon"
                />
              )}
              <span>{phoneNumber}</span>
            </a>
          </div>
        </div>
        {/* Footer Text */}
        <div className="mobile-menu-footer w-full flex justify-between">
          <p>Ship Your Car Safely</p>
          <p>©2025</p>
        </div>
      </div>
    </>
  )
}

interface NavbarProps {
  logo: SanityImage
  phoneNumber: string
  phoneIcon: SanityImage
  navLinks: NavLink[]
}

export default function Navbar({ logo, phoneNumber, phoneIcon, navLinks }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    if (typeof window === 'undefined' || !navRef.current) return

    ScrollTrigger.getAll().forEach(trigger => trigger.kill()) // Kill previous triggers to prevent duplication

    if (isHomePage) {
      gsap.set(navRef.current, {
        backgroundColor: 'transparent',
        backgroundImage: 'none',
      })

      gsap.set('.nav-text', {
        color: 'var(--light-blue-bg)',
        filter: 'brightness(0) saturate(100%) invert(87%) sepia(11%) saturate(307%) hue-rotate(182deg) brightness(93%) contrast(85%)',
      })

      gsap.set('.home-nav-quote-btn', { opacity: 0, y: -20, display: 'none' })

      ScrollTrigger.create({
        trigger: '.hero-section',
        start: `bottom top+=${navRef.current?.offsetHeight || 0}`,
        onEnter: () => {
          gsap.to(navRef.current, {
            backgroundImage: 'linear-gradient(180deg, #C8D6E6 23.93%, rgba(200, 214, 230, 0.00) 100%)',
            duration: 0.3,
          })
          gsap.to('.nav-text', {
            color: 'var(--dark-blue-bg)',
            filter: 'brightness(0) saturate(100%) invert(13%) sepia(18%) saturate(1425%) hue-rotate(182deg) brightness(97%) contrast(88%)',
            duration: 0.3,
          })
          gsap.to('.home-nav-quote-btn', { opacity: 1, y: 0, display: 'inline-flex', duration: 0.3, ease: 'power2.out' })
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, { backgroundColor: 'transparent', backgroundImage: 'none', duration: 0.3 })
          gsap.to('.nav-text', {
            color: 'var(--light-blue-bg)',
            filter: 'brightness(0) saturate(100%) invert(87%) sepia(11%) saturate(307%) hue-rotate(182deg) brightness(93%) contrast(85%)',
            duration: 0.3,
          })
          gsap.to('.home-nav-quote-btn', { 
            opacity: 0, 
            y: -20, 
            duration: 0.3, 
            ease: 'power2.in', 
            onComplete: () => {
              gsap.set('.home-nav-quote-btn', { display: 'none' })
            }
          })
        },
      })
    } else {
      gsap.set(navRef.current, {
        backgroundImage: 'linear-gradient(180deg, #C8D6E6 23.93%, rgba(200, 214, 230, 0.00) 100%)',
      })
    }
  }, [isHomePage])

  return (
    <nav ref={navRef} className="nav-container fixed top-0 left-0 right-0 z-50">
      <div className="nav-content mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="logo-container">
          <TransitionLink to="/">
            {logo?.asset?._ref ? (
              <img className={`h-12 w-auto ${isHomePage ? 'nav-text' : ''}`} src={urlFor(logo).url()} alt="Company logo" />
            ) : (
              <div className="h-12 w-28 bg-white"></div>
            )}
          </TransitionLink>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 mx-6">
          <div className="flex gap-6">
            <TransitionLink to="/about" className={`text-base-p font-medium ${isHomePage ? 'nav-text' : ''}`}>About</TransitionLink>
            <TransitionLink to="/support" className={`text-base-p font-medium ${isHomePage ? 'nav-text' : ''}`}>Support</TransitionLink>
          </div>
        </div>

        {/* Right-side Buttons */}
        <div className="hidden md:flex items-center space-x-6 mr-6">
          <Button isQuoteButton variant="dark" className={`${isHomePage ? 'home-nav-quote-btn' : 'nav-quote-btn'} group`}>
            Get a quote
            <svg className="ml-2 w-4 h-4 -rotate-45 transition-transform group-hover:rotate-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <a href={`tel:${phoneNumber}`} className={`flex items-center ${isHomePage ? 'nav-text' : ''}`}>
            {phoneIcon?.asset?._ref && <img className={`h-5 w-5 mr-2 ${isHomePage ? 'nav-text' : ''}`} src={urlFor(phoneIcon).url()} alt="Phone icon" />}
            <span className={`text-base-p font-medium ${isHomePage ? 'nav-text' : ''}`}>{phoneNumber}</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="mobile-menu-container">
        <button onClick={() => setIsOpen(true)}>
          <svg className={`h-6 w-6 ${isHomePage ? 'nav-text' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <MobileMenu 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        phoneNumber={phoneNumber}
        navLinks={navLinks}
        logo={logo}
        phoneIcon={phoneIcon}
      />
    </nav>
  )
}
