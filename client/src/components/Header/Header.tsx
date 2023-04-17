import React from 'react'
import styles from './Header.module.scss'
import { Avatar, InputAdornment, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { Container } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link'
import { useRouter } from 'next/router';
import ROUTES from '../../constants/routes'

type MenuType = {
  text: string;
  path: string;
}[]

const menu: MenuType = [
  { text: 'Movies', path: ROUTES.MOVIES },
  { text: 'About us', path: ROUTES.ABOUT },
  { text: 'Contact us', path: ROUTES.CONTACT_US },
];

const Header: React.FC = () => {
  const router = useRouter()

  const menuItems: React.ReactElement[] = menu.map(menuItem => (
    <li>
      <Link href={menuItem.path}>
        <p style={router.asPath === menuItem.path ? { color: 'red' } : { color: 'white' }}>{menuItem.text}</p>
      </Link>
    </li>
  ))

  return (
    <header className={styles.header}>
      <Container className={styles.container} maxWidth='lg'>
        <div className={styles.headerBlock}>
          <p className={styles.logoText} onClick = {() => router.push(ROUTES.HOME)}>LOGO</p>
          <TextField
            variant='standard'
            className={styles.headerInput}
            id="input-with-icon-textfield"
            label="Search"
            InputLabelProps={{
              className: styles.labelInput,
            }}
            InputProps={{
              className: styles.headerInput,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ fill: "white" }} />
                </InputAdornment>
              ),
            }}
          />
          <nav className={styles.navBar}>
            <ul className={styles.list}>
              {menuItems}
              <li>
                <Link href='dashboard'>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    H
                  </Avatar>
                </Link>
              </li>
              <li>
                <FavoriteIcon sx={{ width: 30, height: 30 }} />
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header