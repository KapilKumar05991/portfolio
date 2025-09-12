import type { MouseEvent, ReactNode } from "react"

type ButtonProps = {
  onClick?: (e: MouseEvent) => void
  size?: 'small' | 'medium'
  children: ReactNode
  disabled?: boolean
}

const Button = ({onClick, children, disabled,size='medium'}:ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`glass-bubble transition-all hover:scale-105 cursor-pointer ${size=='medium'?'px-6 py-3 text-lg':'px-4 py-2'}  font-semibold`}>
      {children}
    </button>
  )
}

export default Button