import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Menu, Layout } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Link from 'next/link'
import wenLogo from 'assets/images/wenLogo.png'
import style from './navbar.module.css'

const { SubMenu } = Menu
const { Header } = Layout

function NavBar({ navItems, backgroundColor, styles }) {
  const [menuItemSelectedKey, setMenuItemSelecteKey] = useState(null)
  const { pathname } = useRouter()

  const handleMenuClicked = (navItem) => {
    setMenuItemSelecteKey(navItem.key)
  }

  React.useEffect(() => {
    const setActiveNavBarItem = () => {
      const urlNav = navItems.reduce((obj, item) => {
        if (item.subItem) {
          return {
            ...obj,
            ...item.subItem.reduce(
              (innerObj, innerItem) => ({
                ...innerObj,
                [innerItem.path]: innerItem.id,
              }),
              {},
            ),
          }
        }
        return { ...obj, [item.path]: item.id }
      }, {})

      setMenuItemSelecteKey(urlNav[pathname])
    }
    setActiveNavBarItem()
  }, [pathname])

  return (
    <Layout style={{ width: '100%' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor,
          width: '100%',
        }}
      >
        <div className={`${style.logo} nav-logo`}>
          <Link href="/">
            <span>
              <Image src={wenLogo} alt="WEN" width={130} height={40} />
            </span>
          </Link>
        </div>
        <Menu
          onClick={handleMenuClicked}
          mode="horizontal"
          selectedKeys={[menuItemSelectedKey]}
          overflowedIndicator={<MenuFoldOutlined style={{ color: '#fff' }} />}
          defaultSelectedKeys={['1']}
          style={{
            backgroundColor: 'inherit',
            padding: '32px',
            ...styles,
          }}
        >
          {navItems.map((item) =>
            item.subItem ? (
              <SubMenu
                key={item.id}
                title={item.item}
                className={style.nav_subMenuitem}
              >
                {item.subItem.map((subitem) => (
                  <Menu.Item key={subitem.id} style={{ backgroundColor }}>
                    <Link href={subitem.path}>
                      <span className={style.nav_item}>{subitem.item}</span>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.id}>
                <Link href={item.path}>
                  <span
                    className={
                      item.id === +menuItemSelectedKey
                        ? style.nav_item_active
                        : style.nav_item
                    }
                  >
                    {item.item}
                  </span>
                </Link>
              </Menu.Item>
            ),
          )}
        </Menu>
      </Header>
    </Layout>
  )
}

NavBar.propTypes = {
  navItems: PropTypes.array.isRequired,
  backgroundColor: PropTypes.string,
  styles: PropTypes.object,
}

NavBar.defaultProps = {
  backgroundColor: 'none',
  styles: {},
}

export default NavBar
