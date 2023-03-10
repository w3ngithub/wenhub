import React from 'react'
import NavBar from 'elements/NavBar'
import { navBarItems, navBarBackgroundColor } from 'constants/constants'

function HeaderLayout({ children }) {
  return (
    <>
      <NavBar
        navItems={navBarItems}
        backgroundColor={navBarBackgroundColor}
        styles={{
          color: '#fff',
          fontSize: '14px',
          fontWeight: '600',
          width: 'auto',
          height: '100%',
          alignItems: 'center',
          flex: 1,
          textDecoration: 'none',
        }}
      />
      {children}
    </>
  )
}

export default HeaderLayout
