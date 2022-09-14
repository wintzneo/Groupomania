import React, { useRef, useCallback } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MdAddAPhoto } from 'react-icons/md'
import { BsFillChatTextFill } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import { BsTrashFill } from 'react-icons/bs'

//Schema YUP
const schema = yup.object({
  bio: yup
    .string()
    .min(1, 'Veuillez remplir le champ')
    .max(200, 'Pas plus de 200 caractères')
    .required(false),
})

const EditMyProfile = () => {
  const navigate = useNavigate()
  const inputFileRef = useRef()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const recupereUserId = localStorage.getItem('userId')

  //Supprimer profil
  const handleDelete = async () => {
    const isConfirm = window.confirm(
      'Êtes-vous sûrs de supprimer votre profil?'
    )
    if (!isConfirm) {
      return
    }
    await axios.delete('http://localhost:4200/api/users/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    localStorage.clear()
    navigate('/login')
  }

  //Mofif profil
  const handleModif = useCallback(
    async (data) => {
      const file = inputFileRef.current.files[0]
      if (!file) {
        setError('image', 'Requis')
      }
      const formData = new FormData()
      formData.append('image', file)
      formData.append('bio', data.bio)
      await axios.put(
        `http://localhost:4200/api/profile/${recupereUserId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      navigate('/Profile')
    },
    [recupereUserId, navigate, setError]
  )

  return (
    <div className="container-edit">
      <NavLink to="/profile" className="back-profile">
        <BiArrowBack />
      </NavLink>
      <h1>Modifier le profil</h1>
      <form action="submit" onSubmit={handleSubmit(handleModif)}>
        <label htmlFor="image">
          Modifier la photo <MdAddAPhoto />{' '}
        </label>
        <input
          type="file"
          id="image"
          ref={inputFileRef}
          name="image"
          accept="image/png, image/jpeg, image/jpg"
        />

        <label htmlFor="bio">
          Modifier la bio <BsFillChatTextFill />{' '}
        </label>
        <textarea
          {...register('bio')}
          name="bio"
          id="bio"
          maxLength="200"
          cols="30"
          rows="10"
        ></textarea>
        {errors.bio && <div className="error-bio">{errors.bio.message}</div>}

        <input type="submit" id="button" value="Modifier" />
      </form>
      <button className="delete" onClick={handleDelete}>
        <BsTrashFill /> <p>Supprimer mon profil</p>{' '}
      </button>
    </div>
  )
}

export default EditMyProfile
