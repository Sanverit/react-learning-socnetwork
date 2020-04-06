import React from 'react'

import s from './Message.module.css'

function Message(props){
    const {text} = props;
    return(
        <div className={s.message}>
            {text}
        </div>
    )
}

export default Message;