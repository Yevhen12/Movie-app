import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Container } from '@mui/material'


export default function Categories() {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <p>Categories</p>
        <Sidebar />
      </Container>
    </Layout>
  )
}
