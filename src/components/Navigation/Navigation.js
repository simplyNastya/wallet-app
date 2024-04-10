import { AiFillHome } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";

import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';

const Navigation = () => {
    return (
    <div className={styles.centered}>
        <div className={styles.mobileNav}>
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <NavLink to='/' className={styles.link}>
                            <AiFillHome style={{ width: "38", height: "38", color: "white" }}/>
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to='/diagram' className={styles.link}>
                            <MdShowChart style={{ width: "38", height: "38", color: "white" }}/>
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to='/currency' className={styles.link}>
                            <FaDollarSign style={{ width: "38", height: "38", color: "white" }}/>
                    </NavLink>
                </li>
            </ul>
        </nav>
        </div>
        <div className={styles.tabletNav}>
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <NavLink to='/' className={styles.link}>
                        <div className={styles.favWrapper}>
                            <AiFillHome style={{ width: "12", height: "11", color: "white" }}/>
                        </div>        
                        <p className={styles.link__text}>Home</p>
                    </NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to='/diagram' className={styles.link}>
                        <div className={styles.favWrapper}>
                            <MdShowChart style={{ width: "12", height: "11", color: "white" }}/>
                        </div>
                        <p className={styles.link__text}>Statistics</p>
                    </NavLink>
                </li>
            </ul>
        </nav>
        </div>
    </div>
    )
}

export default Navigation;