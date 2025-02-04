import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Link } from '@remix-run/react'
import { urlFor } from '~/lib/sanity.image'
import { SanityImage, NavLink } from '~/types/sanity'
import '../styles/navbar.css'

interface NavbarProps {
  logo: SanityImage
  phoneNumber: string
  phoneIcon: SanityImage
  navLinks: NavLink[]
}

export default function Navbar({ logo, phoneNumber, phoneIcon, navLinks }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 150 && !isOpen) {
        setHidden(true)
      } else {
        setHidden(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  return (
    <motion.nav 
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="nav-container fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-between nav-items">
          {/* Logo */}
          <div className="w-1/4 flex items-center">
            {logo?.asset?._ref ? (
              <img
                className="h-12 w-auto mix-blend-exclusion filter [filter:invert(1)] pointer-events-none"
                src={urlFor(logo).url()}
                alt="Company logo"
              />
            ) : (
              <div className="h-12 w-28 bg-white"></div>
            )}
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center space-x-8">
            {navLinks?.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className="text-base-p font-medium mix-blend-exclusion filter [filter:invert(1)] pointer-events-auto"
              >
                {link.text}
              </Link>
            ))}
            </div>
          </div>

          {/* Phone Number */}
          <div className="w-1/4 flex items-center justify-end">
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center space-x-2 pointer-events-auto"
            >
              {phoneIcon?.asset?._ref && (
                <img
                  className="h-5 w-5 mix-blend-exclusion filter [filter:invert(1)] pointer-events-none"
                  src={urlFor(phoneIcon).url()}
                  alt="Phone icon"
                />
              )}
              <span className="text-base-p font-medium mix-blend-exclusion filter [filter:invert(1)]">{phoneNumber}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md pointer-events-auto"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6 mix-blend-exclusion filter [filter:invert(1)]`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6 mix-blend-exclusion filter [filter:invert(1)]`}
                xmlns="http://www.w3.org/2000/svg"
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
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-[#17283D]/90`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks?.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              className="block px-3 py-2 text-base-p font-medium mix-blend-exclusion filter [filter:invert(1)] pointer-events-auto"
            >
              {link.text}
            </Link>
          ))}
          <a
            href={`tel:${phoneNumber}`}
            className="block px-3 py-2 text-base-p font-medium mix-blend-exclusion filter [filter:invert(1)] pointer-events-auto"
          >
            {phoneNumber}
          </a>
        </div>
      </div>
    </motion.nav>
  )
}
