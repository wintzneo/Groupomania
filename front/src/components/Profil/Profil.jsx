import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiFillSetting } from 'react-icons/ai'

const ShowProfile = () => {
  let [image, setImage] = useState('')
  let [username, setUsername] = useState('')
  let [bio, setBio] = useState('')

  const navigate = useNavigate()

  //Déconnexion
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
    alert('Vous êtes déconnecté')
  }

  //Avoir le profil
  useEffect(() => {
    const showMyProfile = async () => {
      const res = await axios.get('http://localhost:4200/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setImage(res.data.data.profile.image)
      setUsername(res.data.data.username)
      setBio(res.data.data.profile.bio)
    }
    showMyProfile()
  }, [])

  return (
    <div>
      <div className="showProfilInfo">
        <div className="hello">
          <h1>Profil </h1>
          <NavLink to="/modif" className="edit-profile">
            <AiFillSetting />
          </NavLink>
        </div>
        <div className="picture">
          <img src={image} id="avatar" alt="" />
        </div>
        <div className="pseudo">
          <p>
            Nom d'utilisateur <br />
          </p>
          {username}
        </div>
        <div className="bio">
          <p>
            Un mot sur vous
            <br />{' '}
          </p>
          {bio}
        </div>
        <p className="logout" onClick={handleLogout}>
          Se déconnecter
        </p>
      </div>
    </div>
  )
}

export default ShowProfile
