import React from 'react';

import styles from './navbar.module.css';

import { BsFillBellFill, BsSearch } from "react-icons/bs";

const NavbarComponent: React.FC = () => {
  return (
    <header id={styles.container}>
        <input type="search" />
        <BsSearch style={{marginLeft: "10rem", cursor: "pointer", position: "absolute"}}/>
        <div id={styles.bellIcon}>
            <BsFillBellFill size="1.6rem"/>
        </div>
    </header>
  );
}

export default NavbarComponent;