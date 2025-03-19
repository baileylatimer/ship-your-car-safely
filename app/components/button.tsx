import { Link } from '@remix-run/react'
import { useQuoteNavigation } from '~/hooks/useQuoteNavigation'
import { useTransitionNavigation } from '~/hooks/useTransitionNavigation'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'light' | 'dark'
  className?: string
  to?: string
  onClick?: () => void
  isQuoteButton?: boolean
  disabled?: boolean
}

export default function Button({ children, variant = 'dark', className = '', to, onClick, isQuoteButton, disabled }: ButtonProps) {
  const handleQuoteClick = useQuoteNavigation();
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variantStyles = {
    light: 'btn-light',
    dark: 'btn-dark'
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (isQuoteButton) {
    return (
      <button 
        onClick={(e) => {
          handleQuoteClick();
          onClick?.();
        }} 
        className={combinedClassName}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }

  const handleTransitionNavigation = useTransitionNavigation();

  if (to) {
    return (
      <button 
        onClick={(e) => handleTransitionNavigation(to, e)} 
        className={combinedClassName}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }

  return (
    <button onClick={onClick} className={combinedClassName} disabled={disabled}>
      {children}
    </button>
  )
}
