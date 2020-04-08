import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Divider } from 'semantic-ui-react'

import { setNewStatusThunkCreator } from '../../../../redux/profileReducer'
import {AppStateType} from '../../../../redux/reduxStore'
import Status from './Status'

type MapStatePropsType = {
    status: string
    userId: number | undefined
    loggedUserId: number | null
}

type MapDispatchPropsType = {
    setNewStatusThunkCreator: (newStatusText:string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

function StatusContainerWithHooks({status, userId, loggedUserId, setNewStatusThunkCreator}:PropsType ) {

    const [editMode, setEditMode] = useState(false)
    const [newStatusText, setNewStatusText] = useState(status)

    useEffect(() => {
        setNewStatusText(status)
    }, [status])

    const openEditStatus = () => {
        if(loggedUserId === userId){
            setEditMode(true)
        }
        
    }

    const closeEditStatus = () => {
        setEditMode(false)
        setNewStatusThunkCreator(newStatusText)
    }

    const updateNewStatusText = (newtext:string) => {
        setNewStatusText(newtext)
    }

    return (
        <>
            <Status
                status={status} 
                newStatusText={newStatusText} 
                editMode={editMode} 
                openEditStatus={openEditStatus}
                closeEditStatus={closeEditStatus}
                updateNewStatusText={ updateNewStatusText}
            />
            <Divider />
        </>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        status: state.profilePage.status,
        userId: state.profilePage.dataProfile?.userId,
        loggedUserId: state.auth.id
    }
};

const StatusContainerComponentWithHooks = compose(
    connect( mapStateToProps, {setNewStatusThunkCreator}),
)(StatusContainerWithHooks);

export default StatusContainerComponentWithHooks;