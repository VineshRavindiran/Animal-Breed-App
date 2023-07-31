import React from "react";
import styles from "./NavBar.module.css";
import {  NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
         
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/page-one"
            >
              Dog Breeds
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/page-two"
            >
              Cat Breeds
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;