import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import * as yup from 'yup'

// Schema YUP
const schema = yup.object({
  email: yup.string().email('Email invalide').required('Ce champ est requis'),
  password: yup
    .string()
    .min(8, 'Le mot de passe doit faire minimum 8 caractères')
    .max(20, 'Le mot de passe ne doit pas faire plus de 20 caractères'),
})

const SignIn = () => {
  const [errorCo, setErrorCo] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // connect with backend + stock in LS
  const handleLogin = useCallback(
    async (data) => {
      try {
        const res = await axios.post(
          'http://localhost:4200/api/users/login',
          data
        )
        const token = await res.data.data.token
        const user = await res.data.data.username
        const userId = await res.data.data.id
        localStorage.setItem('token', token)
        localStorage.setItem('username', user)
        localStorage.setItem('userId', userId)
        navigate('/')
      } catch (error) {
        if (error.message === 'Request failed with status code 400') {
          setErrorCo(true)
        }
      }
    },
    [navigate]
  )

  return (
    <form action="" onSubmit={handleSubmit(handleLogin)} id="sign-form">
      {errorCo && <div className="error">Email ou mot de passe incorrect</div>}
      <label htmlFor="email">Email</label>
      <br />
      <input {...register('email')} />
      <br />
      {errors.email && <div className="error">{errors.email.message}</div>}
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input {...register('password')} type="password" />
      <br />
      {errors.password && (
        <div className="error">{errors.password.message}</div>
      )}
      <br />
      <input type="submit" id="button" value="Se connecter" />
    </form>
  )
}

export default SignIn
