import React, { useEffect } from 'react'
import Layout from '@/components/Layouts/MainLayout/Layout'
import { Container } from '@mui/material'
import AdminLayout from '@/components/Layouts/AdminLayout/AdminLayout'
import UsersTable from '@/components/UsersTable/UsersTable'
import Button from '@/components/Button/Button'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'

const MOCK_USERS = [
  { image: "image", id: "787dre78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "7287dre78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787d278", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "78e7d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787td78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
]

const Users: React.FC = () => {

  return (
    <AuthLayout>
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
     </AuthLayout>
  )
}

export default Users