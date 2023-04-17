import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Container } from '@mui/material'


export default function MoviesList() {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <p>Movies List</p>
        <Sidebar />
      </Container>
    </Layout>
  )
}
