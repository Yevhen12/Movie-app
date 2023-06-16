import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Container } from '@mui/material'
import MoviesList from '@/components/screens/MoviesList'
import { NextPage } from 'next'


const MoviesListPage: NextPage = () => {
  return (
    <MoviesList />
  )
}

export default MoviesListPage
