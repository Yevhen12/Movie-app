import React, { useMemo } from 'react'
import { List, ListItemButton, ListItemIcon, ListSubheader, Paper } from '@mui/material'
import ListItemText from '@mui/material/ListItemText';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import VideoCallSharpIcon from '@mui/icons-material/VideoCallSharp';
import ROUTES from '@/constants/routes';
import styles from './Sidebar.module.scss'
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {

  const router = useRouter()

  const SIDEBAR_ITEMS = [
    {
      text: 'Dashboard',
      path: ROUTES.DASHBOARD,
      icon: <GridViewSharpIcon style={router.asPath === ROUTES.DASHBOARD ? { fill: 'red' } : { fill: 'white' }} />
    },
    {
      text: 'Movies List',
      path: ROUTES.MOVIES_LIST,
      icon: <ListOutlinedIcon style={router.asPath === ROUTES.MOVIES_LIST ? { fill: 'red' } : { fill: 'white' }} />
    },
    {
      text: 'Add Movie',
      path: ROUTES.ADD_MOVIE,
      icon: <VideoCallSharpIcon style={router.asPath === ROUTES.ADD_MOVIE ? { fill: 'red' } : { fill: 'white' }} />
    },
    {
      text: 'Categories',
      path: ROUTES.CATEGORIES,
      icon: <CategoryOutlinedIcon style={router.asPath === ROUTES.CATEGORIES ? { fill: 'red' } : { fill: 'white' }} />
    },
    {
      text: 'Users',
      path: ROUTES.USERS,
      icon: <GroupOutlinedIcon style={router.asPath === ROUTES.USERS ? { fill: 'red' } : { fill: 'white' }} />
    },
    {
      text: 'Update profile',
      path: ROUTES.UPDATE_PROFILE,
      icon: <SettingsOutlinedIcon style={router.asPath === ROUTES.UPDATE_PROFILE ? { fill: 'red' } : { fill: 'white' }} />
    },
    {
      text: 'Favorite movies',
      path: ROUTES.FAVORITE_MOVIES,
      icon: <FavoriteOutlinedIcon style={router.asPath === ROUTES.FAVORITE_MOVIES ? { fill: 'red' } : { fill: 'white' }} />
    },
    {
      text: 'Change password',
      path: ROUTES.CHANGE_PASSWORD,
      icon:  <LockOutlinedIcon style={router.asPath === ROUTES.CHANGE_PASSWORD ? { fill: 'red' } : { fill: 'white' }} />
    },
  ]

  const itemsList: React.ReactElement[] = useMemo(() => SIDEBAR_ITEMS.map((item, id) => (
    <ListItemButton
      key={id}
      className={router.asPath === item.path ? styles.listItemActive : styles.listItem}
      onClick={() => router.push(item.path)}
    >
      <ListItemIcon>
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontWeight: 600 }}
        primary={item.text}
        className={router.asPath === item.path ? styles.listItemTextActive : styles.listItemText}
      />
    </ListItemButton>
  )), [SIDEBAR_ITEMS])

  return (
    <Paper elevation={1} className={styles.sidebar}>
      <List
        className={styles.list}
        aria-labelledby="nested-list-subheader"
      >
        {itemsList}
      </List>
    </Paper>
  )
}

export default Sidebar