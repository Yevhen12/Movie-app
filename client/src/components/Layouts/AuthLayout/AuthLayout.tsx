import { getIsLoggedIn } from '@/redux/slices/userSlice';
import React, { PropsWithChildren, useEffect, useState } from 'react'
import useAppSelector from '@/hooks/useAppSelector'
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';

const AuthLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const isLoggedIn = useAppSelector(getIsLoggedIn())
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setLoading(false)
    if (!isLoggedIn) {
      router.replace(ROUTES.LOGIN)
    }
  }, [])
  
  return (
    <div>
      {isLoggedIn === null ? <p>Loading...</p> : children}
    </div>
  )
}

export default AuthLayout