import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import { Container, Paper } from '@mui/material'
import AdminLayout from '@/components/AdminLayout/AdminLayout'
import styles from './UpdateProfile.module.scss'
import { TextField } from '@mui/material'
import Button from '@/components/Button/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UpdateProfile: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <AdminLayout
          title='Update profile'
        >
          <div className={styles.imageContainer}>
            <Paper elevation={1} className={styles.dragImageBlock}>
              <CloudUploadIcon style={{fill: 'red'}} />
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
            <Button variant='contained' text='Delete account' />
            <Button variant='outlined' text='Update profile' />
          </div>
        </AdminLayout>
      </Container>
    </Layout>
  )
}

export default UpdateProfile