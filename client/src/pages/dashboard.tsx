import React from 'react'
import Layout from '@/components/MainLayout/Layout'
import { NextPage } from 'next'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Container } from '@mui/system'
import AdminLayout from '@/components/AdminLayout/AdminLayout'
import TotalBox from '@/components/TotalBox/TotalBox'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import Dashboard from '@/components/screens/Dashboard'


const DashboardPage: NextPage = () => {
  return (
    <Dashboard />
  )
}

export default DashboardPage
