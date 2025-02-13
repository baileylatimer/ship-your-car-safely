import { Link } from '@remix-run/react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'light' | 'dark'
  className?: string
  to?: string
  onClick?: () => void
}

export default function Button({ children, variant = 'dark', className = '', to, onClick }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors'
  const variantStyles = {
    light: 'btn-light',
    dark: 'btn-dark'
  }

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  )
}
