import React, { Suspense } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import ModifPost from '../components/Posts/ModifPost'

const EditPost = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className>
            {' '}
            <BiLoaderCircle />{' '}
          </div>
        }
      >
        <ModifPost />
      </Suspense>
    </div>
  )
}

export default EditPost
