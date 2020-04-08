import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Dialog.module.css'

type PropsType = {
    id: number
    userName: string
}

function Dialog({ id, userName }: PropsType) {
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={`/dialogs/${id}`}>{userName}</NavLink>
        </div>
    )
}

export default Dialog
