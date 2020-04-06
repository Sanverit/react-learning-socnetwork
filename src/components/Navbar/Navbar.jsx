import React from 'react';
// import Friends from './Friends/Friends'
import Navigation from './Navigation/Navigation'
import s from './Navbar.module.css';

function Navbar(props){
    return (
        <div className={s.sideBar}>
            <Navigation />
            {/* <Friends sideBar={store.sideBar}/> */}
        </div>
    )
}

export default Navbar;