import { connect } from 'react-redux'
import { compose } from 'redux'

import Dialogs from './Dialogs'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { sendMessageThunkCreator } from '../../redux/dialogsReducer'
import { AppStateType } from '../../redux/reduxStore'

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.messagesPage,
    }
}

// let mapDispatchToProps = (dispatch: any) => {
//     return {
//         sendMessageAction: (dialogsMessage: string) => {
//             dispatch(sendMessageCreator(dialogsMessage))
//         }
//     }
// };

const DialogsContainer = compose(connect(mapStateToProps, { sendMessageThunkCreator }), withAuthRedirect)(Dialogs)

export default DialogsContainer
