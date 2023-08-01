import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layouts/MainLayout/Layout'
import { Container, Paper, TextField } from '@mui/material'
import Button from '@/components/Button/Button'
import styles from './Login.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useAppDispatch from '@/hooks/useAppDispatch'
import { getAuthErrors, getStatus, signIn, statusReset } from '@/redux/slices/userSlice'
import useAppSelector from '@/hooks/useAppSelector'
import { RequestStatuses } from '@/constants/enums'
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes'

interface IForm {
  username: string
  password: string
}

const schema = z.object({
  username: z.string(),
  password: z.string().min(5, { message: 'Minimum 5 characters' }).max(32, { message: 'Maximum 32 characters' }),
});

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(getStatus())
  const errorMessage = useAppSelector(getAuthErrors())
  const state = useAppSelector(state => state)
  const { register, handleSubmit, formState, watch } = useForm({ resolver: zodResolver(schema) })
  const router = useRouter()
  const { errors } = formState

  useEffect(() => {
    if (status === RequestStatuses.SUCCEEDED) {
      dispatch(statusReset())
      router.replace(`${ROUTES.HOME}`)
    }
  }, [status])

  const handleSave = async (formValue: any) => {
    dispatch(signIn({ payload: formValue }))
  }

  const isSubmitBtnDisabled =
    (watch('username') ? watch('username')?.length < 1 : true) ||
    (watch('password') ? watch('password')?.length < 6 : true)

  const isUsernameError = !!errors.username?.message
  const isPasswordError = !!errors.password?.message
  const isErrorAfterSubmit = status === RequestStatuses.FAILED

  return (
    <Layout>
      <Container style={{ height: '100%' }} maxWidth='lg'>
        <div className={styles.formContainer}>
          <Paper elevation={1} className={styles.sidebar}>
            <div className={styles.inputContainer}>
              <TextField
                error={isUsernameError}
                {...register('username')}
                className={styles.input}
                label="Username"
                InputLabelProps={{
                  className: styles.labelInput,
                }}
                placeholder="Login"
                variant="outlined"
                helperText={`${isUsernameError ? errors.username?.message : ''}`}
              />
              <TextField
                error={isPasswordError}
                {...register('password')}
                className={styles.input}
                label="Password"
                InputLabelProps={{
                  className: styles.labelInput,
                }}
                placeholder="Password"
                variant="outlined"
                helperText={`${isPasswordError ? errors.password?.message : ''}`}
              />
            </div>
            <div className={styles.errorContainer}>
              {isErrorAfterSubmit && <p className={styles.errorText}>{errorMessage}</p>}
            </div>
            <Button
              text='Login'
              onClick={handleSubmit(handleSave)}
              variant='contained'
              style={isSubmitBtnDisabled ? { backgroundColor: 'gray', color: 'white', width: '100%' } : { width: '100%' }}
              disabled={isSubmitBtnDisabled}
            />
            <div className={styles.bottomTextContainer}>
              <p className={styles.bottomText}>Don't have an account?
                <span className={styles.signUpText} onClick={() => router.replace(ROUTES.SIGN_UP)}> Sign up</span>
              </p>
            </div>
          </Paper>
        </div>
      </Container>
    </Layout>
  )
}

export default Login