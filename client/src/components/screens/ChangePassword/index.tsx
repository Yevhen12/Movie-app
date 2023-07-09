import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import { Container } from '@mui/material'
import AdminLayout from '@/components/AdminLayout/AdminLayout'
import styles from './ChangePassword.module.scss'
import { TextField } from '@mui/material'
import Button from '@/components/Button/Button'

const ChangePassword: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <AdminLayout
          title='Change password'
        >
          <div className={styles.inputContainer}>
            <TextField
              className={styles.input}
              label="Previous Password"
              InputLabelProps={{
                className: styles.labelInput,
              }}
              defaultValue="*********"
              variant="outlined"
            />
            <TextField
              className={styles.input}
              label="New password"
              InputLabelProps={{
                className: styles.labelInput,
              }}
              defaultValue="*********"
              variant="outlined"
            />
            <TextField
              className={styles.input}
              label="Confirm password"
              InputLabelProps={{
                className: styles.labelInput,
              }}
              defaultValue="*********"
              variant="outlined"
            />
          </div>
          <div className={styles.buttonBlock}>
            <Button variant='outlined' text='Change password' onClick={() => console.log('password changed')} />
          </div>
        </AdminLayout>
      </Container>
    </Layout>

  )
}

export default ChangePassword