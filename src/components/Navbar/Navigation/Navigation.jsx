import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

function Navigation(props){
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to="/profile" className={s.navItem} activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs" className={s.navItem} activeClassName={s.activeLink}>Dialogs</NavLink>
            </div>
            <div>
                <NavLink to="/users" className={s.navItem} activeClassName={s.activeLink}>Users</NavLink>
            </div>
        </nav>
    )
}

export default Navigation;