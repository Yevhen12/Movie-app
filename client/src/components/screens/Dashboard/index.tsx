import React from 'react'
import Layout from '@/components/Layouts/MainLayout/Layout'
import { NextPage } from 'next'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Container } from '@mui/system'
import AdminLayout from '@/components/Layouts/AdminLayout/AdminLayout'
import TotalBox from '@/components/TotalBox/TotalBox'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import styles from './Dashboard.module.scss'
import FilmTable from '@/components/FilmTable/FilmTable'
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout'

const MOCK_FILMS = [
  { image: 'some image', name: 'Film1323', category: 'Romance', language: 'English', year: 2020, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film2', category: 'Romance', language: 'English', year: 2015, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film3', category: 'Romance', language: 'Ukrainian', year: 2020, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film4', category: 'Romance', language: 'English', year: 2021, hours: '3h', actions: ['delete', 'edit'] },
  { image: 'some image', name: 'Film5', category: 'Romance', language: 'English', year: 2010, hours: '3h', actions: ['delete', 'edit'] },
]


const Dashboard: React.FC = () => {
  return (
    <AuthLayout>
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
            <FilmTable films={MOCK_FILMS} />
          </AdminLayout>
        </Container>
      </Layout>
    </AuthLayout>
  )
}

export default Dashboard
