import Button from 'elements/Button'
import styles from './header.module.scss'

const Header = () => (
  <header className={styles.header}>
    <span className={styles.socials} data-cy="header-socials">
      <Button />
    </span>
  </header>
)

export default Header
