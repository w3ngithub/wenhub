import React from 'react'
import NavBar from 'elements/NavBar'
import { navBarItems, navBarBackgroundColor } from 'constants/constants'

function HeaderLayout({ children }) {
  return (
    <>
      <NavBar navItems={navBarItems} backgroundColor={navBarBackgroundColor} />
      {children}
    </>
  )
}

export default HeaderLayout
