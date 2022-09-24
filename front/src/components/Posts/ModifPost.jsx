import React, { useRef, useCallback } from 'react'
import axios from 'axios'
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

const EditMyPost = ({ postData }) => {
  const inputFileRef = useRef()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const postId = postData.id
  const userId = postData.userId
  const title = postData.title
  const content = postData.content
  console.log('user', userId, 'post', postId)

  //Modif un post
  const handleModify = useCallback(async () => {
    await axios.get(`http://localhost:4200/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    const file = inputFileRef.current.files[0]
    if (!file) {
      setError('image', 'Requis')
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('image', file)
    formData.append('userId', userId)

    console.log('data', title, content, file, userId)
    try {
      await axios.put(`http://localhost:4200/api/posts/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }, [title, content, userId, setError, postId])

  return (
    <div>
      <div className="post">
        <p className="back-profile">
          <BiArrowBack />
        </p>
        <p>Modifier votre post</p>
        <form onSubmit={handleSubmit(handleModify)}>
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
