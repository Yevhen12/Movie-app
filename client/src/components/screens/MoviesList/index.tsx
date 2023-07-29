import React from 'react'
import Layout from '@/components/Layouts/MainLayout/Layout'
import { Container } from '@mui/material'
import AdminLayout from '@/components/Layouts/AdminLayout/AdminLayout'
import FilmTable from '@/components/FilmTable/FilmTable'
import Button from '@/components/Button/Button'
import styles from './MoviesList.module.scss'


const MOCK_FILMS = [
  { image: 'some image', name: 'Film1323232323', category: 'Romance', language: 'English', year: 2020, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film2', category: 'Romance', language: 'English', year: 2015, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film3', category: 'Romance', language: 'Ukrainian', year: 2020, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film4', category: 'Romance', language: 'English', year: 2021, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film5', category: 'Romance', language: 'English', year: 2010, hours: '3h', actions: ['delete', 'edit'] },
]

const MoviesList: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <AdminLayout
          title='Movies List'
          btn={<Button text='Delete all' variant='outlined' onClick={() => console.log('deleted')} />}
        >
          <FilmTable films={MOCK_FILMS} />
        </AdminLayout>
      </Container>
    </Layout>

  )
}

export default MoviesList