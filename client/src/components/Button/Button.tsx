import React, { PropsWithChildren } from 'react'
import { Button as MUIButton } from '@mui/material'
import styles from './Button.module.scss'

interface ButtonProps {
  text: string
  icon?: React.ReactElement
  variant?: 'contained' | 'outlined'
  style?: any
  onClick: (e?:React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ text, variant = 'contained', icon, onClick, style = {} }) => {
  return (
    <MUIButton style={style} onClick={onClick} className={variant === 'contained' ? styles.contained : styles.outlined}>
      {icon && icon}
      {text}
    </MUIButton>
  )
}

export default Button