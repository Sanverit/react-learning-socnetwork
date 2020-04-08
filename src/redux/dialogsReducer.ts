import { DialogType, MessageType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './reduxStore'
const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState = {
    dataDialogs: [
        { name: 'user1', id: 1 },
        { name: 'user2', id: 2 },
        { name: 'user3', id: 3 },
    ] as Array<DialogType>,
    dataMessages: [
        { message: 'hi', id: 1 },
        { message: 'hello', id: 2 },
        { message: 'by', id: 3 },
    ] as Array<MessageType>,
}
type InitialStateType = typeof initialState
type ActionsTypes = SendMessageCreatorType

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            const newMessage = {
                message: action.payload,
                id: state.dataMessages.length + 1,
            }
            return {
                ...state,
                dataMessages: [...state.dataMessages, newMessage],
            }

        default:
            return state
    }
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE
    payload: string
}
export const sendMessageCreator = (dialogsMessage: string): SendMessageCreatorType => ({
    type: SEND_MESSAGE,
    payload: dialogsMessage,
})

export const sendMessageThunkCreator = (dialogsMessage: string): ThunkType => {
    return (dispatch) => {
        dispatch(sendMessageCreator(dialogsMessage))
    }
}

export default dialogsReducer
