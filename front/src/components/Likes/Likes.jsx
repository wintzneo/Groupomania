import React, { useCallback } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import axios from 'axios'

const Likes = (item) => {
  // add like
  const handleLike = useCallback(async (data) => {
    await axios.post(`http://localhost:3000/api/posts/likes`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        userId: localStorage.getItem('userId'),
      },
    })
  }, [])

  return (
    <div className="like">
      <p onClick={handleLike} className="icon-heart">
        <AiFillHeart />
      </p>
      <p className="likes_length">{item.likes}</p>
    </div>
  )
}

export default Likes
