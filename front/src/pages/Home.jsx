import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Posts/Card'
import PostOnePost from '../components/Posts/Post'
import ModifyPost from '../components/Posts/ModifPost'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [update, setUpdate] = useState(false)
  const [postData, setPostData] = useState({})

  const updatePost = (data) => {
    setUpdate(true)
    setPostData(data)
    console.log('Home', postData)
  }

  // boutton remonte page
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const fetchPosts = useCallback(async () => {
    const res = await axios.get('http://localhost:4200/api/posts/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    setPosts(res.data.data)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])




  return (
    <div>
      {update ? (
        <ModifyPost postData={postData} />
      ) : (
        <PostOnePost refetch={fetchPosts} />
      )}
      {posts.map((item) => (
        <Card
          refetch={fetchPosts}
          updatePost={updatePost}
          postData={postData}
          key={item.id}
          {...item}
        />
      ))}

      <BsFillArrowUpCircleFill className="scrollTop" onClick={scrollTop} />
    </div>
  )
}

export default Home
