import React, { PropsWithChildren } from 'react'
import { Button as MUIButton } from '@mui/material'
import styles from './Button.module.scss'

interface ButtonProps {
  text: string
  icon?: React.ReactElement
  variant?: 'contained' | 'outlined'
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ text, variant = 'contained', icon }) => {
  return (
    <MUIButton className={variant === 'contained' ? styles.contained : styles.outlined}>
      {icon && icon}
      {text}
    </MUIButton>
  )
}

export default Button