import React, { useState, useCallback } from 'react'
import cn from 'classnames'
import axios from 'axios'
import { ReactComponent as Heart } from '../Likes/red-heart-icon.svg'

const LikeButton = (item) => {
  const [liked, setLiked] = useState(null)
  const [clicked, setClicked] = useState(false)

  const postId = item.id
  console.log(postId)

  //Ajouter like
  const AddLike = useCallback(async (data) => {
    await axios.post(`http://localhost:4200/api/posts/${postId}/likes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  }, [])

  //Supprimer like
  const RemoveLike = useCallback(async (data) => {
    const res = await axios.get(
      `http://localhost:4200/api/posts/${postId}/likes`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    await axios.delete(
      `http://localhost:4200/api/posts/${postId}/likes`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
  }, [])

/*   //Récupérer like
  const GetLike = useCallback(async (data) => {
    const res = await axios.get(
      `http://localhost:4200/api/posts/${postId}/likes`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
  }, []) */

  return (
    <button
      onClick={() => {
        setLiked(!liked)
        setClicked(true)
        RemoveLike()
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn('like-button-wrapper', {
        liked,
        clicked,
      })}
    >
      <div className="like-button">
        <Heart />
        <span className={cn('suffix', { liked })}>Liké !</span>
      </div>
    </button>
  )
}

export default LikeButton
