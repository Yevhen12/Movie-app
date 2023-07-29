import React, { PropsWithChildren } from 'react'
import { Button as MUIButton } from '@mui/material'
import styles from './Button.module.scss'

interface ButtonProps {
  text: string
  icon?: React.ReactElement
  variant?: 'contained' | 'outlined'
  style?: any
  onClick: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void
  disabled?: boolean
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ text, variant = 'contained', icon, onClick, style = {}, disabled }) => {
  return (
    <MUIButton
      style={style}
      onClick={onClick}
      className={variant === 'contained' ? styles.contained : styles.outlined}
      disabled={disabled}
    >
      {icon && icon}
      {text}
    </MUIButton>
  )
}

export default Button