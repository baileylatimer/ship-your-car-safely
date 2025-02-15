import { useState, useEffect, useRef } from 'react'
import type { NavLink } from '~/types/sanity'
import type { SanityImage } from '~/types/sanity'
import { Link } from '@remix-run/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { urlFor } from '~/lib/sanity.image'
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
          <Link to="/" onClick={onClose}>
            {logo?.asset?._ref && (
              <img
                className="h-12 w-auto"
                src={urlFor(logo).url()}
                alt="Company logo"
              />
            )}
          </Link>
        </div>
<div className="flex flex-col h-full justify-between p-20 pt-0">
        {/* Navigation Links */}
        <div className="mobile-menu-links">
          <Link
            to="/about"
            className="mobile-nav-link"
            onClick={onClose}
          >
            About
          </Link>
          <Link
            to="/support"
            className="mobile-nav-link"
            onClick={onClose}
          >
            Support
          </Link>
        </div>
          <div className="flex flex-col items-center">
        {/* Get a Quote Button */}
        <button className="btn-light mobile-quote-btn">
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
        </button>

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
        <div className="mobile-menu-footer">
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
  isHomePage?: boolean
}

export default function Navbar({ logo, phoneNumber, phoneIcon, navLinks, isHomePage = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isHomePage) {
        // Non-home pages: Set dark colors with gradient
        gsap.set(navRef.current, {
          backgroundImage: 'linear-gradient(180deg, #C8D6E6 23.93%, rgba(200, 214, 230, 0.00) 100%)'
        })
        gsap.set('.nav-text', {
          color: 'var(--dark-blue-bg)',
          filter: 'brightness(0) saturate(100%) invert(13%) sepia(18%) saturate(1425%) hue-rotate(182deg) brightness(97%) contrast(88%)'
        })
      } else {
        // Home page: Set initial light colors and add scroll trigger
        gsap.set('.nav-text', {
          color: 'var(--light-blue-bg)',
          filter: 'brightness(0) saturate(100%) invert(87%) sepia(11%) saturate(307%) hue-rotate(182deg) brightness(93%) contrast(85%)'
        })
        gsap.set(navRef.current, {
          backgroundImage: 'none',
          backgroundColor: 'transparent'
        })

        ScrollTrigger.create({
          trigger: '.hero-section',
          start: `bottom top+=${navRef.current?.offsetHeight || 0}`,
          onEnter: () => {
            gsap.to(navRef.current, {
              backgroundImage: 'linear-gradient(180deg, #C8D6E6 23.93%, rgba(200, 214, 230, 0.00) 100%)',
              duration: 0.3
            })
            gsap.to('.nav-text', {
              color: 'var(--dark-blue-bg)',
              filter: 'brightness(0) saturate(100%) invert(13%) sepia(18%) saturate(1425%) hue-rotate(182deg) brightness(97%) contrast(88%)',
              duration: 0.3
            })
          },
          onLeaveBack: () => {
            gsap.to(navRef.current, {
              backgroundColor: 'transparent',
              backgroundImage: 'none',
              duration: 0.3
            })
            gsap.to('.nav-text', {
              color: 'var(--light-blue-bg)',
              filter: 'brightness(0) saturate(100%) invert(87%) sepia(11%) saturate(307%) hue-rotate(182deg) brightness(93%) contrast(85%)',
              duration: 0.3
            })
          }
        })
      }
    }
  }, [isHomePage])

  return (
    <nav 
      ref={navRef}
      className="nav-container fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="nav-content mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo - Centered */}
        <div className="logo-container">
          <Link to="/">
            {logo?.asset?._ref ? (
              <img
                className="h-12 w-auto nav-text"
                src={urlFor(logo).url()}
                alt="Company logo"
              />
            ) : (
              <div className="h-12 w-28 bg-white"></div>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center justify-start pl-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/about"
              className="text-base-p font-medium text-[var(--light-blue-bg)] nav-text pointer-events-auto"
            >
              About
            </Link>
            <Link
              to="/support"
              className="text-base-p font-medium text-[var(--light-blue-bg)] nav-text pointer-events-auto"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Right Side Navigation */}
        <div className="hidden md:flex items-center justify-end pr-4">
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center pointer-events-auto ml-4"
          >
            {phoneIcon?.asset?._ref && (
              <img
                className="h-5 w-5 pointer-events-none nav-text mr-2"
                src={urlFor(phoneIcon).url()}
                alt="Phone icon"
              />
            )}
            <span className="text-base-p font-medium text-[var(--light-blue-bg)] nav-text">{phoneNumber}</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-container flex sm:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {/* Always visible hamburger icon */}
            <svg
              className="menu-icon "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke={isHomePage ? "var(--light-blue-bg)" : "var(--dark-blue-bg)"}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
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
