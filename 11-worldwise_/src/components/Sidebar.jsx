/** @format */

import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {year} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
