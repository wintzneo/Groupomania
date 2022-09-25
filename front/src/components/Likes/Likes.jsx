import React, { useCallback, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import axios from 'axios'

const LikeButton = (item) => {
  const [like, setLike] = useState(1),
    [isLike, setIsLike] = useState(-1),
    onLikeClick = async () => {
      setLike(like + (isLike ? -1 : 1))
      setIsLike(!isLike)
      LikePost()
    }
  /* 
  onDeleteLikeClick = async () => {
    setLike(like + (isLike ? -1 : 1))
    setIsLike(!isLike)
    LikeDelete()
  } */

  const postId = item.id

  //Ajouter un like
  const LikePost = useCallback(async () => {
    await axios.get(`http://localhost:4200/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    try {
      await axios.post(`http://localhost:4200/api/posts/${postId}/likes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }, [postId])

  //Supprimer Like
  const LikeDelete = useCallback(async () => {
    await axios.get(`http://localhost:4200/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    try {
      await axios.delete(`http://localhost:4200/api/posts/${postId}/likes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }, [postId])

  return (
    <>
      <div className="like">
        <p onClick={onLikeClick} className="icon-heart">
          <AiFillHeart />
        </p>
        <p className="likes_length">
          {'Like'} | {like}
        </p>
      </div>
    </>
  )
}

export default LikeButton
