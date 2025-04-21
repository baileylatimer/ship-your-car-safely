import { useNavigate } from '@remix-run/react'
import { useQuoteNavigation } from '~/hooks/useQuoteNavigation'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'light' | 'dark'
  className?: string
  to?: string
  onClick?: () => void
  isQuoteButton?: boolean
}

export default function Button({ children, variant = 'dark', className = '', to, onClick, isQuoteButton }: ButtonProps) {
  const handleQuoteClick = useQuoteNavigation();
  const navigate = useNavigate();
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors'
  const variantStyles = {
    light: 'btn-light',
    dark: 'btn-dark'
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (isQuoteButton) {
    return (
      <button 
        onClick={() => {
          handleQuoteClick();
          onClick?.();
        }} 
        className={combinedClassName}
      >
        {children}
      </button>
    )
  }

  if (to) {
    return (
      <button 
        onClick={() => {
          navigate(to);
          onClick?.();
        }} 
        className={combinedClassName}
      >
        {children}
      </button>
    )
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  )
}
