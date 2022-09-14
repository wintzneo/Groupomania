import React, { Suspense } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import ModifProfile from '../components/Profil/ModifProfil'

const EditProfile = () => {
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
        <ModifProfile />
      </Suspense>
    </div>
  )
}

export default EditProfile
