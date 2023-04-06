import React from 'react'
import styles from './Header.module.scss'
import Image from 'next/image'
import { InputAdornment, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerBlock}>
        <Image
          className={styles.logo}
          src="/images/logo.png"
          alt="logo"
          fill
          objectFit='contain'
        />
        <TextField
          variant='outlined'
          className={styles.headerInput}
          color='success'
          id="input-with-icon-textfield"
          label="TextField"
          InputProps={{
            style: { color: "white", borderColor: 'white' },
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle style={{ fill: "white" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </div>
    </header>
  )
}

export default Header