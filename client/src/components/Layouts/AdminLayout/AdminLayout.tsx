import React, { PropsWithChildren } from 'react'
import { Paper } from '@mui/material'
import styles from './AdminLayout.module.scss'
import Sidebar from '../../Sidebar/Sidebar'

interface AdminLayoutProps {
  title: string
  btn?: React.ReactElement
}

const AdminLayout: React.FC<PropsWithChildren<AdminLayoutProps>> = ({ children, title, btn }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Paper elevation={1} className={styles.layoutBlock}>
        <div className={styles.headerBlock}>
          <p className={styles.title}>{title}</p>
          {btn && btn}
        </div>
        {children}
      </Paper>
    </div>

  )
}

export default AdminLayout