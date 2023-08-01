import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layouts/MainLayout/Layout'
import { Container, Paper, TextField } from '@mui/material'
import Button from '@/components/Button/Button'
import styles from './Signup.module.scss'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useAppSelector from '@/hooks/useAppSelector'
import { RequestStatuses } from '@/constants/enums'
import ROUTES from '@/constants/routes'
import router from 'next/router'
import { getAuthErrors, getStatus, signUp, statusReset } from '@/redux/slices/userSlice'
import useAppDispatch from '@/hooks/useAppDispatch'

interface IForm {
  username: string
  email: string
  password: string
}

const schema = z.object({
  username: z.string(),
  email: z.string().email('Invalid email'),
  password: z.string().min(5, { message: 'Minimum 5 characters' }).max(32, { message: 'Maximum 32 characters' }),
});

const Signup: React.FC = () => {
  const { register, handleSubmit, formState, watch } = useForm({ resolver: zodResolver(schema) })
  const { errors } = formState
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state)
  const status = useAppSelector(getStatus())
  const errorMessage = useAppSelector(getAuthErrors())

  const handleSave = async (formValue: FieldValues) => {
    dispatch(signUp(formValue as IForm))
  }

  useEffect(() => {
    if (status === RequestStatuses.SUCCEEDED) {
      dispatch(statusReset())
      router.replace(`${ROUTES.LOGIN}`)
    }
  }, [status])

  console.log('errror', errorMessage)

  const isSubmitBtnDisabled =
    (watch('username') ? watch('username')?.length < 1 : true) ||
    (watch('password') ? watch('password')?.length < 6 : true) ||
    (watch('email') ? watch('email')?.length < 3 : true)

  const isFullnameError = !!errors.fullname?.message
  const isEmailError = !!errors.email?.message
  const isPasswordError = !!errors.password?.message
  const isErrorAfterSubmit = status === RequestStatuses.FAILED

  console.log('state', state)

  return (
    <Layout>
      <Container style={{ height: '100%' }} maxWidth='lg'>
        <div className={styles.formContainer}>
          <Paper elevation={1} className={styles.sidebar}>
            <div className={styles.inputContainer}>
              <TextField
                {...register('username')}
                error={isFullnameError}
                className={styles.input}
                label="Username"
                InputLabelProps={{
                  className: styles.labelInput,
                }}
                placeholder='Username'
                variant="outlined"
                helperText={`${isFullnameError ? errors.fullname?.message : ''}`}
              />
              <TextField
                {...register('email')}
                error={isEmailError}
                className={styles.input}
                label="Email"
                InputLabelProps={{
                  className: styles.labelInput,
                }}
                placeholder='Email'
                variant="outlined"
                helperText={`${isEmailError ? errors.email?.message : ''}`}
              />
              <TextField
                {...register('password')}
                error={isPasswordError}
                className={styles.input}
                label="Password"
                InputLabelProps={{
                  className: styles.labelInput,
                }}
                placeholder='Password'
                variant="outlined"
                helperText={`${isPasswordError ? errors.password?.message : ''}`}

              />
            </div>
            <div className={styles.errorContainer}>
              {isErrorAfterSubmit && <p className={styles.errorText}>{errorMessage}</p>}
            </div>
            <Button
              text='Signup'
              onClick={handleSubmit(handleSave)}
              variant='contained'
              style={isSubmitBtnDisabled ? { backgroundColor: 'gray', color: 'white', width: '100%' } : { width: '100%' }}
              disabled={isSubmitBtnDisabled}
            />
            <div className={styles.bottomTextContainer}>
              <p className={styles.bottomText}>Already have an account?
                <span className={styles.signUpTerrorTextext} onClick={() => router.replace(ROUTES.LOGIN)}> Log in</span>
              </p>
            </div>
          </Paper>
        </div>
      </Container>
    </Layout>
  )
}

export default Signup