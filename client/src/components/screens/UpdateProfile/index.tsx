import React from 'react'
import Layout from '@/components/Layouts/MainLayout/Layout'
import { Container, Paper } from '@mui/material'
import AdminLayout from '@/components/Layouts/AdminLayout/AdminLayout'
import styles from './UpdateProfile.module.scss'
import { TextField } from '@mui/material'
import Button from '@/components/Button/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'
// import useAppSelector from '@/hooks/useAppSelector'

const UpdateProfile: React.FC = () => {
  // const state = useAppSelector(state => state)
  // console.log('state', state)
  return (
    <AuthLayout>
      <Layout>
        <Container maxWidth='lg'>
          <AdminLayout
            title='Update profile'
          >
            <div className={styles.imageContainer}>
              <Paper elevation={1} className={styles.dragImageBlock}>
                <CloudUploadIcon style={{ fill: 'red' }} />
                <p className={styles.text}>Drag your image here</p>
                <p className={styles.description}>only .jpg and .png files will be accepted</p>
              </Paper>
              <div className={styles.imageBlock}>
                <p>some image here</p>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <TextField
                className={styles.input}
                label="Fullname"
                InputLabelProps={{
                  className: styles.labelInput,
                }}
                defaultValue="Lys Yevhen"
                variant="outlined"
              />
              <TextField
                className={styles.input}
                label="Email"
                InputLabelProps={{
                  className: styles.labelInput,
                }}
                defaultValue="some@gmail.com"
                variant="outlined"
              />
            </div>
            <div className={styles.buttonBlock}>
              <Button variant='contained' text='Delete account' onClick={() => console.log('Account deleted')} />
              <Button variant='outlined' text='Update profile' onClick={() => console.log('Profile updated')} />
            </div>
          </AdminLayout>
        </Container>
      </Layout>
    </AuthLayout>
  )
}

export default UpdateProfile