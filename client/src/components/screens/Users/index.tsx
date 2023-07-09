import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import { Container } from '@mui/material'
import AdminLayout from '@/components/AdminLayout/AdminLayout'
import UsersTable from '@/components/UsersTable/UsersTable'
import styles from './Users.module.scss'
import Button from '@/components/Button/Button'
import { ACTIONS } from '../../../constants/btnActions'
import AddCircleIcon from '@mui/icons-material/AddCircle';


const MOCK_USERS = [
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
]

const Users: React.FC = () => {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <AdminLayout
          title='Users'
          btn={
            <Button
              text='Delete all members'
              variant='outlined'
              onClick={() => console.log('Deleted')}
            />
          }
        >
          <UsersTable users={MOCK_USERS} />
        </AdminLayout>
      </Container>
    </Layout>

  )
}

export default Users