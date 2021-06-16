import styles from './header.module.scss'

const Header = () => (
  <header className={styles.header}>
    <span className={styles.socials} data-cy="header-socials">
      This is header
    </span>
  </header>
)

export default Header
