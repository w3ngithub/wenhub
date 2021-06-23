import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, Layout } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import style from './navbar.module.css'

const { SubMenu } = Menu
const { Header } = Layout

function NavBar({ navItems, backgroundColor }) {
  const [menuItemSelectedKey, setMenuItemSelecteKey] = useState('1')
  const handleMenuClicked = (navItem) => {
    setMenuItemSelecteKey(navItem.key)
  }

  return (
    <Layout style={{ width: '100%' }}>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: backgroundColor,
          width: '100%',
        }}
      >
        <div
          style={{
            width: '130px',
            height: '64px',
            minWidth: '130px',
            minHeight: '64px',
            marginRight: '30px',
            cursor: 'pointer',
          }}
        >
          <Link href="/">
            <img
              src={
                'http://202.166.207.19/wenhub-rt/wp-content/uploads/2018/05/wen-white.png'
              }
              alt="WEN HUB"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Link>
        </div>
        <Menu
          onClick={handleMenuClicked}
          mode="horizontal"
          selectedKeys={[menuItemSelectedKey]}
          defaultSelectedKeys={['1']}
          overflowedIndicator={<MenuFoldOutlined style={{ color: '#fff' }} />}
          style={{
            backgroundColor: 'inherit',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            width: '100%',
            height: '100%',
            textDecoration: 'none',
          }}
        >
          {navItems.map((item) => {
            return item.subItem ? (
              <SubMenu
                key={item.id}
                title={item.item}
                className={style.nav_subMenuitem}
              >
                {item.subItem.map((subitem) => (
                  <Menu.Item
                    key={subitem.id}
                    style={{ backgroundColor: backgroundColor }}
                  >
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
                      item.id == menuItemSelectedKey
                        ? style.nav_item_active
                        : style.nav_item
                    }
                  >
                    {item.item}
                  </span>
                </Link>
              </Menu.Item>
            )
          })}
        </Menu>
      </Header>
    </Layout>
  )
}

export default NavBar
