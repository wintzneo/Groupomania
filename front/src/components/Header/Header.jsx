import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/icon-left-font-monochrome-white.svg'

const Header = () => {
  return (
    <div className="header">
      <div className="header_logo">
        <NavLink to="/" className="header_logo">
          <img src={Logo} alt="logo Groupomania" />
        </NavLink>
      </div>
    </div>
  )
}

export default Header
