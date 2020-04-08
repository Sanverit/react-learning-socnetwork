import React from 'react'

import s from './Message.module.css'

type PropsType = {
    text: string
}

function Message({text}:PropsType){
    return(
        <div className={s.message}>
            {text}
        </div>
    )
}

export default Message;