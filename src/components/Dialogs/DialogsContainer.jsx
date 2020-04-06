import { connect } from 'react-redux';
import {compose} from 'redux'

import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { sendMessageCreator } from '../../redux/dialogsReducer'

let mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessageAction: (dialogsMessage) => {
            dispatch(sendMessageCreator(dialogsMessage));
        }
    }
};

const DialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);

export default DialogsContainer;