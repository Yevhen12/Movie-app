import React, { useState } from 'react'
import Layout from '@/components/MainLayout/Layout'
import { Container, Input, InputLabel, Paper } from '@mui/material'
import AdminLayout from '@/components/AdminLayout/AdminLayout'
import styles from './AddMovie.module.scss'
import { TextField } from '@mui/material'
import Button from '@/components/Button/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'

const AddMovie: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleVideoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setFile(e.target.files[0])
    }
  }

  const onSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    try {
      if (!e || !file) return
      e.preventDefault()
  
      const data = new FormData()
      data.append('file', file)
      console.log('here')
  
      const result = await axios.post('http://localhost:7777/upload', data)
      if(result) {
        console.log('result', result)
      }
    } catch(err: unknown) {
      console.log(err)
    }


  }

  return (
    <Layout>
      <Container maxWidth='lg'>
        <AdminLayout
          title='Create Movie'
        >
          <div className={styles.imageContainer}>
            <Paper elevation={1} className={styles.dragImageBlock}>
              <label className={styles.labelUpload}>
                <input className={styles.input} type='file' onChange={handleVideoInput} />
              </label>
              <CloudUploadIcon style={{ fill: 'red' }} />
              <p className={styles.text}>Drag your image here</p>
              <p className={styles.description}>only .jpg and .png files will be accepted</p>
            </Paper>
          </div>
          <div className={styles.buttonBlock}>
            <Button variant='contained' text='Submit' onClick={(e) => onSubmit(e)} />
          </div>
        </AdminLayout>
      </Container>
    </Layout>
  )
}

export default AddMovie