import React, { useCallback, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import axios from 'axios'

const LikeButton = (item) => {
  const [like, setLike] = useState(0),
    [isLike, setIsLike] = useState(false),
    onLikeClick = async () => {
      setLike(like + (isLike ? -1 : 1))
      setIsLike(!isLike)
      LikePost()
    }
  const postId = item.id

  //Ajouter Like
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

  /*   //Supprimer Like
  const LikeDelete = async () => {
    await axios.delete(`http://localhost:4200/api/posts/${postId}/likes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  } */

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

/* const Likes = (post) => {
  console.log(post)
  // add like
  const postId = post.id
  const handleLike = useCallback(async (data) => {
    await axios.post(`http://localhost:4200/api/posts/${postId}/likes`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  }, [])
  return (
    <div className="like">
      <p onClick={handleLike} className="icon-heart">
        <AiFillHeart />
      </p>
      <p className="likes_length">{likes}</p>
    </div>
  )
} */

export default LikeButton
