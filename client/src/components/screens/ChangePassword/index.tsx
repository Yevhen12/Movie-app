import React from 'react'
import Layout from '@/components/Layouts/MainLayout/Layout'
import { Container } from '@mui/material'
import AdminLayout from '@/components/Layouts/AdminLayout/AdminLayout'
import styles from './ChangePassword.module.scss'
import { TextField } from '@mui/material'
import Button from '@/components/Button/Button'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'

const ChangePassword: React.FC = () => {
  return (
    <AuthLayout>
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
    </AuthLayout>

  )
}

export default ChangePassword