import React from 'react'
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

type PropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}
function Header({ login, isAuth, logout }:PropsType){
    return (
        <Menu stackable>
            <Menu.Item>
                <img src='https://pngimage.net/wp-content/uploads/2018/05/background-logo-png-5.png' alt="logo"/>
            </Menu.Item>

                
            { isAuth ?
                <>
                    <Menu.Item name='login' > {login} </Menu.Item> 
                    <Menu.Item name='logout' onClick={logout} > Logout </Menu.Item> 
                </>
                :
                <Menu.Item
                    name='sign-in'
                    as={NavLink}
                    to="/login" >
                        Sign-in
                </Menu.Item>
            }
            
        </Menu>
    )
}

export default Header;
