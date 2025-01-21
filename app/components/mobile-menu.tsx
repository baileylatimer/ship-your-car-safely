import React from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber: string
}

export default function MobileMenu({ isOpen, onClose, phoneNumber }: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-primary transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="text-gray-900 hover:text-gray-700"
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
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-6 px-8 py-8">
            <a
              href="#about"
              className="text-xl font-medium text-gray-900 hover:text-gray-700"
              onClick={onClose}
            >
              About
            </a>
            <a
              href="#support"
              className="text-xl font-medium text-gray-900 hover:text-gray-700"
              onClick={onClose}
            >
              Support
            </a>
            <a
              href={`tel:${phoneNumber}`}
              className="text-xl font-medium text-gray-900 hover:text-gray-700 mt-4"
              onClick={onClose}
            >
              {phoneNumber}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
