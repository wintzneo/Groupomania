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

const EditMyPost = ({ postData, setUpdate, fetchPosts }) => {
  const inputFileRef = useRef()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { ...postData },
    resolver: yupResolver(schema),
  })

  const postId = postData.id
  const userId = postData.userId

  //Modif un post
  const handleModify = async (data) => {
    const title = data.title
    const content = data.content

    const file = inputFileRef.current.files[0]
    if (!file) {
      setError('image', 'Requis')
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('image', file)
    formData.append('userId', userId)

    try {
      await axios
        .put(`http://localhost:4200/api/posts/${postId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((resp) => {
          setUpdate(false)
          fetchPosts()
        })
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }

  //Retourner à la création de post
  const handleReturn = async () => {
    const isConfirm = window.confirm(
      'Êtes-vous sûrs de sortir sans modifier le post ?'
    )
    if (!isConfirm) {
      return
    }
    setUpdate(false)
    fetchPosts()
  }

  return (
    <div>
      <div className="post">
        <p className="back-profile" onClick={handleReturn}>
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
