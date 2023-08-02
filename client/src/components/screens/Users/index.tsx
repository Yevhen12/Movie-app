import React, { useEffect } from 'react'
import Layout from '@/components/Layouts/MainLayout/Layout'
import { Container } from '@mui/material'
import AdminLayout from '@/components/Layouts/AdminLayout/AdminLayout'
import UsersTable from '@/components/UsersTable/UsersTable'
import Button from '@/components/Button/Button'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'
import { userService } from '@/services/api/user.service'

const MOCK_USERS = [
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
  { image: "image", id: "787d78", date: "November 22, 2022", fullname: "Lys Yevhen", email: "some@gmail.com", role: "admin" },
]

const Users: React.FC = () => {

  useEffect(() => {
    const fecthUsers = async () => {
      const users = await userService.getAll()
      console.log('users', users)
    }

    fecthUsers()
  }, [])
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