import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import { Button } from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Header from '@/components/Header/Header'
import Layout from '@/components/Layouts/MainLayout/Layout'
import useAppSelector from '@/hooks/useAppSelector'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const state = useAppSelector(state => state)
  console.log('state', state)
  return (
    <Layout>
      <p>Hello world</p>
    </Layout>
  )
}
