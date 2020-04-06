import React from 'react'
import { NavLink } from 'react-router-dom';
import s from './Dialog.module.css'

function Dialog(props){
    const {id, userName} = props;
    return(
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={`/dialogs/${id}`}>{userName}</NavLink>
        </div>
    )
}

export default Dialog;