import React, { useRef, useCallback } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BiArrowBack } from 'react-icons/bi'

// Schema YUP
const schema = yup.object({
  title: yup
    .string()
    .min(1, 'Veuillez remplir le champ')
    .max(25, 'Pas plus de 25 caractères')
    .required(),
  content: yup
    .string()
    .min(1, 'Veuillez remplir le champ')
    .max(200, 'Pas plus de 200 caractères')
    .required(),
})

const EditMyPost = ({ refetch }) => {
  const inputFileRef = useRef()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const id = localStorage.getItem('postId')

  //Modif un post
  const handleModif = useCallback(
    async (data) => {
      const file = inputFileRef.current.files[0]
      if (!file) {
        setError('image', 'Requis')
      }
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      formData.append('image', file)
      formData.append('userId', data.userId)
      await axios.put(`http://localhost:4200/api/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
          userId: localStorage.getItem('userId'),
        },
      })
      navigate('/')
      refetch()
      reset({ content: '', title: '' })
    },
    [navigate, setError, refetch, reset]
  )

  /*  //Modifier un post
  const handleModif = useCallback(
    async (data) => {
      const file = inputFileRef.current.files[0]
      const PostId = localStorage.getItem('id')
      console.log(PostId, 'e')

      if (!file) {
        setError('image', 'Requis')
      }
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      formData.append('image', file)
      formData.append('userId', data.userId)
      await axios.put(`http://localhost:4200/api/posts/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
          userId: localStorage.getItem('userId'),
        },
      })
      navigate('/')
      refetch()
      reset({ content: '', title: '' })
    },
    [setError, navigate, refetch, reset]
  ) */

  /*    //Modifier un post
  const handleModif = useCallback(
    async (data) => {
      const file = inputFileRef.current.files[0]

      if (!file) {
        setError('image', 'Requis')
      }
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      formData.append('image', file)
      formData.append('userId', data.userId)
      await axios.put(`http://localhost:4200/api/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
          userId: localStorage.getItem('userId'),
        },
      })
      navigate('/')
    },
    [navigate, setError]
  ) */

  return (
    <div>
      <div className="post">
        <NavLink to="/" className="back-profile">
          <BiArrowBack />
        </NavLink>
        <p>Modifier votre post</p>
        <form onSubmit={handleSubmit(handleModif)}>
          <textarea
            {...register('title')}
            type="text"
            name="title"
            id="title"
            placeholder="Titre du post"
            cols="10"
            rows="7"
          ></textarea>
          {errors.title && (
            <div className="error-title">{errors.title.message}</div>
          )}
          <textarea
            {...register('content')}
            type="text"
            name="content"
            id="content"
            placeholder="Contenu du post"
            cols="30"
            rows="10"
          ></textarea>
          {errors.content && (
            <div className="error-content">{errors.content.message}</div>
          )}
          <input
            ref={inputFileRef}
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
          />
          <input type="submit" id="button" value="Modifier" />
        </form>
      </div>
    </div>
  )
}

export default EditMyPost
