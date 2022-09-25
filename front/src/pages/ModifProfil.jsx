import React, { Suspense } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import ModifyProfile from '../components/Profil/ModifProfil'

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
        <ModifyProfile />
      </Suspense>
    </div>
  )
}

export default EditProfile
