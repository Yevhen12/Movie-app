import { getIsLoggedIn } from '@/redux/slices/userSlice';
import React, { PropsWithChildren, useEffect } from 'react'
import useAppSelector from '@/hooks/useAppSelector'
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

const AuthLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const isLoggedIn = useAppSelector(getIsLoggedIn())
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(ROUTES.LOGIN)
    }
  }, [])
  
  return (
    <>
      {isLoggedIn && children}
    </>
  )
}

export default AuthLayout