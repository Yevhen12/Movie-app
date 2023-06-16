import React from 'react'

interface ButtonProps {
  text: string
  icon?: React.ReactElement
  variant: 'contained' | 'outlined'
}

const Button: React.FC<ButtonProps> = () => {
  return (
    <div>Button</div>
  )
}

export default Button