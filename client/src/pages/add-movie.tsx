import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Container } from '@mui/material'


export default function AddMovie() {
  return (
    <Layout>
      <Container maxWidth='lg'>
        <p>Add movie</p>
        <Sidebar />
      </Container>
    </Layout>
  )
}
