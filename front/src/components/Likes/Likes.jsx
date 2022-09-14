import React, { useCallback } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import axios from 'axios'

const Likes = (item) => {
  // add like
  const handleLike = useCallback(async (data) => {
    const res = await axios.post(
      `http://localhost:4200/api/posts/likes`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
  }, [])

  return (
    <div className="like">
      <p onClick={handleLike} className="icon-heart">
        <AiFillHeart />
      </p>
      <p className="likes_length">{item.props.props.likes.length}</p>
    </div>
  )
}

export default Likes
