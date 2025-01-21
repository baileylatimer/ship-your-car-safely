import { useState } from 'react'
import { Link } from '@remix-run/react'
import { urlFor } from '~/lib/sanity.image'

import { SanityImage, NavLink } from '~/types/sanity'

interface NavbarProps {
  logo: SanityImage
  phoneNumber: string
  navLinks: NavLink[]
}

export default function Navbar({ logo, phoneNumber, navLinks }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {logo?.asset?._ref ? (
              <img
                className="h-8 w-auto"
                src={urlFor(logo).url()}
                alt="Company logo"
              />
            ) : (
              <div className="h-8 w-20 bg-gray-200"></div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks?.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className="text-base-p font-medium text-[#17283D] hover:text-[#17283D]/80"
              >
                {link.text}
              </Link>
            ))}
            <a
              href={`tel:${phoneNumber}`}
              className="text-base-p font-medium text-[#17283D] hover:text-[#17283D]/80"
            >
              {phoneNumber}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#17283D] hover:text-[#17283D]/80"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
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
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
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
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks?.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              className="block px-3 py-2 text-base-p font-medium text-[#17283D] hover:text-[#17283D]/80"
            >
              {link.text}
            </Link>
          ))}
          <a
            href={`tel:${phoneNumber}`}
            className="block px-3 py-2 text-base-p font-medium text-[#17283D] hover:text-[#17283D]/80"
          >
            {phoneNumber}
          </a>
        </div>
      </div>
    </nav>
  )
}
