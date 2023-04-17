import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import { NextPage } from 'next'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Container } from '@mui/system'
import AdminLayout from '@/components/AdminLayout/AdminLayout'
import TotalBox from '@/components/TotalBox/TotalBox'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import styles from './Dashboard.module.scss'



const Dashboard: NextPage = () => {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <AdminLayout title='Dashboard'>
          <div className={styles.totalBoxContainer}>
            <TotalBox
              title='Total Movies'
              totalNumber={34}
              bgColor='#ea580c'
              icon={<ListOutlinedIcon fontSize='small' style={{ fill: 'white' }} />}
            />
            <TotalBox
              title='Total Categories'
              totalNumber={12}
              bgColor='blue'
              icon={<CategoryOutlinedIcon fontSize='small' style={{ fill: 'white' }} />}
            />
            <TotalBox
              title='Total Users'
              totalNumber={117}
              bgColor='green'
              icon={<PersonSharpIcon fontSize='small' style={{ fill: 'white' }} />}
            />
          </div>
        </AdminLayout>
      </Container>
    </Layout>
  )
}

export default Dashboard
