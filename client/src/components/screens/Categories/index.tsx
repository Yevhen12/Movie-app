import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import { Container, Button } from '@mui/material'
import AdminLayout from '@/components/AdminLayout/AdminLayout'
import CategoryTable from '@/components/CategoryTable/CategoryTable'
import styles from './Categories.module.scss'


const MOCK_FILMS = [
  { image: 'some image', name: 'Film1323232323', category: 'Romance', language: 'English', year: 2020, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film2', category: 'Romance', language: 'English', year: 2015, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film3', category: 'Romance', language: 'Ukrainian', year: 2020, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film4', category: 'Romance', language: 'English', year: 2021, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film5', category: 'Romance', language: 'English', year: 2010, hours: '3h', actions: ['delete', 'edit'] },
]

const FavoriteMovies: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <AdminLayout
          title='Favorites Movies'
          btn={<Button className={styles.btn}>Delete All</Button>}
        >
          <CategoryTable films={MOCK_FILMS} />
        </AdminLayout>
      </Container>
    </Layout>

  )
}

export default FavoriteMovies