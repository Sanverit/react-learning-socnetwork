import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Divider } from 'semantic-ui-react'

import { setNewStatusThunkCreator } from '../../../../redux/profileReducer'
import Status from './Status'

class StatusContainer extends React.Component {
    state = {
        editMode: false,
        newStatusText: this.props.status || ''
    }

    openEditStatus = () => {
        if(this.props.loggedUserId === this.props.userId){
            this.setState({
                editMode: true
            })
        }
        
    }

    closeEditStatus = () => {
        this.setState({
            editMode: false
        })
        this.props.setNewStatusThunkCreator(this.state.newStatusText)
    }

    updateNewStatusText = (newtext) => {
        this.setState({
            newStatusText: newtext
        })
    }

    render(){
        return (
            <>
                <Status
                    status={this.props.status} 
                    newStatusText={this.state.newStatusText} 
                    editMode={this.state.editMode} 
                    openEditStatus={this.openEditStatus}
                    closeEditStatus={this.closeEditStatus}
                    updateNewStatusText={this.updateNewStatusText}
                />
                <Divider />
            </>
        )
    }
    
}

let mapStateToProps = (state) => {
    return {
        status: state.profilePage.status,
        newStatusText: state.profilePage.newStatusText,
        userId: state.profilePage.dataProfile.userId,
        loggedUserId: state.auth.id
    }
};

const StatusContainerComponent = compose(
    connect( mapStateToProps, {setNewStatusThunkCreator}),
)(StatusContainer);

export default StatusContainerComponent;