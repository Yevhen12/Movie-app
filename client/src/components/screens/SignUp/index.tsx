import React, { useState } from 'react'
import Layout from '@/components/MainLayout/Layout'
import { Container, Paper, TextField } from '@mui/material'
import Button from '@/components/Button/Button'
import styles from './Signup.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface IForm {
  fullname: string
  email: string
  password: string
}

const schema = z.object({
  fullname: z.string(),
  email: z.string().email('Invalid email'),
  password: z.string().min(5, { message: 'Minimum 5 characters' }).max(32, { message: 'Maximum 32 characters' }),
});

const Signup: React.FC = () => {
  const [userData, setUserData] = useState<IForm>()
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) })
  const { errors } = formState

  const handleSave = (formValue: any) => {
    setUserData(formValue)
  }

  const isFullnameError = !!errors.fullname?.message
  const isEmailError = !!errors.email?.message
  const isPasswordError = !!errors.password?.message

  return (
    <Layout>
      <Container style={{ height: '100%' }} maxWidth='lg'>
        <div className={styles.formContainer}>
          <Paper elevation={1} className={styles.sidebar}>
            <div className={styles.inputContainer}>
              <TextField
                {...register('fullname')}
                error={isFullnameError}
                className={styles.input}
                label="Fullname"
                InputLabelProps={{
                  className: styles.labelInput,
                }}
                placeholder='Fullname'
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
            <Button
              text='Signup'
              onClick={handleSubmit(handleSave)}
              variant='contained'
              style={{ width: '100%' }}
            />
            <div className={styles.bottomTextContainer}>
              <p className={styles.bottomText}>Already have an account?
                <span className={styles.signUpText}> Log in</span>
              </p>
            </div>
          </Paper>
        </div>
      </Container>
    </Layout>
  )
}

export default Signup