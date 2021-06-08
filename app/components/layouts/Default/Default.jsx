import Header from "@module/Header/Header";
import styles from "./default.module.scss";

const Default = ({ children }) => (
  <div className={styles.default}>
    <Header />
    <div className={styles.content}>{children}</div>
  </div>
);

export default Default;
