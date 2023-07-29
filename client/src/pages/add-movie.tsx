import React from 'react'
import Layout from '@/components/Layouts/MainLayout/Layout'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Container } from '@mui/material'
import AddMovie from '@/components/screens/AddMovie'
import { NextPage } from 'next'


const AddMoviePage: NextPage = () => {
  return (
    <AddMovie />
  )
}

export default AddMoviePage
