import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Divider } from 'semantic-ui-react'

import { setNewStatusThunkCreator } from '../../../../redux/profileReducer'
import Status from './Status'


function StatusContainerWithHooks(props) {

    const [editMode, setEditMode] = useState(false)
    const [newStatusText, setNewStatusText] = useState(props.status)

    useEffect(() => {
        setNewStatusText(props.status)
    }, [props.status])

    const openEditStatus = () => {
        if(props.loggedUserId === props.userId){
            setEditMode(true)
        }
        
    }

    const closeEditStatus = () => {
        setEditMode(false)
        props.setNewStatusThunkCreator(newStatusText)
    }

    const updateNewStatusText = (newtext) => {
        setNewStatusText(newtext)
    }

    return (
        <>
            <Status
                status={props.status} 
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


let mapStateToProps = (state) => {
    return {
        status: state.profilePage.status,
        newStatusText: state.profilePage.newStatusText,
        userId: state.profilePage.dataProfile.userId,
        loggedUserId: state.auth.id
    }
};

const StatusContainerComponentWithHooks = compose(
    connect( mapStateToProps, {setNewStatusThunkCreator}),
)(StatusContainerWithHooks);

export default StatusContainerComponentWithHooks;