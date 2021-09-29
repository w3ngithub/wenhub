import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Menu, Layout } from 'antd'
import {
  MenuFoldOutlined,
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { IoIosFingerPrint } from '@react-icons/all-files/io/IoIosFingerPrint'
import LiveTime from 'elements/LiveTime'
import wenLogo from 'assets/images/wenLogo.png'
import { setfirstPunchIn, setfirstPunchOut } from 'redux/tms/tmsActions'
import { openNotification } from 'utils/notification'
import { TMS_PATH } from 'constants/routePath'
import { officeHour } from 'utils/validateOfficeHourTime'
import style from './navbar.module.css'

const { SubMenu } = Menu
const { Header } = Layout

function NavBar({ navItems, backgroundColor, styles }) {
  const { firstPunchIn, firstPunchOut } = useSelector(
    (state) => state.tms,
    shallowEqual,
  )
  const dispatch = useDispatch()
  const [menuItemSelectedKey, setMenuItemSelecteKey] = useState(null)
  const [showMenuMobile, setShowMenuMobile] = useState(false)
  const [showSubItem, setShowSubItem] = useState(false)
  const { pathname, push } = useRouter()

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

  const handlePunch = () => {
    if (firstPunchOut) return
    if (officeHour) {
      if (!firstPunchIn) dispatch(setfirstPunchIn())
      else dispatch(setfirstPunchOut())
    } else {
      openNotification({ type: 'info', message: 'Please Add Punch Note' })
      push(TMS_PATH)
    }
  }

  return (
    <>
      <div
        className={`${
          showMenuMobile
            ? style.mobileMenuContainerShow
            : style.mobileMenuContainerHide
        } ${style.mobileView}`}
      >
        <CloseOutlined
          className={style.closeBtnMob}
          onClick={() => setShowMenuMobile(false)}
        />
        <ul style={{ paddingTop: '25px' }}>
          {navItems.map((item) =>
            !item.subItem ? (
              <li
                key={item.item}
                aria-hidden
                className={style.listMobile}
                onClick={() => setShowMenuMobile(false)}
              >
                <Link href={`${item.path}`}>{item.item}</Link>
              </li>
            ) : (
              <li className={style.listMobile}>
                <span aria-hidden onClick={() => setShowSubItem(!showSubItem)}>
                  {item.item}{' '}
                  <DownOutlined
                    style={{ fontSize: '11px', marginLeft: '5px' }}
                  />
                </span>
                {showSubItem && (
                  <ul>
                    {item.subItem.map((sub) => (
                      <li
                        key={sub.item}
                        aria-hidden
                        className={style.subListMobile}
                        onClick={() => setShowMenuMobile(false)}
                      >
                        <Link href={sub.path}>{sub.item}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ),
          )}
        </ul>
      </div>

      <Layout className="layout" style={{ width: '100%' }}>
        <Header
          style={{
            backgroundColor,
          }}
          className={style.navBarContainer}
        >
          <div className={style.headerContainer}>
            <div className={`${style.logo} nav-logo ${style.desktopView}`}>
              <Link href="/">
                <span style={{ cursor: 'pointer' }}>
                  <Image src={wenLogo} alt="WEN" width={130} height={40} />
                </span>
              </Link>
            </div>
            <div className={`${style.logo} nav-logo ${style.mobileView}`}>
              <Link href="/">
                <span style={{ cursor: 'pointer' }}>
                  <Image src={wenLogo} alt="WEN" width={100} height={38} />
                </span>
              </Link>
            </div>
            <div className={`${style.punch}`} onClick={handlePunch} aria-hidden>
              <IoIosFingerPrint style={{ fontSize: '24px' }} />
              {firstPunchOut ? (
                <span>OFFICE HOUR 9HR</span>
              ) : (
                <span>
                  PUNCH {firstPunchIn ? 'OUT' : 'IN'} <LiveTime />
                </span>
              )}
            </div>
            <div
              className={`${style.menuOpen} ${style.mobileView}`}
              style={{ marginLeft: '10px' }}
            >
              <MenuOutlined
                style={{ fontSize: '16px', color: '#fff' }}
                onClick={() => setShowMenuMobile(true)}
              />
            </div>
          </div>

          <div className={style.desktopView}>
            <Menu
              onClick={handleMenuClicked}
              mode="horizontal"
              selectedKeys={[menuItemSelectedKey]}
              overflowedIndicator={
                <MenuFoldOutlined style={{ color: '#fff' }} />
              }
              defaultSelectedKeys={['1']}
              style={{
                backgroundColor: 'inherit',
                padding: '1px 0',
                width: '100%',
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
                      <Menu.Item
                        key={subitem.id}
                        className={style.sub_menu_container}
                        style={{
                          backgroundColor,
                          width: '100%',
                          textAlign: 'left',
                        }}
                      >
                        <Link href={subitem.path}>
                          <span className={style.sub_menu_item}>
                            {subitem.item}
                          </span>
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
          </div>
        </Header>
      </Layout>
    </>
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
