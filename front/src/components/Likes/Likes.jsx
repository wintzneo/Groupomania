import React, { useState, useCallback } from 'react'
import cn from 'classnames'
import axios from 'axios'
import { ReactComponent as Heart } from '../Likes/red-heart-icon.svg'

const LikeButton = (userId, id, likes) => {
  const [liked, setLiked] = useState(null)
  const [clicked, setClicked] = useState(false)

  //Post Like/Unlike
  const Like = async () => {
    try {
      await axios.post(`http://localhost:4200/api/posts/${id}/likes`, userId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (error) {
      alert('error')
      console.log(error)
    }
  }

  return (
    <button
      onClick={() => {
        setLiked(!liked)
        setClicked(true)
        Like()
      }}
      onAnimationEnd={() => ''}
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
