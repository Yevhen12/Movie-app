import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import { Container } from '@mui/material'
import AdminLayout from '@/components/AdminLayout/AdminLayout'
import CategoryTable from '@/components/CategoryTable/CategoryTable'
import styles from './Categories.module.scss'
import Button from '@/components/Button/Button'
import { ACTIONS } from '../../../constants/btnActions'
import AddCircleIcon from '@mui/icons-material/AddCircle';


const MOCK_CATEGORIES = [
  { id: "434jdf42", date: "November 22, 2022", category: "Romance", actions: [ACTIONS.DELETE, ACTIONS.EDIT] },
  { id: "434jf342", date: "November 22, 2022", category: "Romance", actions: [ACTIONS.DELETE, ACTIONS.EDIT] },
  { id: "434j4f42", date: "November 22, 2022", category: "Romance", actions: [ACTIONS.DELETE, ACTIONS.EDIT] },
  { id: "434j16f42", date: "November 22, 2022", category: "Romance", actions: [ACTIONS.DELETE, ACTIONS.EDIT] },
  { id: "434j1f42", date: "November 22, 2022", category: "Romance", actions: [ACTIONS.DELETE, ACTIONS.EDIT] },
  { id: "434j2f42", date: "November 22, 2022", category: "Romance", actions: [ACTIONS.DELETE, ACTIONS.EDIT] },
]

const FavoriteMovies: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <AdminLayout
          title='Favorites Movies'
          btn={
            <Button
              text='Create'
              variant='outlined'
              icon={<AddCircleIcon className={styles.btnIcon} style={{ fill: "white" }} />}
              onClick={() => console.log('Created')}
            />
          }
        >
          <CategoryTable categories={MOCK_CATEGORIES} />
        </AdminLayout>
      </Container>
    </Layout>

  )
}

export default FavoriteMovies